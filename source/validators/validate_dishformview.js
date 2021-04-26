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