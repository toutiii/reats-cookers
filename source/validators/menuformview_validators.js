import all_constants from "../constants";

export function checkMenuCoherence(value, fieldLabel, objectToValidate) {
  let menuStarter = objectToValidate["menu_starter"];
  let menuDessert = objectToValidate["menu_dessert"];
  if (
    (menuStarter === null || typeof menuStarter === "undefined") &&
    (menuDessert === null || typeof menuDessert === "undefined")
  ) {
    return all_constants.validators.menu.menu_creation_error;
  }
}
