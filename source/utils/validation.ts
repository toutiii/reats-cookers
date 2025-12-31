import * as yup from "yup";

// Login validation schema
export const loginValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[0-9]{10,17}$/, "Invalid phone format (10-17 digits)"),
});

// Register validation schema (matches API CookerCreateRequest)
export const registerValidationSchema = yup.object().shape({
  firstname: yup
    .string()
    .required("First name is required")
    .max(100, "First name must be at most 100 characters"),
  lastname: yup
    .string()
    .required("Last name is required")
    .max(100, "Last name must be at most 100 characters"),
  siret: yup
    .string()
    .required("SIRET is required")
    .matches(/^[0-9]{14}$/, "SIRET must contain exactly 14 digits"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[0-9]{10,17}$/, "Invalid phone format (10-17 digits)"),
  postal_code: yup
    .string()
    .required("Postal code is required")
    .matches(/^[0-9]{5}$/, "Postal code must contain 5 digits"),
  street_name: yup
    .string()
    .required("Street name is required")
    .max(100, "Street name must be at most 100 characters"),
  street_number: yup
    .string()
    .required("Street number is required")
    .max(10, "Street number must be at most 10 characters"),
  town: yup
    .string()
    .required("Town is required")
    .max(100, "Town must be at most 100 characters"),
  address_complement: yup
    .string()
    .max(512, "Address complement must be at most 512 characters")
    .notRequired(),
});

// OTP validation schema
export const otpValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP code is required")
    .matches(/^[0-9]{6}$/, "OTP must be 6 digits"),
  phone: yup
    .string()
    .required("Phone number is required"),
});

// Type exports for form data
export type LoginFormData = {
  phone: string;
};

export type RegisterFormData = {
  firstname: string;
  lastname: string;
  siret: string;
  phone: string;
  postal_code: string;
  street_name: string;
  street_number: string;
  town: string;
  address_complement?: string;
};

export type OtpFormData = {
  otp: string;
  phone: string;
};
