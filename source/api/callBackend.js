export async function callBackEnd(data, url, method, useFormData = false) {
  console.log(data);
  console.log(url);
  console.log(method);
  console.log(useFormData);

  let response = "";
  let headers = { Accept: "application/json" };
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
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function callBackEndGET(url) {
  let response = "";

  try {
    response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
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
    formData.append("cooker", 1); //TODO: Fetch from AsyncStorage when authent is OK
  }

  if (data.id !== undefined) {
    url += data.id + "/";
    if (is_enabled === null) {
      method = "PUT";
    } else {
      method = "PATCH";
    }
  }

  return callBackEnd(formData, url, method, (useFormData = true));
}

export async function callBackEndForAuthentication(data, url, method) {
  console.log(data);
  let formData = new FormData();
  formData.append("phone", data.phone);
  return callBackEnd(formData, url, method, (useFormData = true));
}

export async function callBackendWithFormDataForDrinks(
  data,
  url,
  method,
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
    formData.append("cooker", 1); //TODO: Fetch from AsyncStorage when authent is OK
  }

  if (data.id !== undefined) {
    url += data.id + "/";
    if (is_enabled === null) {
      method = "PUT";
    } else {
      method = "PATCH";
    }
  }

  return callBackEnd(formData, url, method, (useFormData = true));
}

export async function callBackendWithFormDataForCookers(data, url, method) {
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
    url += "1" + "/"; //TODO: Fetch from AsyncStorage when authent is OK
  }

  return callBackEnd(formData, url, method, (useFormData = true));
}
