import { getItemFromSecureStore } from "../helpers/global_helpers";
import { setItemAsync } from "expo-secure-store";
export async function callBackEnd(
  data,
  url,
  method,
  accessToken = null,
  useFormData = false
) {
  console.log(data);
  console.log(url);
  console.log(method);
  console.log(accessToken);
  console.log(useFormData);

  let response = "";
  let headers = {};

  if (accessToken === null) {
    headers = { Accept: "application/json" };
  } else {
    headers = {
      Accept: "application/json",
      Authorization: accessToken,
    };
  }
  console.log(headers);
  let body = data;

  if (!useFormData) {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    body = JSON.stringify(data);
  }

  try {
    response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });
    response = await response.json();
    console.log("**************************************");
    console.log(JSON.stringify(response));
    console.log("**************************************");
    if (
      response.status_code === 401 &&
      response.error_code === "token_not_valid"
    ) {
      await renewAccessToken();
      const newAccessToken = await getItemFromSecureStore("accessToken");
      response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          Authorization: newAccessToken,
        },
        body: body,
      });
      response = await response.json();
      console.log("-------------------------------------------");
      console.log(JSON.stringify(response));
      console.log("-------------------------------------------");
    }
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function renewAccessToken() {
  console.log("=======================================");
  let url = "http://192.168.1.85:8000/api/v1/token/refresh/";
  const refreshToken = await getItemFromSecureStore("refreshToken");

  let formData = new FormData();
  formData.append("refresh", refreshToken);

  console.log(formData);
  console.log(url);

  let response = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });
  response = await response.json();
  console.log(JSON.stringify(response));

  if (response.ok) {
    await setItemAsync("accessToken", `Bearer ${response.access}`);
  }
  console.log("=======================================");
}

export async function callBackEndGET(url, accessToken = null) {
  let response = "";
  let headers = {};

  if (accessToken === null) {
    headers = { Accept: "application/json" };
  } else {
    headers = {
      Accept: "application/json",
      Authorization: accessToken,
    };
  }

  try {
    response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    response = await response.json();
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function callBackendWithFormDataForDishes(
  data,
  url,
  method,
  userID,
  access,
  is_enabled = null
) {
  console.log(data);
  let formData = new FormData();

  if (method === "DELETE") {
    url += data.id + "/";
    return callBackEnd(formData, url, method);
  }

  if (is_enabled !== null) {
    formData.append("is_enabled", is_enabled);
  } else {
    const fileName = data.photo.split("/").pop();
    const fileExtension = fileName.split(".").pop();

    if (data.photo.startsWith("file:///")) {
      formData.append("photo", {
        uri: data.photo,
        name: fileName,
        type: `image/${fileExtension}`,
      });
    }
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("cooker", userID);
  }

  if (data.id !== undefined) {
    url += data.id + "/";
    if (is_enabled === null) {
      method = "PUT";
    } else {
      method = "PATCH";
    }
  }

  return callBackEnd(
    formData,
    url,
    method,
    (accessToken = access),
    (useFormData = true)
  );
}

export async function callBackEndForAuthentication(data, url, method) {
  console.log(data);
  let formData = new FormData();
  formData.append("phone", data.phone);
  return callBackEnd(
    formData,
    url,
    method,
    (accessToken = null),
    (useFormData = true)
  );
}

export async function callBackendWithFormDataForDrinks(
  data,
  url,
  method,
  userID,
  access,
  is_enabled = null
) {
  console.log(data);
  let formData = new FormData();

  if (method === "DELETE") {
    url += data.id + "/";
    return callBackEnd(formData, url, method);
  }

  if (is_enabled !== null) {
    formData.append("is_enabled", is_enabled);
  } else {
    const fileName = data.photo.split("/").pop();
    const fileExtension = fileName.split(".").pop();

    if (data.photo.startsWith("file:///")) {
      formData.append("photo", {
        uri: data.photo,
        name: fileName,
        type: `image/${fileExtension}`,
      });
    }
    formData.append("name", data.name);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("capacity", data.capacity);
    formData.append("unit", data.unit);
    formData.append("cooker", userID);
  }

  if (data.id !== undefined) {
    url += data.id + "/";
    if (is_enabled === null) {
      method = "PUT";
    } else {
      method = "PATCH";
    }
  }

  return callBackEnd(
    formData,
    url,
    method,
    (accessToken = access),
    (useFormData = true)
  );
}

export async function callBackendWithFormDataForCookers(
  data,
  url,
  method,
  userID,
  access
) {
  let formData = new FormData();

  if (data.photo !== undefined && data.photo.startsWith("file:///")) {
    const fileName = data.photo.split("/").pop();
    const fileExtension = fileName.split(".").pop();
    formData.append("photo", {
      uri: data.photo,
      name: fileName,
      type: `image/${fileExtension}`,
    });
  }

  if (method === "PATCH") {
    form_keys = [
      "address_complement",
      "firstname",
      "lastname",
      "max_order_number",
      "postal_code",
      "street_name",
      "street_number",
      "town",
    ];
  } else {
    form_keys = [
      "address_complement",
      "firstname",
      "lastname",
      "phone",
      "postal_code",
      "siret",
      "street_name",
      "street_number",
      "town",
    ];
  }

  for (let i = 0; i < form_keys.length; i++) {
    if (data[form_keys[i]] !== undefined) {
      formData.append(form_keys[i], data[form_keys[i]]);
    }
  }

  if (method === "PATCH") {
    url += userID + "/";
  }

  return callBackEnd(
    formData,
    url,
    method,
    (accessToken = access),
    (useFormData = true)
  );
}
