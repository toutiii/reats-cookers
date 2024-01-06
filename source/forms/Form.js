import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";
import CustomButton from "../button/CustomButton";
import all_constants from "../constants";
import { validateFields } from "../validators/global_validators";
import FormField from "../components/FormField";
import styles_form from "../styles/styles-form";
import CustomAlert from "../components/CustomAlert";
import { callBackEndGET } from "../api/callBackend";
import { getItemFromSecureStore } from "../helpers/global_helpers";

const getInitialErrorsState = (fieldKeys) => {
  const errors_state = {};
  fieldKeys.forEach((key) => {
    errors_state[key] = "";
  });
  return errors_state;
};

export default function Form({ ...props }) {
  const fieldKeys = Object.keys(props.fields);

  const fieldsObject = props.fields;

  const [newItem, setValues] = useState(props.item);

  const [newItemCopy, setNewImteCopy] = useState(props.item);

  //To be sure to reset form initial content when we press on a flatlist item.
  useEffect(() => {
    setValues(props.item);
  }, [props.item]);

  const [errorMessage, setErrorMessage] = useState("");

  const [validationErrors, setValidationErrors] = useState(
    getInitialErrorsState(fieldKeys)
  );

  const [opacity] = useState(new Animated.Value(1));

  const [isSubmitting, setSubmitting] = useState(false);

  const [showAlert, setStateShowAlert] = useState(false);

  const [showAlertCancel, setShowAlertCancel] = useState(false);

  const [noErrorsFound, setNoErrorsFound] = useState(true);

  const [apiOkResponse, setApiOkResponse] = useState(false);

  const [showAlertDisable, setShowAlertDisable] = useState(false);

  const [showAlertRemove, setShowAlertRemove] = useState(false);

  const [showAlertEnable, setShowAlertEnable] = useState(false);

  const onChangeValue = (key, value) => {
    const newState = { ...newItem, [key]: value };
    setValues(newState);
    if (validationErrors[key]) {
      const newErrors = { ...validationErrors, [key]: "" };
      setValidationErrors(newErrors);
    }
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0.2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const submit = async () => {
    let result = {};
    result.ok = false;
    setSubmitting(true);
    setErrorMessage("");
    setValidationErrors(getInitialErrorsState(fieldKeys, props));
    const errors = validateFields(props.fields, newItem);
    if (Object.keys(errors).length !== 0) {
      setSubmitting(false);
      setStateShowAlert(true);
      setNoErrorsFound(true);
      return setValidationErrors(errors);
    }
    fadeOut();
    try {
      const userID = await getItemFromSecureStore("userID");
      const accessToken = await getItemFromSecureStore("accessToken");

      const result = await props.action(
        newItem,
        props.url,
        props.method,
        userID,
        accessToken
      );
      setApiOkResponse(result.ok);
      fadeIn();
      if (props.afterSubmit === undefined || props.afterSubmit === null) {
        setStateShowAlert(true);
      }
    } catch (e) {
      setErrorMessage(e.message);
      fadeIn();
    }
    setSubmitting(false);

    if (props.afterSubmit) {
      props.afterSubmit(result.ok, newItem);
    }
  };

  const disableItemAction = async () => {
    setShowAlertDisable(false);
    setSubmitting(true);
    setErrorMessage("");
    fadeOut();
    try {
      newItem.is_enabled = false;
      const userID = await getItemFromSecureStore("userID");
      const accessToken = await getItemFromSecureStore("accessToken");

      const result = await props.action(
        newItem,
        props.url,
        props.method,
        userID,
        accessToken,
        (is_enabled = false)
      );

      setApiOkResponse(result.ok);
      fadeIn();
      setStateShowAlert(true);
    } catch (e) {
      setErrorMessage(e.message);
      fadeIn();
    }
    setSubmitting(false);
  };

  const enableItemAction = async () => {
    setShowAlertEnable(false);
    setSubmitting(true);
    setErrorMessage("");
    fadeOut();
    try {
      newItem.is_enabled = true;
      const userID = await getItemFromSecureStore("userID");
      const accessToken = await getItemFromSecureStore("accessToken");
      const result = await props.action(
        newItem,
        props.url,
        props.method,
        userID,
        accessToken,
        (is_enabled = true)
      );

      setApiOkResponse(result.ok);
      fadeIn();
      setStateShowAlert(true);
    } catch (e) {
      setErrorMessage(e.message);
      fadeIn();
    }
    setSubmitting(false);
  };

  const removeItemAction = async () => {
    setShowAlertRemove(false);
    setSubmitting(true);
    setErrorMessage("");
    fadeOut();
    try {
      newItemCopy.to_delete = true;
      const result = await props.action(newItem, props.url, "DELETE");

      setApiOkResponse(result.ok);
      fadeIn();
      setStateShowAlert(true);
    } catch (e) {
      setErrorMessage(e.message);
      fadeIn();
    }
    setSubmitting(false);
  };

  const navigateToSignupForm = () => {
    props.navigation.navigate("SignupForm");
  };
  const [reloadScreen, setReloadScreen] = useState(false);
  const getTownFromPostalCode = async (postalCode) => {
    if (postalCode !== null) {
      let townResults = await callBackEndGET(
        `https://geo.api.gouv.fr/communes?codePostal=${postalCode}`
      );

      if (townResults.length === 0) {
        console.error("No towns for postal code ", postalCode);
        return;
      }

      for (let i = 0; i < townResults.length; i++) {
        let tempObject = townResults[i];
        fieldsObject["town"].autoCompleteValues.push({
          id: i.toString(),
          title: tempObject.nom,
        });
      }
      fieldsObject["town"].hideLabel = false;
      fieldsObject["town"].fieldIsMandatory = true;
    } else {
      fieldsObject["town"].autoCompleteValues = [];
      fieldsObject["town"].hideLabel = true;
      fieldsObject["town"].fieldIsMandatory = false;
    }
    setReloadScreen(true);
    console.log(fieldsObject["town"]);
  };

  useEffect(() => {
    console.log("Reloading screen");
    setReloadScreen(false);
  }, [reloadScreen]);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles_form.container}>
          {isSubmitting && (
            <View style={styles_form.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="tomato" />
            </View>
          )}
          {!isSubmitting && noErrorsFound && apiOkResponse && (
            <CustomAlert
              show={showAlert}
              title={all_constants.messages.success.title}
              confirmButtonColor="green"
              onConfirmPressed={() => {
                setStateShowAlert(false);
                if (JSON.stringify(newItem) !== JSON.stringify(newItemCopy)) {
                  if (props.refreshDataStateChanger !== undefined) {
                    props.refreshDataStateChanger(true);
                  }
                }

                props.navigation.goBack(null);
              }}
            />
          )}
          {!isSubmitting && noErrorsFound && !apiOkResponse && (
            <CustomAlert
              show={showAlert}
              title={all_constants.messages.failed.title}
              confirmButtonColor="red"
              onConfirmPressed={() => {
                setStateShowAlert(false);
              }}
            />
          )}
          {showAlertCancel && (
            <CustomAlert
              show={showAlertCancel}
              title={all_constants.custom_alert.form.title}
              message={all_constants.custom_alert.form.message}
              confirmButtonColor="green"
              showCancelButton={true}
              cancelButtonColor="red"
              cancelText={all_constants.custom_alert.homeview.cancel_text}
              onConfirmPressed={() => {
                setShowAlertCancel(false);
                props.navigation.goBack();
              }}
              onCancelPressed={() => {
                setShowAlertCancel(false);
              }}
            />
          )}
          {showAlertDisable && (
            <CustomAlert
              show={showAlertDisable}
              title={all_constants.custom_alert.form.title}
              message={all_constants.custom_alert.form.disable_item_message}
              confirmButtonColor="green"
              showCancelButton={true}
              cancelButtonColor="red"
              cancelText={all_constants.custom_alert.homeview.cancel_text}
              onConfirmPressed={disableItemAction}
              onCancelPressed={() => {
                setShowAlertDisable(false);
              }}
            />
          )}
          {showAlertEnable && (
            <CustomAlert
              show={showAlertEnable}
              title={all_constants.custom_alert.form.title}
              message={all_constants.custom_alert.form.enable_item_message}
              confirmButtonColor="green"
              showCancelButton={true}
              cancelButtonColor="red"
              cancelText={all_constants.custom_alert.homeview.cancel_text}
              onConfirmPressed={enableItemAction}
              onCancelPressed={() => {
                setShowAlertEnable(false);
              }}
            />
          )}
          {showAlertRemove && (
            <CustomAlert
              show={showAlertRemove}
              title={all_constants.custom_alert.form.title}
              message={all_constants.custom_alert.form.remove_item_message}
              confirmButtonColor="green"
              showCancelButton={true}
              cancelButtonColor="red"
              cancelText={all_constants.custom_alert.homeview.cancel_text}
              onConfirmPressed={removeItemAction}
              onCancelPressed={() => {
                setShowAlertRemove(false);
              }}
            />
          )}

          <Animated.View style={{ flex: 1, opacity, width: "100%" }}>
            {fieldKeys.map((key) => {
              return (
                <FormField
                  key={key}
                  login={props.login}
                  isEditable={props.isEditable ? props.isEditable : true}
                  newItem={newItem}
                  fieldName={key}
                  field={fieldsObject[key]}
                  error={validationErrors[key]}
                  onChangeText={onChangeValue}
                  value={newItem[key]}
                  customSelectValues={props.customSelectValues}
                  showAlert={showAlert}
                  getTownFromPostalCode={getTownFromPostalCode}
                  onConfirmPressed={() => {
                    setStateShowAlert(false);
                  }}
                />
              );
            })}
          </Animated.View>
          <View style={{ flex: 1 }}>
            <View style={styles_form.submit_button}>
              <CustomButton
                label={all_constants.messages.submit}
                height={50}
                border_width={3}
                border_radius={30}
                font_size={18}
                backgroundColor={"green"}
                label_color="white"
                onPress={submit}
              />
            </View>
            {props.login ? (
              <View style={{ flex: 1 }}>
                <View style={styles_form.form_button}>
                  <CustomButton
                    label={all_constants.messages.signup}
                    height={50}
                    border_width={3}
                    border_radius={30}
                    font_size={18}
                    backgroundColor={"dimgrey"}
                    label_color="white"
                    onPress={navigateToSignupForm}
                  />
                </View>
              </View>
            ) : (
              <View style={styles_form.form_button}>
                <CustomButton
                  label={all_constants.messages.cancel}
                  height={50}
                  border_width={3}
                  border_radius={30}
                  font_size={18}
                  backgroundColor={"red"}
                  label_color="white"
                  onPress={() => {
                    setShowAlertCancel(true);
                  }}
                />
              </View>
            )}
            {newItem.is_enabled && props.third_button_label && (
              <View style={styles_form.form_button}>
                <CustomButton
                  label={props.third_button_label}
                  height={50}
                  border_radius={30}
                  font_size={18}
                  backgroundColor={"tomato"}
                  label_color="white"
                  onPress={() => {
                    setShowAlertDisable(true);
                  }}
                />
              </View>
            )}

            {!newItem.is_enabled &&
              props.third_bis_button_label &&
              !props.isNewItem && (
                <View style={styles_form.form_button}>
                  <CustomButton
                    label={props.third_bis_button_label}
                    height={50}
                    border_radius={30}
                    font_size={18}
                    backgroundColor={"tomato"}
                    label_color="white"
                    onPress={() => {
                      setShowAlertEnable(true);
                    }}
                  />
                </View>
              )}

            {newItem.id !== undefined && props.fourth_button_label && (
              <View style={styles_form.form_button}>
                <CustomButton
                  label={props.fourth_button_label}
                  height={50}
                  border_radius={30}
                  font_size={18}
                  backgroundColor={"darkgrey"}
                  label_color="white"
                  onPress={() => {
                    setShowAlertRemove(true);
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
