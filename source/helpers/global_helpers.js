import * as SecureStore from "expo-secure-store";

export function getCategories() {
  return [
    { label: "Entrée", value: "starter" },
    { label: "Plat principal", value: "dish" },
    { label: "Dessert", value: "dessert" },
  ];
}

export function getCapacityUnits() {
  return [
    { label: "Litre", value: "liter" },
    { label: "Centilitres", value: "centiliters" },
  ];
}

export function getDaysOfWeek() {
  const daysOfWeek = [
    {
      Key: 1,
      value: "Lundi",
    },
    {
      key: 2,
      value: "Mardi",
    },
    {
      key: 3,
      value: "Mercredi",
    },
    {
      key: 4,
      value: "Jeudi",
    },
    {
      key: 5,
      value: "Vendredi",
    },
    {
      key: 6,
      value: "Samedi",
    },
    {
      key: 7,
      value: "Dimanche",
    },
  ];
  return daysOfWeek;
}

export function getCountries() {
  return [
    { id: "1", title: "Afghanistan" },
    { id: "2", title: "Albanie" },
    { id: "3", title: "Algérie" },
    { id: "4", title: "Andorre" },
    { id: "5", title: "Angola" },
    { id: "6", title: "Antigua-et-Barbuda" },
    { id: "7", title: "Argentine" },
    { id: "8", title: "Arménie" },
    { id: "9", title: "Australie" },
    { id: "10", title: "Autriche" },
    { id: "11", title: "Azerbaïdjan" },
    { id: "12", title: "Bahamas" },
    { id: "13", title: "Bahreïn" },
    { id: "14", title: "Bangladesh" },
    { id: "15", title: "Barbade" },
    { id: "16", title: "Biélorussie" },
    { id: "17", title: "Belgique" },
    { id: "18", title: "Belize" },
    { id: "19", title: "Bénin" },
    { id: "20", title: "Bhoutan" },
    { id: "21", title: "Bolivie" },
    { id: "22", title: "Bosnie-Herzégovine" },
    { id: "23", title: "Botswana" },
    { id: "24", title: "Brésil" },
    { id: "25", title: "Brunei" },
    { id: "26", title: "Bulgarie" },
    { id: "27", title: "Burkina Faso" },
    { id: "28", title: "Burundi" },
    { id: "29", title: "Cabo Verde" },
    { id: "30", title: "Cambodge" },
    { id: "31", title: "Cameroun" },
    { id: "32", title: "Canada" },
    { id: "33", title: "République centrafricaine" },
    { id: "34", title: "Tchad" },
    { id: "35", title: "Chili" },
    { id: "36", title: "Chine" },
    { id: "37", title: "Colombie" },
    { id: "38", title: "Comores" },
    { id: "39", title: "Congo" },
    { id: "40", title: "Costa Rica" },
    { id: "41", title: "Côte d'Ivoire" },
    { id: "42", title: "Croatie" },
    { id: "43", title: "Cuba" },
    { id: "44", title: "Chypre" },
    { id: "45", title: "République tchèque" },
    { id: "46", title: "Danemark" },
    { id: "47", title: "Djibouti" },
    { id: "48", title: "Dominique" },
    { id: "49", title: "République dominicaine" },
    { id: "50", title: "Équateur" },
    { id: "51", title: "Égypte" },
    { id: "52", title: "Salvador" },
    { id: "53", title: "Guinée équatoriale" },
    { id: "54", title: "Érythrée" },
    { id: "55", title: "Estonie" },
    { id: "56", title: "Eswatini" },
    { id: "57", title: "Éthiopie" },
    { id: "58", title: "Fidji" },
    { id: "59", title: "Finlande" },
    { id: "60", title: "France" },
    { id: "61", title: "Gabon" },
    { id: "62", title: "Gambie" },
    { id: "63", title: "Géorgie" },
    { id: "64", title: "Allemagne" },
    { id: "65", title: "Ghana" },
    { id: "66", title: "Grèce" },
    { id: "67", title: "Grenade" },
    { id: "68", title: "Guatemala" },
    { id: "69", title: "Guinée" },
    { id: "70", title: "Guinée-Bissau" },
    { id: "71", title: "Guyana" },
    { id: "72", title: "Haïti" },
    { id: "73", title: "Honduras" },
    { id: "74", title: "Hongrie" },
    { id: "75", title: "Islande" },
    { id: "76", title: "Inde" },
    { id: "77", title: "Indonésie" },
    { id: "78", title: "Iran" },
    { id: "79", title: "Irak" },
    { id: "80", title: "Irlande" },
    { id: "81", title: "Israël" },
    { id: "82", title: "Italie" },
    { id: "83", title: "Jamaïque" },
    { id: "84", title: "Japon" },
    { id: "85", title: "Jordanie" },
    { id: "86", title: "Kazakhstan" },
    { id: "87", title: "Kenya" },
    { id: "88", title: "Kiribati" },
    { id: "89", title: "Corée du Nord" },
    { id: "90", title: "Corée du Sud" },
    { id: "91", title: "Koweït" },
    { id: "92", title: "Kirghizistan" },
    { id: "93", title: "Laos" },
    { id: "94", title: "Lettonie" },
    { id: "95", title: "Liban" },
    { id: "96", title: "Lesotho" },
    { id: "97", title: "Liberia" },
    { id: "98", title: "Libye" },
    { id: "99", title: "Liechtenstein" },
    { id: "100", title: "Lituanie" },
    { id: "101", title: "Luxembourg" },
    { id: "102", title: "Madagascar" },
    { id: "103", title: "Malawi" },
    { id: "104", title: "Malaisie" },
    { id: "105", title: "Maldives" },
    { id: "106", title: "Mali" },
    { id: "107", title: "Malte" },
    { id: "108", title: "Îles Marshall" },
    { id: "109", title: "Mauritanie" },
    { id: "110", title: "Maurice" },
    { id: "111", title: "Mexique" },
    { id: "112", title: "Micronésie" },
    { id: "113", title: "Moldavie" },
    { id: "114", title: "Monaco" },
    { id: "115", title: "Mongolie" },
    { id: "116", title: "Monténégro" },
    { id: "117", title: "Maroc" },
    { id: "118", title: "Mozambique" },
    { id: "119", title: "Myanmar" },
    { id: "120", title: "Namibie" },
    { id: "121", title: "Nauru" },
    { id: "122", title: "Népal" },
    { id: "123", title: "Pays-Bas" },
    { id: "124", title: "Nouvelle-Zélande" },
    { id: "125", title: "Nicaragua" },
    { id: "126", title: "Niger" },
    { id: "127", title: "Nigeria" },
    { id: "128", title: "Macédoine du Nord" },
    { id: "129", title: "Norvège" },
    { id: "130", title: "Oman" },
    { id: "131", title: "Pakistan" },
    { id: "132", title: "Palaos" },
    { id: "133", title: "Panama" },
    { id: "134", title: "Papouasie-Nouvelle-Guinée" },
    { id: "135", title: "Paraguay" },
    { id: "136", title: "Pérou" },
    { id: "137", title: "Philippines" },
    { id: "138", title: "Pologne" },
    { id: "139", title: "Portugal" },
    { id: "140", title: "Qatar" },
    { id: "141", title: "République du Congo" },
    { id: "142", title: "Roumanie" },
    { id: "143", title: "Russie" },
    { id: "144", title: "Rwanda" },
    { id: "145", title: "Saint-Kitts-et-Nevis" },
    { id: "146", title: "Sainte-Lucie" },
    { id: "147", title: "Saint-Vincent-et-les Grenadines" },
    { id: "148", title: "Samoa" },
    { id: "149", title: "Saint-Marin" },
    { id: "150", title: "Sao Tomé-et-Principe" },
    { id: "151", title: "Arabie saoudite" },
    { id: "152", title: "Sénégal" },
    { id: "153", title: "Serbie" },
    { id: "154", title: "Seychelles" },
    { id: "155", title: "Sierra Leone" },
    { id: "156", title: "Singapour" },
    { id: "157", title: "Slovaquie" },
    { id: "158", title: "Slovénie" },
    { id: "159", title: "Îles Salomon" },
    { id: "160", title: "Somalie" },
    { id: "161", title: "Afrique du Sud" },
    { id: "162", title: "Soudan du Sud" },
    { id: "163", title: "Espagne" },
    { id: "164", title: "Sri Lanka" },
    { id: "165", title: "Soudan" },
    { id: "166", title: "Suriname" },
    { id: "167", title: "Suède" },
    { id: "168", title: "Suisse" },
    { id: "169", title: "Syrie" },
    { id: "170", title: "Tadjikistan" },
    { id: "171", title: "Tanzanie" },
    { id: "172", title: "Thaïlande" },
    { id: "173", title: "Timor oriental" },
    { id: "174", title: "Togo" },
    { id: "175", title: "Tonga" },
    { id: "176", title: "Trinité-et-Tobago" },
    { id: "177", title: "Tunisie" },
    { id: "178", title: "Turquie" },
    { id: "179", title: "Turkménistan" },
    { id: "180", title: "Tuvalu" },
    { id: "181", title: "Ouganda" },
    { id: "182", title: "Ukraine" },
    { id: "183", title: "Émirats arabes unis" },
    { id: "184", title: "Royaume-Uni" },
    { id: "185", title: "États-Unis" },
    { id: "186", title: "Uruguay" },
    { id: "187", title: "Ouzbékistan" },
    { id: "188", title: "Vanuatu" },
    { id: "189", title: "Venezuela" },
    { id: "190", title: "Viêt Nam" },
    { id: "191", title: "Yémen" },
    { id: "192", title: "Zambie" },
    { id: "193", title: "Zimbabwe" },
    { id: "194", title: "Palestine" },
  ];
}

export function getCountryIdByName(countryName) {
  let countries = getCountries();

  for (let i = 0; i < countries.length; i++) {
    if (countries[i].title === countryName) {
      return countries[i].id;
    }
  }
}

export async function getItemFromSecureStore(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}
