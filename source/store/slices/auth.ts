import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { cookerApi } from "../api/cookerApi";
import type { CookerCreateResponse, ApiErrorResponse, CookerProfileResponse } from "../api/types";

// Cooker user types (based on API response)
export interface Cooker {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  photo: string | null;
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

// Helper to map API response to Cooker (registration)
const mapCookerResponse = (data: CookerCreateResponse): Cooker => ({
  id: data.id,
  firstname: data.firstname,
  lastname: data.lastname,
  phone: data.phone,
  email: data.email,
  photo: null,
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

// Helper to map profile API response to Cooker.
// Handles BOTH backend response shapes:
//   - Wrapped: { personal_infos_section: {...}, address_section: {...} }   (legacy)
//   - Flat:    { firstname, lastname, ..., street_number, ... }            (Swagger CookerGET)
const mapProfileResponse = (
  data: CookerProfileResponse | Record<string, any>,
  existingCooker: Cooker | null,
): Cooker => {
  const raw: any = data ?? {};
  const personal: any = raw.personal_infos_section ?? raw;
  const address: any = raw.address_section ?? raw;

  const rawMaxOrders = personal?.max_order_number;
  const maxOrderNumber =
    typeof rawMaxOrders === "number"
      ? rawMaxOrders
      : parseInt(String(rawMaxOrders ?? ""), 10) || 0;

  return {
    id: raw.id ?? existingCooker?.id ?? 0,
    firstname: personal?.firstname ?? existingCooker?.firstname ?? "",
    lastname: personal?.lastname ?? existingCooker?.lastname ?? "",
    phone: personal?.phone ?? existingCooker?.phone ?? "",
    email: personal?.email ?? existingCooker?.email ?? "",
    photo: personal?.photo ?? existingCooker?.photo ?? null,
    siret: personal?.siret ?? existingCooker?.siret ?? "",
    postalCode: address?.postal_code ?? existingCooker?.postalCode ?? "",
    streetName: address?.street_name ?? existingCooker?.streetName ?? "",
    streetNumber: address?.street_number ?? existingCooker?.streetNumber ?? "",
    town: address?.town ?? existingCooker?.town ?? "",
    addressComplement:
      address?.address_complement ?? existingCooker?.addressComplement ?? null,
    maxOrderNumber: maxOrderNumber || existingCooker?.maxOrderNumber || 0,
    isOnline: personal?.is_online ?? existingCooker?.isOnline ?? true,
    isActivated: raw.is_activated ?? existingCooker?.isActivated ?? true,
    acceptanceRate:
      personal?.acceptance_rate ?? existingCooker?.acceptanceRate ?? 0,
  };
};

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

// Auth flow type (login vs register)
export type AuthFlow = "login" | "register" | null;

// Complete auth slice state
export interface AuthState {
  // Global status
  status: AuthStatus;
  isAuthenticated: boolean;

  // Current auth flow (login vs register)
  authFlow: AuthFlow;

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
  isHydrated: boolean;
}

const initialState: AuthState = {
  status: "idle",
  isAuthenticated: false,

  authFlow: null,

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
  isHydrated: false,
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
        isHydrated: true,
        status: "unauthenticated",
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

    // Set auth flow (login or register)
    setAuthFlow: (state, action: PayloadAction<AuthFlow>) => {
      state.authFlow = action.payload;
    },

    // Hydrate auth state from storage
    hydrateAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      return {
        ...state,
        ...action.payload,
        isHydrated: true,
      };
    },

    // Mark as hydrated (even if no data to restore)
    setHydrated: (state) => {
      state.isHydrated = true;
    },
  },
  extraReducers: (builder) => {
    // Register cooker
    builder
      .addMatcher(authApi.endpoints.registerCooker.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errorCode = null;
        state.authFlow = "register";
      })
      .addMatcher(authApi.endpoints.registerCooker.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.cooker = mapCookerResponse(action.payload.data);
        state.registrationStep = "otp";
        state.otpPhone = action.payload.data.phone;
        state.status = "otp_pending";
        state.authFlow = "register";
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
        state.authFlow = "login";
      })
      .addMatcher(authApi.endpoints.sendAuthOtp.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "otp_pending";
        state.otpPhone = action.meta.arg.originalArgs.phone;
        state.authFlow = "login";
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

    // Get tokens (final login step)
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
        // Keep registrationStep as "documents" for register flow so AppStack shows SwornStatement first
        if (state.authFlow !== "register") {
          state.registrationStep = "complete";
        } else {
          state.registrationStep = "documents";
        }
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

    // Get cooker profile - store in auth state
    builder
      .addMatcher(cookerApi.endpoints.getCookerProfile.matchFulfilled, (state, action) => {
        try {
          console.log("[GetCookerProfile.fulfilled] payload:", action.payload);
          state.cooker = mapProfileResponse(action.payload?.data as any, state.cooker);
        } catch (e: any) {
          console.error("[GetCookerProfile.fulfilled] mapping error:", {
            message: e?.message,
            stack: e?.stack,
            payload: action.payload,
          });
        }
      });

    // Update cooker profile - sync auth state with API response
    builder
      .addMatcher(cookerApi.endpoints.updateCookerProfile.matchFulfilled, (state, action) => {
        try {
          console.log("[UpdateCookerProfile.fulfilled] payload:", action.payload);
          state.cooker = mapProfileResponse(action.payload?.data as any, state.cooker);
        } catch (e: any) {
          console.error("[UpdateCookerProfile.fulfilled] mapping error:", {
            message: e?.message,
            stack: e?.stack,
            payload: action.payload,
          });
        }
      });

    // Update cooker photo - sync auth state with returned photo URL
    builder
      .addMatcher(cookerApi.endpoints.updateCookerPhoto.matchFulfilled, (state, action) => {
        try {
          console.log("[UpdateCookerPhoto.fulfilled] payload:", action.payload);
          if (state.cooker) {
            state.cooker = mapProfileResponse(action.payload?.data as any, state.cooker);
          }
        } catch (e: any) {
          console.error("[UpdateCookerPhoto.fulfilled] mapping error:", {
            message: e?.message,
            stack: e?.stack,
            payload: action.payload,
          });
        }
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
  setAuthFlow,
  hydrateAuth,
  setHydrated,
} = authSlice.actions;

export default authSlice.reducer;
