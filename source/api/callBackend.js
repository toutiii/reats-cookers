const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function callBackEnd(data, url, method) {
  await sleep(300);
  let response = "";
  try {
    response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response = await response.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function callBackendWithFormDataForDishes(data, url, method) {
  data.cooker = 1;
  console.log(data);
  return callBackEnd(data, url, method);
}
