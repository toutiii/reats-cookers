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
    // POST /token/ - Obtenir les tokens JWT
    getToken: builder.mutation<ApiResponse<TokenResponse>, TokenRequest>({
      query: (data) => ({
        url: "/token/",
        method: "POST",
        body: data,
      }),
    }),

    // POST /token/refresh/ - Rafraîchir le token d'accès
    refreshToken: builder.mutation<ApiResponse<RefreshTokenResponse>, RefreshTokenRequest>({
      query: (body) => ({
        url: "/token/refresh/",
        method: "POST",
        body,
      }),
    }),

    // POST /cookers/ - Inscription d'un nouveau cooker
    registerCooker: builder.mutation<ApiResponse<CookerCreateResponse>, CookerCreateRequest>({
      query: (data) => ({
        url: "/cookers/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cooker"],
    }),

    // POST /cookers/auth/ - Envoyer un OTP pour la connexion
    sendAuthOtp: builder.mutation<ApiResponse<Record<string, never>>, AuthRequest>({
      query: (data) => ({
        url: "/cookers/auth/",
        method: "POST",
        body: { phone: data.phone },
      }),
    }),

    // POST /cookers/otp-verify/ - Vérifier le code OTP
    verifyOtp: builder.mutation<ApiResponse<Record<string, never>>, OtpVerifyRequest>({
      query: (data) => ({
        url: "/cookers/otp-verify/",
        method: "POST",
        body: { phone: data.phone, otp: data.otp },
      }),
    }),

    // POST /cookers/otp/ask/ - Renvoyer un OTP
    resendOtp: builder.mutation<ApiResponse<Record<string, never>>, OtpAskRequest>({
      query: (data) => ({
        url: "/cookers/otp/ask/",
        method: "POST",
        body: { phone: data.phone },
      }),
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
