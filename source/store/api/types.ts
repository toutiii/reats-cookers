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
  | "TOKEN_NOT_VALID"
  | "USER_ALREADY_EXISTS";

// Token endpoints
export interface TokenRequest {
  phone: string;
  otp: string;
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
  email: string;
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
  email: string;
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

// Document types for attestation sur l'honneur
export type BusinessDocumentType = "kbis" | "insee";

export type DocumentStatus = "pending" | "submitted" | "approved" | "rejected";

export interface AttestationDocument {
  id: number;
  type: BusinessDocumentType | "rc_insurance";
  file_url: string;
  status: DocumentStatus;
  submitted_at: string;
  reviewed_at: string | null;
  rejection_reason: string | null;
}

export interface AttestationSubmitRequest {
  cooker_id: number;
  business_document_type: BusinessDocumentType;
  business_document: File | Blob;
  rc_insurance_document: File | Blob;
  attestation_accepted: boolean;
}

export interface AttestationSubmitResponse {
  id: number;
  cooker_id: number;
  business_document: AttestationDocument;
  rc_insurance_document: AttestationDocument;
  attestation_accepted: boolean;
  submitted_at: string;
  status: DocumentStatus;
}

// Cooker profile types
export interface CookerPersonalInfos {
  photo: string | null;
  siret: string;
  firstname: string;
  lastname: string;
  phone: string;
  max_order_number: string;
  is_online: boolean;
  acceptance_rate: number;
  email: string;
}

export interface CookerAddress {
  street_number: string;
  street_name: string;
  address_complement: string | null;
  postal_code: string;
  town: string;
}

export interface CookerProfileResponse {
  personal_infos_section: CookerPersonalInfos;
  address_section: CookerAddress;
}

// Dashboard types
export type DashboardPeriod = "today" | "week" | "month" | "year";

export interface StatItem {
  icon: string;
  value: string;
  label: string;
  trend?: string;
  bg_color: string;
  icon_color: string;
}

export interface RevenueChart {
  labels: string[];
  data: number[];
  total_revenue: string;
  trend: string;
}

export interface DashboardStatsResponse {
  stats: StatItem[];
  revenue_chart: RevenueChart;
}

export interface PopularItem {
  id: number;
  name: string;
  price: string;
  rating: string;
  image_url: string;
  colors: [string, string];
}

export interface Pagination {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
}

export interface PopularItemsResponse {
  results: PopularItem[];
  pagination: Pagination;
}

export interface Review {
  id: number;
  stars: number;
  percent: number;
}

export interface RecentReviewsResponse {
  results: Review[];
  average_rating: number;
  total_reviews: number;
  pagination: Pagination;
}

