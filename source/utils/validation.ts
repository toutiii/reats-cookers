import * as yup from "yup";

// Login validation schema
export const loginValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .required("validation:phone.required")
    .matches(/^[+0-9\s]{6,}$/, "validation:phone.format")
    .test("min-digits", "validation:phone.format", (value) => {
      if (!value) return false;
      const digitsOnly = value.replace(/[\s+]/g, "");
      return digitsOnly.length >= 9;
    }),
});

// Register validation schema (matches API CookerCreateRequest)
export const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("validation:email.required")
    .email("validation:email.invalid"),
  firstname: yup
    .string()
    .required("validation:name.required")
    .max(100, "validation:name.maxLength"),
  lastname: yup
    .string()
    .required("validation:name.required")
    .max(100, "validation:name.maxLength"),
  siret: yup
    .string()
    .required("validation:siret.required")
    .matches(/^[0-9]{14}$/, "validation:siret.length"),
  phone: yup
    .string()
    .required("validation:phone.required")
    .matches(/^[+0-9\s]{6,}$/, "validation:phone.format")
    .test("min-digits", "validation:phone.format", (value) => {
      if (!value) return false;
      const digitsOnly = value.replace(/[\s+]/g, "");
      return digitsOnly.length >= 9;
    }),
  postal_code: yup
    .string()
    .required("validation:address.postalCodeRequired")
    .matches(/^[0-9]{5}$/, "validation:address.postalCodeFormat"),
  street_name: yup
    .string()
    .required("validation:address.streetRequired")
    .max(100, "validation:name.maxLength"),
  street_number: yup
    .string()
    .required("validation:address.streetNumberRequired")
    .max(10, "validation:text.maxLength"),
  town: yup
    .string()
    .required("validation:address.townRequired")
    .max(100, "validation:name.maxLength"),
  address_complement: yup
    .string()
    .max(512, "validation:text.maxLength")
    .notRequired(),
});

// OTP validation schema
export const otpValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .required("validation:required")
    .matches(/^[0-9]{6}$/, "validation:required"),
  phone: yup
    .string()
    .required("validation:phone.required"),
});

// Type exports for form data
export type LoginFormData = {
  phone: string;
};

export type RegisterFormData = {
  email: string;
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
