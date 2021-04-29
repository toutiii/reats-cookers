import all_constants from "../constants";

export function checkPostalCode(value, fieldLabel) {
    value = value.toString().trim();
    let postalCodeRegex = /^([0-9]{5})$/g;
    if (!value.match(postalCodeRegex)) {
        return 'Le champ ' + fieldLabel + ' est invalide. Exemple: 91100.'
    }
}

export function checkEmailFormat(value) {
    let emailRegex = all_constants.email.regex;
    if (!value.match(emailRegex)) {
        return 'Veuillez renseigner un email valide.';
    }
}

export function checkPasswordFormat(value) {
    let expectedSpecialChar = ['!', '#', '*'];
    let foundSpecialCharCount = 0;
    let foundUppercaseCharCount = 0;
    let foundNumericCount = 0;
    if (typeof(value) !== 'undefined') {
        value = value.trim();
        if (value.length < all_constants.password.min_length) {
            return 'Le mot de passe doit faire au moins ' + all_constants.password.min_length + ' caractères.';
        }
        for (let i = 0; i < expectedSpecialChar.length; i++) {
            if (value.indexOf(expectedSpecialChar[i]) > -1) {
                foundSpecialCharCount++;
            }
        }
        if (foundSpecialCharCount === 0){
            return 'Le mot de passe doit contenir un des caractères suivants: ' + expectedSpecialChar.join(', ') + '.';
        }
        for (let i = 0; i < value.length; i++){
            let char = value.charAt(i);
            if (char === char.toUpperCase() && !expectedSpecialChar.includes(char) && !/^\d+$/.test(char)){
                foundUppercaseCharCount++;
            }
            if (/^\d+$/.test(char)){
                foundNumericCount++;
            }
        }
        if (foundUppercaseCharCount === 0){
            return 'Le mot de passe doit contenir au moins une majuscule.';
        }
        if (foundNumericCount === 0){
            return 'Le mot de passe doit contenir au moins un chiffre.';
        }
    }
}

export function checkFormCoherence(value, fieldLabel, objectToValidate) {
    let userNewPassword = objectToValidate['user_settings_new_password'];
    let userNewPasswordConfirmation = objectToValidate['user_settings_new_password_confirmation'];
    if (typeof(userNewPassword) !== "undefined" || typeof(userNewPasswordConfirmation) !== "undefined"){
        if (userNewPassword !== userNewPasswordConfirmation) {
            return 'Les champs nouveau mot de passe et confirmation nouveau mot de passe doivent être identiques.';
        }
    }
}

export function checkNumericFormat(value, fieldLabel){
    if (typeof(value) !== 'undefined'){
        value = value.toString().trim();
        let regex = null;
        let endMessage = null;
        if (fieldLabel.toLowerCase().includes('siren')){
            regex = /^([0-9]{9})$/g;
            endMessage = ' doit contenir exactement 9 chiffres sans espace.';
        }
        else if (fieldLabel.toLowerCase().includes('siret')){
            regex = /^([0-9]{14})$/g;
            endMessage = ' doit contenir exactement 14 chiffres sans espace.';
        }
        else if (fieldLabel.toLowerCase().includes('téléphone')){
            regex = /^([0-9]{10})$/g;
            endMessage = ' doit contenir exactement 10 chiffres sans espace.';
        }
        if (!value.match(regex)){
            return 'Le champ ' + fieldLabel + endMessage
        }
    }
}

export function checkMaxDishesNumber(value, fieldLabel){
    value = value.toString().trim();
    let regex = /^([0-9]{1,2})$/g;
    if (!value.match(regex)) {
        return 'Le champ ' + fieldLabel + ' est invalide. Exemple: 18.'
    }
}

export function checkHourFormat(value, fieldLabel){
    if (typeof(value) !== 'undefined' && value) {
        value = value.toString().trim();
        let regex = /^([0-9]{1,2})-([0-9]{1,2})$/g;
        let endMessage = null;
        if (fieldLabel.toLowerCase().includes('midi')){
            endMessage = 'Exemple: 11-13'
        }
        else if (fieldLabel.toLowerCase().includes('soir')){
            endMessage = 'Exemple: 18-20'
        }
        if (!value.match(regex)) {
            return 'Le champ ' + fieldLabel + ' est incorrect. ' + endMessage;
        }
    }
}

export function checkHourCoherence(value, fieldLabel){
    if (typeof(value) !== 'undefined') {
        value = value.toString().trim();
        let valueArray = value.split('-');
        let startHour = valueArray[0];
        let endHour = valueArray[1];
        let startMessage = 'Le champ ' + fieldLabel + ' est incorrect. ';
        if (startHour === endHour){
            return startMessage + 'Les heures de début et de fin ne peuvent être identiques.'
        }
        if (startHour > endHour){
            return startMessage + "L'heure de début ne peut pas être supérieure à l'heure de fin."
        }
    }
}

export function checkEmptyDeliveryHours(daysArray, fieldLabel, objectToValidate) {
    let deliveryHours = null;
    if (fieldLabel.toLowerCase().includes('journée')){
        deliveryHours = objectToValidate['noon_delivery_hours'];
    }
    else{
        deliveryHours = objectToValidate['evening_delivery_hours'];
    }
    if (daysArray.length !== 0 && !deliveryHours){  // we gave delivery days but the days are empty
        return 'Vous avez spécifié les jours de livraison ' + daysArray + ' sans préciser de créneau horaire pour ces jours.';
    }
    else if (daysArray.length === 0 && deliveryHours){  // we gave delivery hours but any days
        return 'Vous avez précisé le créneau ' + deliveryHours + " sans préciser les jours où ce créneau s'applique.";
    }
}

export function checkGlobalDeliveryCoherence(value, fieldLabel, objectToValidate){
    let eveningDeliveryHours = objectToValidate['evening_delivery_hours'];
    let noonDeliveryHours = objectToValidate['noon_delivery_hours'];
    if (!eveningDeliveryHours && !noonDeliveryHours) {
        return "Vous devez choisir au moins un créneau horaire en journée ou en soirée.";
    }
}