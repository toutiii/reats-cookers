/* eslint-disable max-len */

import { Dimensions } from "react-native";

export const all_constants = {
    go_back: "Retour",
    screen: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    colors: {
        inputBorderColor: "#ffd700",
        login_background_color: [
            "red",
            "yellow",
            "green"
        ],
    },

    messages: {
        clear: "EFFACER",
        login: "CONNEXION",
        logout: "DÉCONNEXION",
        settings: "PARAMÈTRES",
        send: "ENVOYER",
        send_again: "JE N'AI PAS REÇU DE CODE",
        submit: "VALIDER",
        cancel: "ANNULER",
        signup: "CRÉER UN COMPTE",
        take_picture: "Prendre une photo",
        upload_picture: "Ouvrir la galerie",
        decline: "REFUSER LA COMMANDE",
        cancel_order: "ANNULER LA COMMANDE",
        accept: "ACCEPTER LA COMMANDE",
        quit: "ANNULER",
        errors: {
            title: "Erreur",
        },
        otp: {
            title: {
                send_again_title: "Nouvelle demande",
            },
            message: {
                send_again_message:
                    "Un nouveau code vous sera envoyé par SMS dans quelques instants.",
                invalid_code: "Code invalide. Veuillez réessayer ou en demander un nouveau.",
            },
        },
        success: {
            title: "Succès",
            login_message: "Connexion réussie",
            signup_message: "Vous pouvez désormais vous connecter avec votre numéro de téléphone.",
            otp_message_signup:
                "Vous allez recevoir dans quelques instants un code par SMS que vous devrez renseigner dans le prochain écran.",
            otp_message_login:
                "Si vous avez déjà créé un compte, un code de connexion vous sera envoyé par SMS dans quelques instants.",
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
                message: "L'opération a échoué. Attendez quelques minutes avant de réessayer.",
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
            offline_alert: "You are offline so users will not be able to send you orders.",
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
            enable_dish: "ACTIVER",
        },
        drinks: {
            drink_bottle_capacity: "Contenance",
            drink_bottle_capacity_unit: "Unité",
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
            street_number: "Numéro de rue",
            street_name: "Nom de la rue",
            address_complement: "Complément",
            select_days_of_week: "Sélectionnez les jours de la semaine",
            delete_account: "SUPPRIMER MON COMPTE",
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
                siret: "Numéro SIRET",
                firstname: "Prénom",
                lastname: "Nom",
                phone: "Numéro de téléphone",
                phone_confirmation: "Confirmation téléphone",
                street_number: "Numéro de rue",
                street_name: "Nom de la rue",
                address_complement: "Complément d'adresse",
                postal_code: "Code postal",
                town: "Ville",
                order_days: "Jours de prise de commandes",
                max_order_number: "Nombre max de plats acceptés",
                image: "Photo de profil",
            },
        },
    },
    dishes: {
        no_dishes_found: "Aucun plat trouvé.",
        no_drinks_found: "Aucune boisson trouvée.",
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
            delivery_done_label: "Livraison effectuée le",
            picking_label: "Ramassage prévu le",
            dish_unit_price: "Prix unitaire:",
            total: "Total:",
            dish: "plats",
            delivery_postal_code: "Code postal",
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
            intro: "Vous pouvez visualiser ici des informations générales sur vos commandes en cours. \n",
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
                    "Il s'agit du nombre maximal de plats que vous aurez à préparer à la fois. \n \n" +
                    "Par exemple, si vous renseignez 10, la somme du nombre de plats sur toutes vos commandes n'excédera jamais 10.",
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
            invalid_max_dishes_number_format: " est invalide. Exemple: 18",
            invalid_bottle_capacity: " est invalid. Exemple: 33",
            phone_mismatch: "Les deux numéros de téléphone saisis doivent être identiques.",
        },

        settings: {
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
        autocomplete: "autocomplete",
        textinput: "textinput",
        image: "image",
        textarea: "textarea",
        select: "select",
        select_picker: "select_picker",
        date_picker: "date_picker",
    },
    placeholders: {
        form: {
            login: {
                phone: "Votre numéro de téléphone",
            },
            dishes: {
                dish_category: "Sélectionnez la catégorie de votre item",
                dish_name: "Le nom de votre item",
                dish_price: "Il s'agit ici du prix TTC affiché aux clients",
                dish_description: "Une courte description de votre item",
                dish_country: "Origine du plat",
            },
            drinks: {
                drink_bottle_capacity: "Ex: 33",
                drink_bottle_capacity_unit: "Entrez l'unité de contenance de votre item.",
            },
            settings: {
                street_number: "Numéro de rue",
                street_name: "Ex: rue René Cassin",
                address_complement: "Complément d'adresse",
                postal_code: "Votre code postal",
                town: "Votre ville",
                order_days: "Sélectionnez les jours où vous acceptez les commandes",
                max_order_number: "Le nombre maximum de plats que vous pouvez préparer à la fois",
                siret: "Un numéro SIRET",
                firstname: "Votre prénom",
                lastname: "Votre nom de famille",
                phone: "Ex: 0601020304",
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
            DrinkFlatList: "Mes boissons",
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
            delete_account: "SUPPRIMER",
            keep_account: "CONSERVER",
        },
        form: {
            title: "ATTENTION",
            message: "Quitter le formulaire et revenir en arrière ?",
            disable_item_message:
                "En désactivant un item, celui-ci ne sera pas supprimé mais ne sera plus visible des clients. \n" +
                "Notez que vous pourrez toujours le réactiver plus tard.",
            remove_item_message: "Supprimer définitivement cet item ?",
            enable_item_message:
                "En réactivant cet item, celui-ci sera à nouveau visible des clients.",
            delete_account_title: "ATTENTION SUPPRESSION DU COMPTE !",
            delete_account_message:
                "Souhaitez vous vraiment supprimer votre compte ? Attention toutes vos données seront perdues.",
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
            "Vous pouvez visualiser des statistiques sur vos commandes de la semaine en cours. \n",
        titles: {
            orders: "Commandes",
            turnover: "Turnover",
        },
        no_data:
            "Aucune donnée disponible pour le moment. \n\n Cette section sera mise à jour automatiquement.",
        mapping: {
            pending: "En attente de décision",
            processing: "En cours de préparation",
            completed: "Prête(s) pour livraison",
            delivered: "Livraison(s) effectuée(s)",
        },
        stats: {
            title: "Statistiques hebdomadaires",
        },
    },
    drawercontent: {
        logout: "Déconnexion",
        hello: "Bonjour ",
        drawer_item: {
            label: {
                history: "Historique commandes",
                create_dish: "Ajouter un plat",
                create_drink: "Ajouter une boisson",
                account: "Mon compte",
                localization: "Ma localisation",
            },
            orders_history: {
                title: "Mes anciennes commandes",
                no_results: "Aucune commande trouvée.",
                infos: {
                    number: "Commande N°",
                    status: "Statut:",
                    owner: "Passée par",
                    amount: "Total de la commande: ",
                    quantity: "Nombre d'item(s): ",
                    content: "Cette commande contient: ",
                    ordered_label: "le",
                    canceled_label: "Annulée le",
                    approved_label: "Commande acceptée le",
                    delivered_label: "Commande livrée le",
                    picking_label: "Ramassage prévu le",
                    price: "Prix à l'unité(€): ",
                    dish_total: "Total: ",
                    ordered: "Commandé le ",
                    item: "item(s)",
                },
                status: {
                    ordered: "Commandée",
                    canceled: "Annulée",
                    delivered: "Livrée",
                    pending: "En attente de prise en charge",
                    processed: "Acceptée",
                    cancelled_by_customer: "Annulée par le client ",
                    cancelled_by_cooker: "Annulée par le cuisinier ",
                    completed: "Prête pour livraison",
                },
                original_status: {
                    cancelled_by_customer: "cancelled_by_customer",
                    cancelled_by_cooker: "cancelled_by_cooker",
                    delivered: "delivered",
                    pending: "pending",
                    processed: "processing",
                    completed: "completed",
                },
            },
        },
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
                message: "La date de fin ne peut pas être antérieure à la date de début.",
            },
        },
    },
    search_bar: {
        placeholder: "Écrivez pour lancer la recherche",
        search_bar_dishes: "Utilisez la barre de recherche ci-dessus pour consulter vos plats.",
        search_bar_drinks: "Utilisez la barre de recherche ci-dessus pour consulter vos boissons.",
    },
    max_length: {
        dish_form: {
            dish_country: 50,
            dish_name: 50,
            dish_price: 5,
            dish_description: 200,
        },
        drink_form: {
            drink_bottle_capacity: 3,
        },

        order_form: { max_order_number: 2 },

        form: {
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
    pending_orders_view: {
        main_title: "Commandes",
        button_label: {
            cancel_order: "ANNULER LA COMMANDE",
            decline_order: "REFUSER LA COMMANDE",
            accept_order: "ACCEPTER LA COMMANDE",
        },
        title: {
            pending: "En attente",
            processing: "Acceptée(s)",
            completed: "Préparation terminée",
        },
        stack_navigator: {
            order_item_detail: {
                title: "Retour",
            },
        },
        accept: {
            title: "ACCEPTER LA COMMANDE ?",
            message:
                "Vous êtes sur le point d'accepter la commande. \n\n" +
                "Cette action enverra une confirmation au client.",
            success: {
                title: "COMMANDE ACCEPTÉE",
                message:
                    "La commande a bien été acceptée. \n\n" +
                    "Le client sera prévenu de l'acceptation de sa commande.",
            },
            failure: {
                title: "ÉCHEC",
                message: "Impossible d'accepter la commande, veuillez réessayer plus tard.",
            },
        },
        cancel: {
            title: "ANNULER LA COMMANDE ?",
            message:
                "Attention cette action est définitive.\n\n" +
                "Cette action baissera votre note générale et vous ne pourrez peut-être plus recevoir de nouvelles commandes.\n\n" +
                "Le client sera prévenu que vous avez annulé sa commande.",
            success: {
                title: "COMMANDE ANNULÉE",
                message:
                    "La commande a bien été annulée. \n\n" +
                    "Le client sera prévenu de l'annulation de sa commande.",
            },
            failure: {
                title: "ÉCHEC",
                message: "Impossible d'annuler la commande, veuiillez réessayer plus tard.",
            },
        },
        decline: {
            title: "REFUSER LA COMMANDE ?",
            message:
                "Attention cette action est définitive.\n\n" +
                "Cette action baissera votre note générale et vous ne pourrez peut-être plus recevoir de nouvelles commandes.\n\n" +
                "Le client sera prévenu que vous avez rejeté sa commande.",
            success: {
                title: "COMMANDE REFUSÉE",
                message:
                    "La commande a bien été refusée. \n\n" +
                    "Le client sera prévenu du refus de sa commande.",
            },
            failure: {
                title: "ÉCHEC",
                message: "Impossible de refuser la commande, veuillez réessayer plus tard.",
            },
        },
    },
};

export default all_constants;
