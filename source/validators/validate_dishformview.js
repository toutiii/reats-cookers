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
    const fieldKeys = Object.keys(fields)
    fieldKeys.forEach((key) => {
        const field = fields[key];
        const validators = field.validators;
        const value = values[key];
        if (validators && validators.length > 0) {
            const error = validateField(validators, value);
            if (error) {
                errors[key] = error;
            }
        }
    });
    return errors;
};

export function validateField(validators, value) {
    let error = '';
    validators.forEach((validator) => {
        if (typeof validator !== 'undefined') {
            const validationError = validator(value);
            if (validationError) {
                error = validationError;
            }
        }
    });
    return error;
};