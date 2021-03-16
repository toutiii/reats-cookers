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
        errors: {
            title: 'Error',
            empty_email: 'Pleaser enter your email.',
            wrong_email_format: 'Please enter a valid email.',
            empty_password: 'Please enter your password.',
            forgot_password: 'Forgot password ?'
        },
        success: {
            title: 'Success',
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
            offline_alert: 'You are offline so users will not be able to send you orders.'
        },
        order: {
            accept: 'ACCEPTER LA COMMANDE',
            reject: 'REJETER LA COMMANDE',
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
            canceled: 'canceled',
            history: 'history',
        },
        balance: {
            pending: 'pending',
            history: 'history',
        }
    },
    balance:{
        no_balance_found: 'Aucun item trouvé.'
    }
}

export default all_constants
