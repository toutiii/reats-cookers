import { baseApi } from "./baseApi";
import type {
  ApiResponse,
  TokenRequest,
  TokenResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  OtpVerifyRequest,
  OtpAskRequest,
  AuthRequest,
  CookerCreateRequest,
  CookerCreateResponse,
} from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /token/ - Get JWT tokens with phone number
    getToken: builder.mutation<ApiResponse<TokenResponse>, TokenRequest>({
      query: (body) => ({
        url: "/token/",
        method: "POST",
        body,
      }),
    }),

    // POST /token/refresh/ - Refresh JWT access token
    refreshToken: builder.mutation<ApiResponse<RefreshTokenResponse>, RefreshTokenRequest>({
      query: (body) => ({
        url: "/token/refresh/",
        method: "POST",
        body,
      }),
    }),

    // POST /cookers/ - Create new cooker account (sends OTP as side effect)
    registerCooker: builder.mutation<ApiResponse<CookerCreateResponse>, CookerCreateRequest>({
      query: (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, String(value));
          }
        });
        return {
          url: "/cookers/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Cooker"],
    }),

    // POST /cookers/auth/ - Initialize authentication by sending OTP
    sendAuthOtp: builder.mutation<ApiResponse<Record<string, never>>, AuthRequest>({
      query: (data) => {
        const formData = new FormData();
        formData.append("phone", data.phone);
        return {
          url: "/cookers/auth/",
          method: "POST",
          body: formData,
        };
      },
    }),

    // POST /cookers/otp-verify/ - Verify OTP code to activate account
    verifyOtp: builder.mutation<ApiResponse<Record<string, never>>, OtpVerifyRequest>({
      query: (data) => {
        const formData = new FormData();
        formData.append("phone", data.phone);
        formData.append("otp", data.otp);
        return {
          url: "/cookers/otp-verify/",
          method: "POST",
          body: formData,
        };
      },
    }),

    // POST /cookers/otp/ask/ - Request new OTP code
    resendOtp: builder.mutation<ApiResponse<Record<string, never>>, OtpAskRequest>({
      query: (data) => {
        const formData = new FormData();
        formData.append("phone", data.phone);
        return {
          url: "/cookers/otp/ask/",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTokenMutation,
  useRefreshTokenMutation,
  useRegisterCookerMutation,
  useSendAuthOtpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} = authApi;
