export function validateFields(fields, objectToValidate) {
    const errors = {};
    const fieldNameKeys = Object.keys(fields)
    for (let fieldName of fieldNameKeys) {
        const fieldObject = fields[fieldName];
        const validators = fieldObject.validators;
        const fieldLabel = fieldObject.label;
        const value = objectToValidate[fieldName];
        if (validators && validators.length > 0) {
            const error = validateField(validators, value, fieldLabel, objectToValidate);
            if (error) {
                errors[fieldName] = error;
                break;
            }
        }
    }
    return errors;
};

export function validateField(validators, value, fieldLabel, objectToValidate) {
    let error = '';
    for (let validator of validators) {
        if (typeof validator !== 'undefined') {
            const validationError = validator(value, fieldLabel, objectToValidate);
            if (validationError) {
                error = validationError;
                break;
            }
        }
    }
    return error;
};

export function checkValueIsDefined(value, fieldLabel, objectToValidate) {
    if (typeof(value) === "undefined" || value === null) {
        return 'Le champ ' + fieldLabel.toLowerCase() + ' est vide.'
    }
    else {
        if (value.toString().length === 0) {
            return 'Le champ ' + fieldLabel.toLowerCase() + ' est vide.'
        }
    }
}

export function checkValueNotContainsSpecialChar(value, fieldLabel, objectToValidate) {
    if (typeof(value) !== "undefined" && value !== null) {
        value = value.toString().trim().replace(/ +(?= )/g,'')
        let regex = null;
        if (fieldLabel.toLowerCase().includes('description')) {
            regex = /([\u00C0-\u00D6\u00D9-\u00DD\u00E0-\u00F6\u00F9-\u00FFA-Za-z0-9 ',.!])/g;
        }
        else {
            regex = /([\u00C0-\u00D6\u00D9-\u00DD\u00E0-\u00F6\u00F9-\u00FFA-Za-z0-9 '&-])/g;
        }
        let rejectedString = value.replace(regex, '')
        if (rejectedString.length !== 0) {
            return 'Le champ ' + fieldLabel.toLowerCase() + ' est invalide. Veuillez enlever le ' + "\"" + rejectedString[0] + "\"";
        }
    }
}

export function valueIsValidPrice(value, fieldLabel, objectToValidate) {
    value = value.toString().trim();
    let priceRegex = /^([0-9]{1,2}(\.[0-9]{1,2})?)$/g;
    if (!value.match(priceRegex)) {
        return 'Le champ ' + fieldLabel + ' est invalide. Exemple: 13.90'
    }
}