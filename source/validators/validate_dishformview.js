import all_constants from "../constants";


export function validateNumberType(text) {
    if (isNaN(text)) {
        return 'The price is not valid.'
    }
}

export function validateTextLength(text) {
    if (text && text.length > all_constants.validators.max_text_length ) {
        return 'Too long text( ' + all_constants.validators.max_text_length + 'max)';
    }
};

export function validateDescriptionLength(description) {
    if (description && description.length > all_constants.validators.max_description_length ) {
        return 'Too long description( ' + all_constants.validators.max_text_length + 'max)';
    }
};

export function validateFields(fields, values) {
    const errors = {};
    const fieldNameKeys = Object.keys(fields)
    fieldNameKeys.forEach((fieldName) => {
        const fieldObject = fields[fieldName];
        const validators = fieldObject.validators;
        const fieldLabel = fieldObject.label;
        const value = values[fieldName];
        if (validators && validators.length > 0) {
            const error = validateField(validators, value, fieldLabel);
            if (error) {
                errors[fieldName] = error;
            }
        }
    });
    return errors;
};

export function validateField(validators, value, fieldLabel) {
    let error = '';
    validators.forEach((validator) => {
        if (typeof validator !== 'undefined') {
            const validationError = validator(value, fieldLabel);
            if (validationError) {
                error = validationError;
            }
        }
    });
    return error;
};