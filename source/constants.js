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
  password: {
    min_length: 6,
  },
  messages: {
    login: "CONNEXION",
    logout: "DÉCONNEXION",
    settings: "PARAMÈTRES",
    send: "ENVOYER",
    submit: "VALIDER",
    cancel: "ANNULER",
    forgotten_password: "MOT DE PASSE OUBLIÉ ?",
    signup: "CRÉER UN COMPTE",
    take_picture: "Prendre une photo",
    upload_picture: "Ouvrir la galerie",
    errors: {
      title: "Erreur",
      empty_email: "Veuillez renseigner votre mail",
      wrong_email_format: "Veuillez entrer un email valide",
      empty_password: "Veuillez renseigner votre mot de passe",
      forgot_password: "Mot de passe oublié ?",
    },
    success: {
      title: "Succès",
      email_sent: "Un email a été envoyé à ",
      reset_password:
        "Si vous êtes inscrit, vous recevrez un email contenant un nouveau mot de passe. Pensez à regarder vos spams.",
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
    offer: {
      add_offer: "CRÉER UNE PROMOTION",
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
      change_password: "MODIFIER MON MOT DE PASSE",
      change_settings: "MODIFIER",
      siret: "SIRET",
      order_days: "Prise commande",
      max_order_number: "Nombre max de commandes",
      email: "Email",
      street_number: "Numéro de rue",
      street_name: "Nom de la rue",
      address_complement: "Complément",
      password: "Mot de passe",
      select_days_of_week: "Sélectionnez les jours de la semaine",
      noon_delivery_hours: "Créneau en journée",
      noon_delivery_days: "Livraison en journée le",
      evening_delivery_hours: "Créneau du soir",
      evening_delivery_days: "Livraison le soir le",
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
      special_offer: {
        name: "Nom de l'item",
        quantity: "Quantité",
        rate: "Taux de réduction",
        price: "Prix promotionnel",
      },
      settings: {
        email: "Email",
        current_password: "Mot de passe actuel",
        new_password: "Nouveau mot de passe",
        new_password_confirmation: "Confirmation nouveau mot de passe",
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
        noon_delivery_hours: "Votre créneau en journée",
        noon_delivery_days: "Les plats sont livrés en journée le",
        evening_delivery_hours: "Votre créneau en soirée",
        evening_delivery_days: "Les plats sont livrés en soirée le",
        image: "Photo de profil",
        signup_new_password: "Mot de passe",
        signup_new_password_confirmation: "Confirmation mot de passe",
      },
      login: {
        email: "Email",
        password: "Mot de passe",
      },
      forgotten_password: {
        title: "Mot de passe oublié",
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
        noon_delivery_hours:
          "Vous choisissez ici le créneau du midi pour la collecte de vos plats par nos livreurs. \n \n" +
          "Ex: 11-13 \n \n" +
          "Cela signifie qu'entre 11h au plus tôt et 13h au plus tard, nos livreurs peuvent venir récupérer les commandes à votre adresse. \n \n " +
          "Attention, si vous paramétrez des horaires décalées, par exemple 14-16, les clients recevront vos commandes entre 14h30 et 16h30 !",
        noon_delivery_days:
          "Vous choisissez les jours où nos livreurs peuvent passer récupérer les commandes en journée. \n \n" +
          "Ex: Vendredi,Samedi \n \n" +
          "Cela signifie que les vendredis et samedis, les livreurs pourront passer collecter les commandes pour les livraisons du midi. \n \n " +
          "Notez que 'midi' dans la phrase ci-dessus fait référence aux horaires de collecte définies dans le champ 'Votre créneau du midi' ",
        evening_delivery_hours:
          "Vous choisissez ici le créneau du soir pour la collecte de vos plats par nos livreurs. \n \n" +
          "Ex: 18-20 \n \n" +
          "Cela signifie qu'entre 18h au plus tôt et 20h au plus tard, nos livreurs peuvent venir récupérer les commandes à votre adresse. \n \n " +
          "Attention, si vous paramétrez des horaires décalées, par exemple 20-22, les clients recevront vos commandes entre 20h30 et 22h30 !",
        evening_delivery_days:
          "Vous choisissez les jours où nos livreurs peuvent passer récupérer les commandes en soirée. \n \n" +
          "Ex: Jeudi,Vendredi \n \n" +
          "Cela signifie que les jeudis et vendredis, les livreurs pourront passer collecter les commandes pour les livraisons en soirée. \n \n " +
          "Notez que 'soirée' dans la phrase ci-dessus fait référence aux horaires de collecte définies dans le champ 'Votre créneau du soir' ",
        email:
          "Pour modifier uniquement votre email, saisissez votre nouvel email et votre mot de passe actuel.",
        password:
          "Pour modifier votre mot de passe, remplissez tous les champs de ce formulaire. \n \n" +
          "Le mot de passe doit faire entre 6 et 20 caractères. Il doit contenir au moins une majuscule, un chiffre et un des caractères spéciaux suivants: !, #, *",
        signup_password:
          "Entre 6 et 20 caractères. Doit contenir au moins une majuscule, un chiffre et un des caractères spéciaux suivants: !, #, *",
      },
    },
  },

  balance: {
    no_balance_found: "Aucun item trouvé.",
  },

  offer: {
    no_offer_found: "Aucune promotion trouvée.",
    offer_message_start: "Vous proposez",
    offer_message_end: "au prix de",
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
      too_short_password_error: "Le mot de passe doit faire au moins ",
      char: " caractères.",
      password_missing_special_chars:
        "Le mot de passe doit contenir un des caractères suivants: ",
      password_missing_uppercase:
        "Le mot de passe doit contenir au moins une majuscule.",
      password_missing_digit:
        "Le mot de passe doit contenir au moins un chiffre.",
      non_equal_password_error: "Les mots de passe ne correspondent pas.",
      siren_format_error: " doit contenir exactement 9 chiffres sans espace.",
      siret_format_error: " doit contenir exactement 14 chiffres sans espace.",
      phone_format_error: " doit contenir exactement 10 chiffres sans espace.",
      noon_hours_format_error: " Exemple: 11-13",
      evening_hours_format_error: " Exemple: 18-20",
      incorrect: " est incorrect. ",
      identical_start_hours_end_hours_error:
        "Les heures de début et de fin ne peuvent être identiques.",
      start_hour_greater_than_end_hour_error:
        "L'heure de début ne peut pas être supérieure à l'heure de fin.",
      delivery_days: "Vous avez spécifié les jours de livraison ",
      missing_hours_for_delivery_days:
        " sans préciser de créneau horaire pour ces jours.",
      hours_range: "Vous avez précisé le créneau ",
      missing_days_for_delivery_hours:
        " sans préciser les jours où ce créneau s'applique.",
      missing_delivery_hours_error:
        "Vous devez choisir au moins un créneau horaire en journée ou en soirée.",
    },
    includes: {
      noon: "midi",
      evening: "soir",
      siret: "siret",
      phone: "téléphone",
      day: "journée",
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
      special_offer: {
        name: "Sélectionnez l'item sur lequel vous voulez créer une promotion",
        quantity: "Entrez le nombre d'item pour la promotion",
        price:
          "Renseignez le prix total TTC de la promotion affiché aux clients",
        rate: "Ce champ est rempli automatiquement.",
      },
      settings: {
        street_number: "Numéro de rue",
        street_name: "Ex: rue René Cassin",
        address_complement: "Complément d'adresse",
        postal_code: "Votre code postal",
        town: "Votre ville",
        email: "Votre email",
        user_settings_current_password: "Votre mot de passe actuel",
        password: "Votre nouveau mot de passe",
        password_confirmation: "Confirmez votre nouveau mot de passe",
        order_days: "Sélectionnez les jours où vous acceptez les commandes",
        max_order_number:
          "Le nombre maximum de plats que vous pouvez préparer à la fois",
        noon_delivery_hours:
          "L'amplitude horaire des livraisons à midi \n Ex: 11-13",
        noon_delivery_days: "Sélectionnez les jours d'expédition le midi",
        evening_delivery_hours:
          "L'amplitude horaire des livraisons le soir \n Ex: 18-21",
        evening_delivery_days: "Sélectionnez les jours d'expédition en soirée",
        siret: "Un numéro SIRET",
        firstname: "Votre prénom",
        lastname: "Votre nom de famille",
        phone: "Ex: 0601020304",
        signup_password: "Votre mot de passe",
        signup_password_confirmation: "Confirmez votre mot de passe",
      },
      login: {
        email: "Votre email",
        password: "Votre mot de passe",
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
      OfferFlatList: "Mes promos",
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
    search_bar_offer:
      "Utilisez la barre de recherche ci-dessus pour consulter vos promotions.",
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
    offer_form: {
      offer_quantity: 5,
      offer_price: 5,
      offer_rate: 5,
    },
    order_form: { max_order_number: 2 },

    form: {
      email: 100,
      password: 20,
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
