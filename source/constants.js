import { Dimensions } from "react-native";

export const all_constants = {
  stars_images: {
    black: require("./images/black-star.png"),
    green: require("./images/green-star.png"),
    yellow: require("./images/yellow-star.png"),
  },
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  email: {
    regex:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  colors: {
    inputBorderColor: "#ffd700",
    login_background_color: ["red", "yellow", "green"],
  },

  messages: {
    login: "CONNEXION",
    logout: "DÉCONNEXION",
    settings: "PARAMÈTRES",
    send: "ENVOYER",
    submit: "VALIDER",
    cancel: "ANNULER",
    signup: "CRÉER UN COMPTE",
    take_picture: "Prendre une photo",
    upload_picture: "Ouvrir la galerie",
    errors: {
      title: "Erreur",
      empty_email: "Veuillez renseigner votre mail",
      wrong_email_format: "Veuillez entrer un email valide",
    },
    success: {
      title: "Succès",
      email_sent: "Un email a été envoyé à ",
    },
    failed: {
      title: "Échec",
    },
    warning: {
      title: "Attention",
    },
    orders: {
      accept: {
        title: "Statut de la commande",
        message: "La commande a bien été acceptée.",
      },
      cancel: {
        title: "Statut de la commande",
        message: "La commande a bien été annulée.",
      },
      error: {
        title: "Erreur",
        message:
          "L'opération a échoué. Attendez quelques minutes avant de réessayer.",
      },
    },
  },
  label: {
    home: {
      offline: "En ligne",
      online: "Hors ligne",
      status: {
        online: "En ligne",
        offline: "Hors ligne",
      },
      online_alert: "You are online now and you can receive orders.",
      offline_alert:
        "You are offline so users will not be able to send you orders.",
      current_week_orders: "CURRENT WEEK ORDERS",
      paid: "Payées",
      canceled: "Annulées",
      total: "TOTAL",
      balance: "SOLDE",
      pending: "En attente",
      global_stats: "STATISTIQUES",
      average_response_time: "Temps moyen de réponse",
      average_approval_rate: "Taux acceptation commandes",
      average_cancel_rate: "Taux annulation commandes",
      average_rating: "Note générale",
    },
    balance: {
      title: "Paiements",
    },
    order: {
      accept: "ACCEPTER LA COMMANDE",
      reject: "REJETER LA COMMANDE",
    },

    dishes: {
      add_dish: "AJOUTER UN PLAT",
      remove_dish: "SUPPRIMER",
      disable_dish: "DÉSACTIVER",
    },
    settings: {
      section_title: {
        credential_infos: "Mes informations de connexion",
        personal_infos: "Mes informations personnelles",
        address: "Mon adresse",
        order_infos: "Mes informations de commande",
      },
      my_account: "Mes paramètres",
      firstname: "Prénom",
      lastname: "Nom",
      phone: "Téléphone",
      address: "Adresse",
      postal_code: "Code postal",
      town: "Ville",
      change_settings: "MODIFIER",
      siret: "SIRET",
      order_days: "Prise commande",
      max_order_number: "Nombre max de commandes",
      email: "Email",
      street_number: "Numéro de rue",
      street_name: "Nom de la rue",
      address_complement: "Complément",
      select_days_of_week: "Sélectionnez les jours de la semaine",
    },
    stats: {
      title: "Mes statistiques",
      automatic_message: "Ces données sont mises à jour automatiquement.",
    },
    form: {
      order: {
        start_date: "Date de début",
        end_date: "Date de fin",
      },
      dishes: {
        name: "Nom",
        price: "Prix",
        image: "Photo",
        category: "Catégorie",
        description: "Description",
        country: "Pays d'origine de l'item",
      },
      settings: {
        email: "Email",
        siret: "Numéro SIRET",
        firstname: "Prénom",
        lastname: "Nom",
        phone: "Numéro de téléphone",
        street_number: "Numéro",
        street_name: "Rue",
        address_complement: "Complément d'adresse",
        postal_code: "Code postal",
        town: "Ville",
        order_days: "Jours de prise de commandes",
        max_order_number: "Votre nombre max de plats",
        image: "Photo de profil",
      },
      login: {
        email: "Email",
      },
    },
  },
  dishes: {
    no_dishes_found: "Aucun plat trouvé.",
  },
  order: {
    infos: {
      number: "Commande N°",
      status: "Statut:",
      owner: "Passée par",
      amount: "Cette commande vous rapporte",
      dish_quantity: "Nombre de plats:",
      content: "Cette commande contient:",
      ordered_label: "le",
      canceled_label: "Commande annulée le",
      approved_label: "Commande acceptée le",
      delivered_label: "Livraison prévue le",
      picking_label: "Ramassage prévu le",
      dish_unit_price: "Prix unitaire:",
      total: "Total:",
    },
    status: {
      canceled: "Annulée",
      delivered: "Livrée",
      pending: "En attente de prise en charge",
      approved: "Acceptée",
    },
    no_results: "Aucune commande trouvée.",
  },
  modal: {
    dish_modal: {
      show: "AFFICHER LES PLATS",
      hide: "FERMER",
    },
    order_modal: {
      show: "AFFICHER LE RÉCAPITULATIF",
      hide: "FERMER",
      intro:
        "Vous pouvez visualiser ici des informations générales sur vos commandes en cours. \n",
      received_order: "Total des commandes reçues",
      received_dishes: "Nombre de plats à préparer",
      detail: "Détails des plats",
      delivery_schedule: "Planning de passage livreurs",
    },
    form: {
      settings: {
        order_days:
          "Vous choisissez ici les jours où les clients peuvent vous passer des commandes. \n \n" +
          "Ex: Mardi,Mercredi \n \n" +
          "Cela signifie que vous acceptez de recevoir uniquement les commandes les mardis et mercredis. \n \n " +
          "En dehors de ces jours, vous ne serez pas visible des clients et vous ne recevrez donc aucune commande.",
        max_order_number:
          "Vous estimez ici le nombre maximal de plats que vous pensez pouvoir préparer sur une période. \n \n" +
          "Ex: 18 \n \n" +
          "Cela signifie que vous ne pourrez jamais avoir plus de 18 plats à préparer par vague de commandes. \n \n " +
          "Veillez à ne pas en mettre trop pour pouvoir être dans les temps pour la collecte des commandes par nos livreurs. \n \n" +
          "Attention, il ne s'agit pas forcément ici du nombre de commandes. En effet une commande peut comporter plusieurs plats.",
      },
    },
  },

  balance: {
    no_balance_found: "Aucun item trouvé.",
  },

  validators: {
    global: {
      field: "Le champ ",
      is_empty: " est vide.",
      invalid_char: " est invalide. Veuillez enlever le ",
      invalid_price: " est invalide. Exemple: 13.90",
      invalid_quantity: " est invalide. Exemple: 2",
      invalid_postal_code: " est invalide. Exemple: 91100.",
      invalid_max_dishes_number_format: " est invalide. Exemple: 18.",
    },

    settings: {
      invalid_email_error: "Veuillez renseigner un email valide.",
      siren_format_error: " doit contenir exactement 9 chiffres sans espace.",
      siret_format_error: " doit contenir exactement 14 chiffres sans espace.",
      phone_format_error: " doit contenir exactement 10 chiffres sans espace.",
    },
    includes: {
      siret: "siret",
      phone: "téléphone",
    },
  },
  field_type: {
    textinput: "textinput",
    image: "image",
    textarea: "textarea",
    select: "select",
    select_picker: "select_picker",
    date_picker: "date_picker",
  },
  placeholders: {
    form: {
      dishes: {
        dish_category: "Sélectionnez la catégorie de votre item",
        dish_name: "Le nom de votre item",
        dish_price: "Il s'agit ici du prix TTC affiché aux clients",
        dish_description: "Une courte description de votre item",
        dish_country:
          "Pas obligatoire mais très recommandé, surtout pour les plats",
      },
      settings: {
        street_number: "Numéro de rue",
        street_name: "Ex: rue René Cassin",
        address_complement: "Complément d'adresse",
        postal_code: "Votre code postal",
        town: "Votre ville",
        email: "Votre email",
        order_days: "Sélectionnez les jours où vous acceptez les commandes",
        max_order_number:
          "Le nombre maximum de plats que vous pouvez préparer à la fois",
        siret: "Un numéro SIRET",
        firstname: "Votre prénom",
        lastname: "Votre nom de famille",
        phone: "Ex: 0601020304",
      },
      login: {
        email: "Votre email",
      },
      order: {
        start_date: "Sélectionnez une date de début",
        end_date: "Sélectionnez une date de fin",
      },
    },
  },
  remaining_char: "Caractères restants: ",
  permissions: {
    camera: "Pour prendre une photo, veuillez autoriser la caméra.",
    gallery: "Pour charger une photo, veuillez accepter l'autorisation.",
    error: "Erreur de permission",
  },
  currency_symbol: "€",
  tab: {
    main_tab_navigator: {
      Home: "Accueil",
      DishFlatList: "Mes plats",
      OrderFlatList: "Commandes",
    },
  },
  custom_alert: {
    homeview: {
      online_title: "Passer en ligne ?",
      offline_title: "Passer hors ligne ?",
      cancel_text: "ANNULER",
      go_online: "Vous pourrez à nouveau recevoir des commandes.",
      go_offline: "ATTENTION, vous ne pourrez plus recevoir de commandes !",
      logout_title: "DÉCONNEXION",
      logout_message: "Souhaitez-vous vous déconnecter ?",
    },
    form: {
      title: "ATTENTION",
      message:
        "Quitter le formulaire et revenir en arrière ? (vos modifications seront toujours présentes tant que vous ne sélectionnez pas un autre formulaire).",
      disable_item_message:
        "En désactivant un plat, celui-ci ne sera pas supprimé mais ne sera plus visible des clients.",
      remove_item_message: "Supprimer définitivement cet item ?",
    },
    orderview: {
      accept_order_title: "Accepter la commande ?",
      accept_order_message:
        "Vous êtes sur le point d'accepter la commande." +
        "\n" +
        "Cette action enverra une confirmation au client." +
        "\n" +
        "Notez que vous avez 2 heures pour accepter une commande. Passé ce délai, la commande sera automatiquement annulée.",
      decline_order_title: "Refuser la commande ?",
      decline_order_message:
        "Vous êtes sur le point d'annuler la commande." +
        "\n" +
        "Attention : une fois annulée, la commande ne pourra plus être acceptée." +
        "\n" +
        "Chaque commande annulée baissera votre note générale. " +
        "\n" +
        "Le client sera prévenu que vous avez annulé sa commande.",
    },
  },
  uri: {
    api: {
      mock: "https://postman-echo.com/post",
    },
    rating_star:
      "https://starpng.com/public/uploads/preview/yellow-star-transparent-background-png-101577029288c5hv8odvjm.png",
  },

  main_drawer_navigator: {
    titles: {
      home: "Accueil",
      orders: "Mes commandes",
      balance: "Mon solde",
      settings: "Mes paramètres",
      stats: "Mes statistiques",
    },
  },
  dashboard: {
    scroll_update:
      "Pour mettre à jour les informations, fermez cette fenêtre et scrollez vers le bas.",
    titles: {
      orders: "Commandes",
      turnover: "Turnover",
    },
  },
  drawercontent: {
    logout: "Déconnexion",
  },
  search_modal: {
    default_button_label: "OK",
    search_button_label: "Filtrer",
    clear_filter_button_label: "Réinitialiser",
    state_item: "Items actifs ou inactifs",
    state_order: "État de la commande",
    dish_categories: "Le type de plat",
    start_date: "Date de début",
    end_date: "Date de fin",
    alert: {
      date: {
        title: "Erreur",
        message:
          "La date de fin ne peut pas être antérieure à la date de début.",
      },
    },
  },
  search_bar: {
    placeholder: "Écrivez pour lancer la recherche",
    search_bar_dishes:
      "Utilisez la barre de recherche ci-dessus pour consulter vos plats.",
  },
  max_length: {
    dish_form: {
      dish_country: 50,
      dish_name: 50,
      dish_price: 5,
      dish_description: 200,
    },

    order_form: { max_order_number: 2 },

    form: {
      email: 100,
      siret: 14,
      firstname: 50,
      lastname: 50,
      phone: 10,
      street_number: 20,
      street_name: 100,
      address_complement: 100,
      postal_code: 5,
      town: 100,
    },
  },
};

export default all_constants;
