import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import type { CookerCreateResponse, ApiErrorResponse } from "../api/types";

// Cooker user types (based on API response)
export interface Cooker {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  postalCode: string;
  siret: string;
  streetName: string;
  streetNumber: string;
  town: string;
  addressComplement: string | null;
  maxOrderNumber: number;
  isOnline: boolean;
  isActivated: boolean;
  acceptanceRate: number;
}

// Token types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Helper to map API response to Cooker
const mapCookerResponse = (data: CookerCreateResponse): Cooker => ({
  id: data.id,
  firstname: data.firstname,
  lastname: data.lastname,
  phone: data.phone,
  postalCode: data.postal_code,
  siret: data.siret,
  streetName: data.street_name,
  streetNumber: data.street_number,
  town: data.town,
  addressComplement: data.address_complement,
  maxOrderNumber: data.max_order_number,
  isOnline: data.is_online,
  isActivated: data.is_activated,
  acceptanceRate: data.acceptance_rate,
});

// Possible authentication flow states
export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "otp_pending"
  | "otp_verified"
  | "documents_pending"
  | "documents_submitted"
  | "documents_approved"
  | "documents_rejected"
  | "error";

// Complete auth slice state
export interface AuthState {
  // Global status
  status: AuthStatus;
  isAuthenticated: boolean;

  // Cooker data
  cooker: Cooker | null;
  userId: number | null;

  // Tokens
  accessToken: string | null;
  refreshToken: string | null;

  // OTP flow
  otpSessionId: string | null;
  otpPhone: string | null;
  otpExpiresAt: number | null;
  otpAttempts: number;

  // Registration flow
  registrationStep: "phone" | "otp" | "profile" | "documents" | "complete";
  registrationData: Partial<CookerCreateResponse> | null;

  // Error handling
  error: string | null;
  errorCode: string | null;

  // Metadata
  lastLoginAt: number | null;
  isRefreshing: boolean;
  isFirstLaunch: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  status: "idle",
  isAuthenticated: false,

  cooker: null,
  userId: null,

  accessToken: null,
  refreshToken: null,

  otpSessionId: null,
  otpPhone: null,
  otpExpiresAt: null,
  otpAttempts: 0,

  registrationStep: "phone",
  registrationData: null,

  error: null,
  errorCode: null,

  lastLoginAt: null,
  isRefreshing: false,
  isFirstLaunch: true,
  isLoading: false,
};

