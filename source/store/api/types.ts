// Common API response types based on API documentation

// Success response wrapper
export interface ApiResponse<T> {
  success: true;
  data: T;
  message: string;
}

// Error response wrapper
export interface ApiErrorResponse {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
    details: Record<string, unknown>;
  };
}

// API error codes
export type ApiErrorCode =
  | "INTERNAL_SERVER_ERROR"
  | "OTP_INVALID"
  | "PHONE_REQUIRED"
  | "PHONE_INVALID_FORMAT"
  | "USER_NOT_FOUND"
  | "ACCOUNT_NOT_ACTIVATED"
  | "OTP_SEND_FAILED"
  | "OTP_PROVIDER_ERROR"
  | "OTP_DELIVERY_FAILED"
  | "MISSING_PARAMETERS"
  | "INVALID_DATE_FORMAT"
  | "INVALID_DATA"
  | "INVALID_ORDER_STATUS"
  | "TRANSITION_ERROR"
  | "VALIDATION_ERROR"
  | "TOKEN_NOT_VALID";

// Token endpoints
export interface TokenRequest {
  phone: string;
}

export interface TokenResponse {
  token: {
    access: string;
    refresh: string;
  };
  user_id: number;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
  refresh: string;
}

// OTP endpoints
export interface OtpVerifyRequest {
  phone: string;
  otp: string;
}

export interface OtpAskRequest {
  phone: string;
}

export interface AuthRequest {
  phone: string;
}

// Cooker registration
export interface CookerCreateRequest {
  firstname: string;
  lastname: string;
  phone: string;
  postal_code: string;
  siret: string;
  street_name: string;
  street_number: string;
  town: string;
  address_complement?: string;
  max_order_number?: number;
  is_online?: boolean;
}

export interface CookerCreateResponse {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  postal_code: string;
  siret: string;
  street_name: string;
  street_number: string;
  town: string;
  address_complement: string | null;
  max_order_number: number;
  is_online: boolean;
  is_activated: boolean;
  acceptance_rate: number;
}
