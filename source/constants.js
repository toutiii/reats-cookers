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
            remove_dish: 'SUPPRIMER CE PLAT',
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
            siret: 'SIRET',
            order_days: 'Prise commande',
            delivery_days: 'Jours de livraison',
            max_order_number: 'Nombre max de commandes',
            email: 'Email',
            street_number: 'Numéro de rue',
            street_name: 'Nom de la rue',
            address_complement: "Complément",
            password: 'Mot de passe',
            select_days_of_week: 'Sélectionnez les jours de la semaine'
        },
        form: {
            dishes: {
                name: 'Nom du plat',
                price: 'Prix',
                image: 'Photo du plat',
                category: 'Catégorie',
                description: 'Description',
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
                firstname: 'Prénom',
                lastname: 'Nom',
                phone: 'Numéro de téléphone',
                street_number: 'Numéro',
                street_name: 'Rue',
                address_complement: "Complément d'adresse",
                postal_code: 'Code postal',
                town: 'Ville',
                order_days: 'Vous acceptez les commandes le',
                delivery_days: 'Vous expédiez les commandes le',
                max_order_number: 'Votre nombre max de plats',
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
    },
    tag:{
        dishes: {
            starter: 'starter',
            dish: 'dish',
            dessert: 'dessert',
            drink: 'drink'
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
        dish_category: 'Sélectionner la catégorie de votre plat',
        menu: 'Sélectionnez un item.'
    },
    remaining_char: 'Caractères restants: ',
    permissions: {
        camera: 'Pour prendre une photo, veuillez autoriser la caméra.',
        gallery: "Pour charger une photo, veuillez accepter l'autorisation.",
        error: 'Erreur de permission'
    },
    currency_symbol: '€',
}

export default all_constants
