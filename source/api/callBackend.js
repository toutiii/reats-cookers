export async function callBackEnd(data, url, method, useFormData = false) {
  console.log(data);
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

export async function callBackendWithFormDataForDishes(data, url, method) {
  let formData = new FormData();

  const fileName = data.photo.split("/").pop();
  const fileExtension = fileName.split(".").pop();

  formData.append("photo", {
    uri: data.photo,
    name: fileName,
    type: `image/${fileExtension}`,
  });
  formData.append("category", data.category);
  formData.append("name", data.name);
  formData.append("country", data.country);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("cooker", 1);

  return callBackEnd(formData, url, method, (useFormData = true));
}
