import { Dimensions } from "react-native";


export const all_constants = {
    stars_images: {
        'black': require('./images/black-star.png'),
        'green': require('./images/green-star.png'),
        'yellow': require('./images/yellow-star.png')
    },
    screen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    email: {
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    colors: {
        inputBorderColor: '#ffd700',
        login_background_color: ['red', 'yellow', 'green']
    },
    messages: {
        login: 'LOG IN',
        logout: 'LOG OUT',
        send: 'SEND',
        submit: 'VALIDER',
        cancel: 'ANNULER',
        take_picture: 'Prendre une photo',
        upload_picture: 'Ouvrir la galerie',
        errors: {
            title: 'Erreur',
            empty_email: 'Pleaser enter your email.',
            wrong_email_format: 'Please enter a valid email.',
            empty_password: 'Please enter your password.',
            forgot_password: 'Forgot password ?'
        },
        success: {
            title: 'Succès',
            email_sent: 'An email has well been sent to '
        },
        warning: {
            title: 'Warning',
        },
    },
    label: {
        home: {
            offline: 'Go online',
            online: 'Go offline',
            status: {
                online: 'Online',
                offline: 'Offline',
            },
            online_alert: 'You are online now and you can receive orders.',
            offline_alert: 'You are offline so users will not be able to send you orders.',
            current_week_orders: 'CURRENT WEEK ORDERS',
            paid: 'PAID',
            canceled: 'CANCELLED',
            total: 'TOTAL',
            balance: 'BALANCE',
            pending: 'PENDING',
        },
        order: {
            accept: 'ACCEPTER LA COMMANDE',
            reject: 'REJETER LA COMMANDE',
        },
        dishes: {
            add_dish: 'AJOUTER UN PLAT',
            remove_dish: 'SUPPRIMER',
            disable_dish: 'DÉSACTIVER',
            add_menu: 'AJOUTER UN MENU',
            remove_menu: 'SUPPRIMER CE MENU',
        },
        settings: {
            section_title: {
                credential_infos: 'Mes informations de connexion',
                personal_infos: 'Mes informations personnelles',
                address: 'Mon adresse',
                order_infos: 'Mes informations de commande',
            },
            my_account: 'Mes paramètres',
            firstname: 'Prénom',
            lastname: 'Nom',
            phone: 'Téléphone',
            address: 'Adresse',
            postal_code: 'Code postal',
            town: 'Ville',
            change_password: 'MODIFIER MON MOT DE PASSE',
            change_settings: 'MODIFIER',
            siren: 'SIREN',
            siret: 'SIRET',
            order_days: 'Prise commande',
            max_order_number: 'Nombre max de commandes',
            email: 'Email',
            street_number: 'Numéro de rue',
            street_name: 'Nom de la rue',
            address_complement: "Complément",
            password: 'Mot de passe',
            select_days_of_week: 'Sélectionnez les jours de la semaine',
            noon_delivery_hours: 'Créneau du midi',
            noon_delivery_days: 'Livraison à midi le',
            evening_delivery_hours: 'Créneau du soir',
            evening_delivery_days: 'Livraison le soir le'
        },
        form: {
            dishes: {
                name: 'Nom du plat',
                price: 'Prix',
                image: 'Photo du plat',
                category: 'Catégorie',
                description: 'Description',
                country: 'Origine du plat'
                },
            menu: {
                name: 'Nom du menu',
                starter: 'Entrée',
                main_dish: 'Plat',
                dessert: 'Dessert',
                drink: 'Boisson',
                price: 'Prix',
            },
            settings: {
                email: 'Email',
                current_password: 'Mot de passe actuel',
                new_password: 'Nouveau mot de passe',
                new_password_confirmation: 'Confirmez le nouveau mot de passe',
                siret: 'Numéro SIRET',
                siren: 'Numéro SIREN',
                firstname: 'Prénom',
                lastname: 'Nom',
                phone: 'Numéro de téléphone',
                street_number: 'Numéro',
                street_name: 'Rue',
                address_complement: "Complément d'adresse",
                postal_code: 'Code postal',
                town: 'Ville',
                order_days: 'Vous acceptez les commandes le',
                max_order_number: 'Votre nombre max de plats',
                noon_delivery_hours: 'Votre créneau du midi',
                noon_delivery_days: 'Les plats seront livrés à midi le',
                evening_delivery_hours: 'Votre créneau du soir',
                evening_delivery_days: 'Les plats seront livrés le soir le'
            }
        },
    },
    uri: {
        rating_star: 'https://starpng.com/public/uploads/preview/yellow-star-transparent-background-png-101577029288c5hv8odvjm.png',
    },
    dishes: {
        no_dishes_found: 'Aucun item trouvé.'
    },
    order:{
        infos: {
            number: 'Commande N°',
            status: 'Statut:',
            owner: 'Passée par',
            amount: 'Cette commande vous rapporte',
            number_of_items: 'Nombre de plats:',
            ordered_label: 'le',
            canceled_label: 'Commande annulée le',
            delivered_label: 'Commande livrée le',
            unit_price: 'Prix unitaire:',
            total: 'Total:'
        },
        status:{
            canceled: 'Annulée',
            delivered: 'Livrée',
        },
        no_order_found: 'No orders found.',
    },
    modal:{
        dish_modal :{
            show: 'AFFICHER LES PLATS',
            hide: 'FERMER',
        },
        form: {
            settings: {
                order_days: (
                    "Vous choisissez ici les jours où les clients peuvent vous passer des commandes. \n \n" +
                    "Ex: Mardi,Mercredi \n \n" +
                    "Cela signifie que vous acceptez de recevoir uniquement les commandes les mardis et mercredis. \n \n " +
                    "En dehors de ces jours, vous ne serez pas visible des clients et vous ne recevrez donc aucune commande."
                ),
                max_order_number: (
                    "Vous estimez ici le nombre maximal de plats que vous pensez pouvoir préparer sur une période. \n \n" +
                    "Ex: 18 \n \n" +
                    "Cela signifie que vous ne pourrez jamais avoir plus de 18 plats à préparer par vague de commandes. \n \n " +
                    "Veillez à ne pas en mettre trop pour pouvoir être dans les temps pour la collecte des commandes par nos livreurs. \n \n" +
                    "Attention, il ne s'agit pas forcément ici du nombre de commandes. En effet une commande peut comporter plusieurs plats."
                ),
                noon_delivery_hours: (
                    "Vous choisissez ici le créneau du midi pour la collecte de vos plats par nos livreurs. \n \n" +
                    "Ex: 11-13 \n \n" +
                    "Cela signifie qu'entre 11h au plus tôt et 13h au plus tard, nos livreurs peuvent venir récupérer les commandes à votre adresse. \n \n " +
                    "Attention, si vous paramétrez des horaires décalées, par exemple 14-16, les clients recevront vos commandes entre 14h30 et 16h30 !"
                ),
                noon_delivery_days: (
                    "Vous choisissez les jours où nos livreurs peuvent passer récupérer les commandes en journée. \n \n" +
                    "Ex: Vendredi,Samedi \n \n" +
                    "Cela signifie que les vendredis et samedis, les livreurs pourront passer collecter les commandes pour les livraisons du midi. \n \n " +
                    "Notez que 'midi' dans la phrase ci-dessus fait référence aux horaires de collecte définies dans le champ 'Votre créneau du midi' "
                ),
                evening_delivery_hours: (
                    "Vous choisissez ici le créneau du soir pour la collecte de vos plats par nos livreurs. \n \n" +
                    "Ex: 18-20 \n \n" +
                    "Cela signifie qu'entre 18h au plus tôt et 20h au plus tard, nos livreurs peuvent venir récupérer les commandes à votre adresse. \n \n " +
                    "Attention, si vous paramétrez des horaires décalées, par exemple 20-22, les clients recevront vos commandes entre 20h30 et 22h30 !"
                ),
                evening_delivery_days: (
                    "Vous choisissez les jours où nos livreurs peuvent passer récupérer les commandes en soirée. \n \n" +
                    "Ex: Jeudi,Vendredi \n \n" +
                    "Cela signifie que les jeudis et vendredis, les livreurs pourront passer collecter les commandes pour les livraisons en soirée. \n \n " +
                    "Notez que 'soirée' dans la phrase ci-dessus fait référence aux horaires de collecte définies dans le champ 'Votre créneau du soir' "
                ),
                email: "Pour modifier uniquement votre email, saisissez votre nouvel email et votre mot de passe actuel.",
                password: "Pour modifier votre mot de passe, remplissez tous les champs de ce formulaire."
            }
        }
    },
    tag:{
        dishes: {
            starter: 'starter',
            dish: 'main_dish',
            dessert: 'dessert',
            drink: 'drink',
            menu: 'menu',
        },
        orders: {
            all: 'all',
            paid: 'paid',
            canceled: 'cancelled',
            history: 'history',
            delivered: 'delivered',
            archived: 'archived'
        },
        balance: {
            pending: 'pending',
            history: 'history',
        }
    },
    balance:{
        no_balance_found: 'Aucun item trouvé.'
    },
    menu: {
        no_menu_found: "Vous n'avez créé aucun menu.",
        label: {
            menu_name: 'MENU',
            starter: 'ENTRÉE',
            dish: 'PLAT',
            dessert: 'DESSERT',
            drink: 'BOISSON',
        },
    },
    validators:{
        max_text_length: 30,
        max_description_length: 200,
    },
    field_type: {
        textinput: 'textinput',
        image: 'image',
        textarea: 'textarea',
        select: 'select',
        select_picker: 'select_picker',
    },
    placeholders: {
        form: {
            dishes: {
                dish_category: 'Sélectionnez la catégorie de votre plat',
                dish_name: 'Le nom du plat',
                dish_price: 'Fixez le prix de votre plat',
                dish_description: 'Une courte description de votre plat',
                dish_country: 'De quel pays vient votre plat ?',
            },
            menu: {
                menu_name: 'Donnez un nom à votre menu',
                menu_starter: "Sélectionnez l'entrée",
                menu_main_dish: 'Sélectionnez le plat de résistance',
                menu_dessert: 'Sélectionnez le dessert',
                menu_drink: 'Sélectionnez la boisson',
                menu_price: 'Fixez le prix de votre menu',
            },
            settings: {
                street_number: 'Numéro de rue',
                street_name: 'Ex: rue René Cassin',
                address_complement: "Complément d'adresse",
                postal_code: 'Votre code postal',
                town: 'Votre ville',
                email: 'Votre email',
                user_settings_current_password: 'Votre mot de passe actuel',
                user_settings_new_password: 'Votre nouveau mot de passe',
                user_settings_new_password_confirmation: 'Confirmez votre nouveau mot de passe',
                order_days: 'Sélectionnez les jours où vous acceptez les commandes',
                max_order_number: 'Le nombre maximum de plats que vous pouvez préparer à la fois',
                noon_delivery_hours: "L'amplitude horaire des livraisons à midi \n Ex: 11-13",
                noon_delivery_days: "Sélectionnez les jours d'expédition le midi",
                evening_delivery_hours: "L'amplitude horaire des livraisons le soir \n Ex: 18-21",
                evening_delivery_days: "Sélectionnez les jours d'expédition en soirée",
                siren: 'Votre numéro SIREN',
                siret: 'Un numéro SIRET',
                firstname: 'Votre prénom',
                lastname: 'Votre nom de famille',
                phone: 'Votre numéro de téléphone',
            }
        }

    },
    remaining_char: 'Caractères restants: ',
    permissions: {
        camera: 'Pour prendre une photo, veuillez autoriser la caméra.',
        gallery: "Pour charger une photo, veuillez accepter l'autorisation.",
        error: 'Erreur de permission'
    },
    currency_symbol: '€',
    tab:{
        state_tab:{
            title:{
                enabled_items: 'ACTIFS',
                disabled_items: 'INACTIFS'
            }
        },
        dish_tab:{
            title:{
                starter: 'ENTRÉES',
                main_dish: 'PLATS',
                dessert: 'DÉSSERTS',
                drinks: 'BOISSONS',
                menu: 'MENUS',
                add_item: 'AJOUTER',
            }
        }
    }
}

export default all_constants