// Helper to extract error from API response
const extractApiError = (error: unknown): { message: string; code: string } => {
  const apiError = error as { data?: ApiErrorResponse };
  if (apiError?.data?.error) {
    return {
      message: apiError.data.error.message,
      code: apiError.data.error.code,
    };
  }
  return { message: "An unexpected error occurred", code: "UNKNOWN_ERROR" };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Full reset
    resetAuth: () => initialState,

    // Status management
    setStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.status = action.payload;
      if (action.payload !== "error") {
        state.error = null;
        state.errorCode = null;
      }
    },

    // Start loading
    setLoading: (state) => {
      state.status = "loading";
      state.error = null;
      state.errorCode = null;
    },

    // Error
    setError: (state, action: PayloadAction<{ message: string; code?: string }>) => {
      state.status = "error";
      state.error = action.payload.message;
      state.errorCode = action.payload.code || null;
    },

    // Set cooker data
    setCooker: (state, action: PayloadAction<Cooker>) => {
      state.cooker = action.payload;
    },

    // Logout
    logout: (state) => {
      return {
        ...initialState,
        isFirstLaunch: state.isFirstLaunch,
      };
    },

    // OTP sent
    otpSent: (state, action: PayloadAction<{ phone: string }>) => {
      state.status = "otp_pending";
      state.otpPhone = action.payload.phone;
      state.otpAttempts = 0;
      state.error = null;
      state.errorCode = null;
    },

    // OTP verified
    otpVerified: (state) => {
      state.status = "otp_verified";
      state.otpSessionId = null;
      state.otpAttempts = 0;
    },

    // Increment OTP attempts
    incrementOtpAttempts: (state) => {
      state.otpAttempts += 1;
    },

    // Reset OTP
    resetOtp: (state) => {
      state.otpSessionId = null;
      state.otpPhone = null;
      state.otpExpiresAt = null;
      state.otpAttempts = 0;
    },

    // Update registration step
    setRegistrationStep: (state, action: PayloadAction<AuthState["registrationStep"]>) => {
      state.registrationStep = action.payload;
    },

    // Update registration data
    updateRegistrationData: (state, action: PayloadAction<Partial<CookerCreateResponse>>) => {
      state.registrationData = {
        ...state.registrationData,
        ...action.payload,
      };
    },

    // Update tokens (refresh)
    updateTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isRefreshing = false;
    },

    // Start token refresh
    startTokenRefresh: (state) => {
      state.isRefreshing = true;
    },

    // Update cooker
    updateCooker: (state, action: PayloadAction<Partial<Cooker>>) => {
      if (state.cooker) {
        state.cooker = { ...state.cooker, ...action.payload };
      }
    },

    // First launch completed
    setFirstLaunchComplete: (state) => {
      state.isFirstLaunch = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    // Register cooker
    builder
      .addMatcher(authApi.endpoints.registerCooker.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addMatcher(authApi.endpoints.registerCooker.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.cooker = mapCookerResponse(action.payload.data);
        state.registrationStep = "otp";
        state.otpPhone = action.payload.data.phone;
        state.status = "otp_pending";
      })
      .addMatcher(authApi.endpoints.registerCooker.matchRejected, (state, action) => {
        state.isLoading = false;
        const { message, code } = extractApiError(action.payload);
        state.error = message;
        state.errorCode = code;
        state.status = "error";
      });

    // Send auth OTP (login flow)
    builder
      .addMatcher(authApi.endpoints.sendAuthOtp.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addMatcher(authApi.endpoints.sendAuthOtp.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "otp_pending";
        state.otpPhone = action.meta.arg.originalArgs.phone;
      })
      .addMatcher(authApi.endpoints.sendAuthOtp.matchRejected, (state, action) => {
        state.isLoading = false;
        const { message, code } = extractApiError(action.payload);
        state.error = message;
        state.errorCode = code;
        state.status = "error";
      });

    // Verify OTP
    builder
      .addMatcher(authApi.endpoints.verifyOtp.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addMatcher(authApi.endpoints.verifyOtp.matchFulfilled, (state) => {
        state.isLoading = false;
        state.status = "otp_verified";
        state.otpAttempts = 0;
        if (state.cooker) {
          state.cooker.isActivated = true;
        }
      })
      .addMatcher(authApi.endpoints.verifyOtp.matchRejected, (state, action) => {
        state.isLoading = false;
        state.otpAttempts += 1;
        const { message, code } = extractApiError(action.payload);
        state.error = message;
        state.errorCode = code;
      });

    // Get token (final login step)
    builder
      .addMatcher(authApi.endpoints.getToken.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addMatcher(authApi.endpoints.getToken.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.data.token.access;
        state.refreshToken = action.payload.data.token.refresh;
        state.userId = action.payload.data.user_id;
        state.isAuthenticated = true;
        state.status = "authenticated";
        state.lastLoginAt = Date.now();
        state.registrationStep = "complete";
      })
      .addMatcher(authApi.endpoints.getToken.matchRejected, (state, action) => {
        state.isLoading = false;
        const { message, code } = extractApiError(action.payload);
        state.error = message;
        state.errorCode = code;
        state.status = "error";
      });

    // Refresh token
    builder
      .addMatcher(authApi.endpoints.refreshToken.matchPending, (state) => {
        state.isRefreshing = true;
      })
      .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
        state.isRefreshing = false;
        state.accessToken = action.payload.data.access;
        state.refreshToken = action.payload.data.refresh;
      })
      .addMatcher(authApi.endpoints.refreshToken.matchRejected, (state) => {
        state.isRefreshing = false;
        // Token refresh failed, logout user
        return {
          ...initialState,
          isFirstLaunch: state.isFirstLaunch,
          status: "unauthenticated" as const,
        };
      });

    // Resend OTP
    builder
      .addMatcher(authApi.endpoints.resendOtp.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addMatcher(authApi.endpoints.resendOtp.matchFulfilled, (state) => {
        state.isLoading = false;
        state.otpAttempts = 0;
      })
      .addMatcher(authApi.endpoints.resendOtp.matchRejected, (state, action) => {
        state.isLoading = false;
        const { message, code } = extractApiError(action.payload);
        state.error = message;
        state.errorCode = code;
      });
  },
});

export const {
  resetAuth,
  setStatus,
  setLoading,
  setError,
  setCooker,
  logout,
  otpSent,
  otpVerified,
  incrementOtpAttempts,
  resetOtp,
  setRegistrationStep,
  updateRegistrationData,
  updateTokens,
  startTokenRefresh,
  updateCooker,
  setFirstLaunchComplete,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
