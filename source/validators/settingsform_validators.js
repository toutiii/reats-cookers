import all_constants from "../constants";

export function checkPostalCode(value, fieldLabel) {
  value = value.toString().trim();
  let postalCodeRegex = /^([0-9]{5})$/g;
  if (!value.match(postalCodeRegex)) {
    return (
      all_constants.validators.global.field +
      fieldLabel +
      all_constants.validators.global.invalid_postal_code
    );
  }
}

export function checkEmailFormat(value) {
  let emailRegex = all_constants.email.regex;
  if (!value.match(emailRegex)) {
    return all_constants.validators.settings.invalid_email_error;
  }
}

export function checkNumericFormat(value, fieldLabel) {
  if (typeof value !== "undefined") {
    value = value.toString().trim();
    let regex = null;
    let endMessage = null;
    if (
      fieldLabel.toLowerCase().includes(all_constants.validators.includes.siret)
    ) {
      regex = /^([0-9]{14})$/g;
      endMessage = all_constants.validators.settings.siret_format_error;
    } else if (
      fieldLabel.toLowerCase().includes(all_constants.validators.includes.phone)
    ) {
      regex = /^([0-9]{10})$/g;
      endMessage = all_constants.validators.settings.phone_format_error;
    }
    if (!value.match(regex)) {
      return all_constants.validators.global.field + fieldLabel + endMessage;
    }
  }
}

export function checkMaxDishesNumber(value, fieldLabel) {
  value = value.toString().trim();
  let regex = /^([0-9]{1,2})$/g;
  if (!value.match(regex)) {
    return (
      all_constants.validators.global.field +
      fieldLabel +
      all_constants.validators.global.invalid_max_dishes_number_format
    );
  }
}
