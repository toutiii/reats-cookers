import all_constants from "../constants";

export function valueIsValidQuantity(value, fieldLabel) {
    value = value.toString().trim();
    let quantityRegex = /^([0-9]{1,2})$/g;
    if (!value.match(quantityRegex)) {
        return (
            all_constants.validators.global.field +
            fieldLabel +
            all_constants.validators.global.invalid_quantity
        )
    }
}