export function validateFields(fields, objectToValidate) {
    const errors = {};
    const fieldNameKeys = Object.keys(fields)
    for (let fieldName of fieldNameKeys) {
        const fieldObject = fields[fieldName];
        const validators = fieldObject.validators;
        const fieldLabel = fieldObject.label;
        const value = objectToValidate[fieldName];
        if (validators && validators.length > 0) {
            const error = validateField(validators, value, fieldLabel);
            if (error) {
                errors[fieldName] = error;
                break;
            }
        }
    }
    return errors;
};

export function validateField(validators, value, fieldLabel) {
    let error = '';
    for (let validator of validators) {
        if (typeof validator !== 'undefined') {
            const validationError = validator(value, fieldLabel);
            if (validationError) {
                error = validationError;
                break;
            }
        }
    }
    return error;
};

export function checkValueIsDefined(value, fieldLabel) {
    if (value === undefined || value === null) {
        return 'Le champ ' + fieldLabel.toLowerCase() + ' est vide.'
    }
    else {
        if (value.toString().length === 0) {
            return 'Le champ ' + fieldLabel.toLowerCase() + ' est vide.'
        }
    }
}

export function checkValueNotContainsSpecialChar(value, fieldLabel) {
    if (value !== undefined && value !== null && value.length !== 0) {
        value = value.toString().trim().replace(/ +(?= )/g,'')
        let regex = null;
        if (fieldLabel.toLowerCase().includes('description')) {
            regex = /([A-Za-z0-9 ',.!])/g;
        }
        else {
            regex = /([A-Za-z0-9 '&])/g;
        }
        let rejectedString = value.replace(regex, '')
        if (rejectedString.length !== 0) {
            return 'Le champ ' + fieldLabel.toLowerCase() + ' est invalide. Veuillez enlever le ' + "\"" + rejectedString[0] + "\"";
        }
    }
}

export function valueIsValidPrice(value, fieldLabel) {
    value = value.toString().trim();
    let priceRegex = /^([0-9]{1,2}(\.[0-9]{1,2})?)$/g;
    if (!value.match(priceRegex)) {
        return 'Le champ ' + fieldLabel + ' est invalide. Exemple: 13.90'
    }
}