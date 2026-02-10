import type { ApiErrorCode, ApiErrorResponse } from "@/store/api/types";

/**
 * Maps an RTK Query error to a user-friendly i18n key under the "auth:errors" namespace.
 * Falls back to "auth:errors.unknownError" for unrecognized errors.
 */

const API_CODE_TO_KEY: Partial<Record<ApiErrorCode, string>> = {
  PHONE_INVALID_FORMAT: "errors.invalidPhone",
  PHONE_REQUIRED: "errors.invalidPhone",
  USER_NOT_FOUND: "errors.userNotFound",
  ACCOUNT_NOT_ACTIVATED: "errors.accountNotActivated",
  OTP_INVALID: "errors.otpInvalid",
  OTP_SEND_FAILED: "errors.otpSendFailed",
  OTP_PROVIDER_ERROR: "errors.otpSendFailed",
  OTP_DELIVERY_FAILED: "errors.otpSendFailed",
  INTERNAL_SERVER_ERROR: "errors.serverError",
  USER_ALREADY_EXISTS: "errors.userAlreadyExists",
};

export function getAuthErrorKey(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "errors.unknownError";
  }

  const err = error as Record<string, unknown>;

  // RTK Query FETCH_ERROR (no network)
  if (err.status === "FETCH_ERROR") {
    return "errors.networkError";
  }

  // RTK Query TIMEOUT_ERROR
  if (err.status === "TIMEOUT_ERROR") {
    return "errors.timeoutError";
  }

  // Server HTTP 5xx
  if (typeof err.status === "number" && err.status >= 500) {
    return "errors.serverError";
  }

  // CUSTOM_ERROR from baseApi (success: false) or direct API error data
  const apiData = err.data as ApiErrorResponse | undefined;
  if (apiData?.error?.code) {
    return API_CODE_TO_KEY[apiData.error.code] ?? "errors.unknownError";
  }

  return "errors.unknownError";
}

/**
 * Maps a Redux errorCode (string stored in state.errorCode) to an i18n key.
 * Use this in components that display `authError` from Redux state.
 */
export function getErrorKeyFromCode(errorCode: string | null): string {
  if (!errorCode) {
    return "errors.unknownError";
  }
  return API_CODE_TO_KEY[errorCode as ApiErrorCode] ?? "errors.unknownError";
}
