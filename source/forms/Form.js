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

  const [noErrorsFound, setNoErrorsFound] = useState(true);

  const [apiOkResponse, setApiOkResponse] = useState(false);

  const [wantToGoBack, setWantToGoBack] = useState(false);

  const [disableState, setDisableState] = useState(false);

  const [removeState, setRemoveState] = useState(false);

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
      const result = await props.action(newItem, props.url, props.method);
      setApiOkResponse(result.ok);
      fadeIn();
      setStateShowAlert(true);
    } catch (e) {
      setErrorMessage(e.message);
      fadeIn();
    }
    setSubmitting(false);
  };

  const disableItemAction = async () => {
    setDisableState(false);
    setStateShowAlert(false);
    setSubmitting(true);
    setErrorMessage("");
    fadeOut();
    try {
      newItem.is_enabled = false;
      const result = await props.action(
        newItem,
        props.url,
        props.method,
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

  const removeItemAction = async () => {
    setRemoveState(false);
    setStateShowAlert(false);
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

  const cancel = () => {
    setWantToGoBack(true);
    setStateShowAlert(true);
  };

  const disableItem = () => {
    setDisableState(true);
    setStateShowAlert(true);
  };

  const removeItem = () => {
    setRemoveState(true);
    setStateShowAlert(true);
  };

  const signupForm = () => {
    props.navigation.navigate("SignupForm");
  };

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
                  props.refreshDataStateChanger(true);
                }

                props.navigation.goBack(null);
              }}
            />
          )}
          {showAlert && wantToGoBack && (
            <CustomAlert
              show={showAlert}
              title={all_constants.custom_alert.form.title}
              message={all_constants.custom_alert.form.message}
              confirmButtonColor="green"
              showCancelButton={true}
              cancelButtonColor="red"
              cancelText={all_constants.custom_alert.homeview.cancel_text}
              onConfirmPressed={() => {
                setStateShowAlert(false);
                setWantToGoBack(false);
                props.navigation.goBack();
              }}
              onCancelPressed={() => {
                setStateShowAlert(false);
                setWantToGoBack(false);
              }}
            />
          )}
          {props.third_button_label && showAlert && disableState && (
            <CustomAlert
              show={showAlert}
              title={all_constants.custom_alert.form.title}
              message={all_constants.custom_alert.form.disable_item_message}
              confirmButtonColor="green"
              showCancelButton={true}
              cancelButtonColor="red"
              cancelText={all_constants.custom_alert.homeview.cancel_text}
              onConfirmPressed={disableItemAction}
              onCancelPressed={() => {
                setDisableState(false);
                setStateShowAlert(false);
              }}
            />
          )}
          {props.fourth_button_label && showAlert && removeState && (
            <CustomAlert
              show={showAlert}
              title={all_constants.custom_alert.form.title}
              message={all_constants.custom_alert.form.remove_item_message}
              confirmButtonColor="green"
              showCancelButton={true}
              cancelButtonColor="red"
              cancelText={all_constants.custom_alert.homeview.cancel_text}
              onConfirmPressed={removeItemAction}
              onCancelPressed={() => {
                setRemoveState(false);
                setStateShowAlert(false);
              }}
            />
          )}

          {!isSubmitting &&
            noErrorsFound &&
            !apiOkResponse &&
            !wantToGoBack &&
            !disableState &&
            !removeState && (
              <CustomAlert
                show={showAlert}
                title={all_constants.messages.failed.title}
                confirmButtonColor="red"
                onConfirmPressed={() => {
                  setStateShowAlert(false);
                }}
              />
            )}
          <Animated.View style={{ flex: 1, opacity, width: "100%" }}>
            {fieldKeys.map((key) => {
              return (
                <FormField
                  key={key}
                  login={props.login}
                  itemObject={props.item}
                  isEditable={props.isEditable ? props.isEditable : true}
                  newItem={newItem}
                  fieldName={key}
                  field={fieldsObject[key]}
                  error={validationErrors[key]}
                  onChangeText={onChangeValue}
                  value={newItem[key]}
                  customSelectValues={props.customSelectValues}
                  showAlert={showAlert}
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
                <View style={styles_form.cancel_button}>
                  <CustomButton
                    label={all_constants.messages.signup}
                    height={50}
                    border_width={3}
                    border_radius={30}
                    font_size={18}
                    backgroundColor={"dimgrey"}
                    label_color="white"
                    onPress={signupForm}
                  />
                </View>
              </View>
            ) : (
              <View style={styles_form.cancel_button}>
                <CustomButton
                  label={all_constants.messages.cancel}
                  height={50}
                  border_width={3}
                  border_radius={30}
                  font_size={18}
                  backgroundColor={"red"}
                  label_color="white"
                  onPress={cancel}
                />
              </View>
            )}
            {Object.keys(props.item).length !== 0 &&
            !props.is_new_item &&
            props.third_button_label ? (
              <View style={styles_form.cancel_button}>
                <CustomButton
                  label={props.third_button_label}
                  height={50}
                  border_radius={30}
                  font_size={18}
                  backgroundColor={"tomato"}
                  label_color="white"
                  onPress={disableItem}
                />
              </View>
            ) : (
              <View></View>
            )}
            {Object.keys(props.item).length !== 0 &&
            !props.is_new_item &&
            props.fourth_button_label ? (
              <View style={styles_form.cancel_button}>
                <CustomButton
                  label={props.fourth_button_label}
                  height={50}
                  border_radius={30}
                  font_size={18}
                  backgroundColor={"darkgrey"}
                  label_color="white"
                  onPress={removeItem}
                />
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
