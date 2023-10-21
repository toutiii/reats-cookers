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

export async function callBackendWithFormDataForCookers(data, url, method) {
  let formData = new FormData();

  const fileName = data.photo.split("/").pop();
  const fileExtension = fileName.split(".").pop();

  formData.append("photo", {
    uri: data.photo,
    name: fileName,
    type: `image/${fileExtension}`,
  });
  formData.append("address_complement", data.address_complement);
  formData.append("firstname", data.firstname);
  formData.append("lastname", data.lastname);
  formData.append("phone", data.phone);
  formData.append("postal_code", data.postal_code);
  formData.append("siret", data.siret);
  formData.append("street_name", data.street_name);
  formData.append("street_number", data.street_number);
  formData.append("town", data.town);

  return callBackEnd(formData, url, method, (useFormData = true));
}
