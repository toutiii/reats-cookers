export function checkMenuCoherence(value, fieldLabel, objectToValidate) {
    let menuStarter = objectToValidate['menu_starter'];
    let menuDessert = objectToValidate['menu_dessert'];
    if (
        (menuStarter === null || typeof(menuStarter) === "undefined") &&
        (menuDessert === null || typeof(menuDessert) === "undefined")
    ){
        return 'Pour créer un menu, vous devez au moins renseigner une entrée et/ou un dessert.';
    }
}