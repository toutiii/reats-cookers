const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getUserSettings() {
  await sleep(3000);
  const userSettingsObject = {
    personal_infos_section: {
      title: "personal_infos",
      data: {
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
        siret: "36252187900034",
        firstname: "Irène",
        lastname: "JANTEN",
        phone: "0649510110",
        max_order_number: "7",
      },
    },
    address_section: {
      title: "address",
      data: {
        street_number: "1",
        street_name: "rue René Cassin",
        address_complement: "Résidence Neptune",
        postal_code: "91100",
        town: "Corbeil-Essonnes",
      },
    },
  };
  return userSettingsObject;
}
