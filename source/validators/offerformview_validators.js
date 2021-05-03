export function valueIsValidQuantity(value, fieldLabel) {
    value = value.toString().trim();
    let quantityRegex = /^([0-9]{1,2})$/g;
    if (!value.match(quantityRegex)) {
        return 'Le champ ' + fieldLabel + ' est invalide. Exemple: 2'
    }
}