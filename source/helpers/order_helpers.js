export function getOrders() {
    const order_list_data = {
        "data":[
            {
                "id" :"1",
                "order_number": "123366",
                "order_status": "En attente de prise en charge",
                "order_owner": "Toutii",
                "order_amount": "100",
                "order_number_of_items": "10",
                "order_date": "9 Mars 2021",
                "order_cancel_date": "11 Mars 2021",
                "order_delivery_date": "13 Mars 2021",
                "order_tag": "paid",
                "order_number_color": "green",
                "dishes":[
                    {
                        "id": "1",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date":"9 Mars 2021",
                        "dish_order_status": "En préparation"
                    },
                    {
                        "id": "2",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date": "9 Mars 2021",
                        "dish_order_status": "En préparation"
                    }
                ]
            },
            {
                "id" :"2",
                "order_number": "123367",
                "order_status": "Annulée",
                "order_owner": "Toutii",
                "order_amount": "100",
                "order_number_of_items": "10",
                "order_date": "9 Mars 2021",
                "order_cancel_date": "11 Mars 2021",
                "order_delivery_date": "13 Mars 2021",
                "order_tag": "cancelled",
                "order_number_color": "red",
                "dishes":[
                    {
                        "id": "1",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date":"9 Mars 2021",
                        "dish_order_status": "En préparation"
                    },
                    {
                        "id": "2",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date": "9 Mars 2021",
                        "dish_order_status": "En préparation"
                    }
                ]
            },
            {
                "id" :"3",
                "order_number": "123368",
                "order_status": "En attente de prise en charge",
                "order_owner": "Toutii",
                "order_amount": "70",
                "order_number_of_items": "7",
                "order_date": "9 Mars 2021",
                "order_cancel_date": "11 Mars 2021",
                "order_delivery_date": "13 Mars 2021",
                "order_tag": "paid",
                "order_number_color": "green",
                "dishes":[
                    {
                        "id": "1",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date":"9 Mars 2021",
                        "dish_order_status": "En préparation"
                    },
                    {
                        "id": "2",
                        "dish_photo": "http://www.fashioncooking.fr/wp-content/uploads/2010/12/IMGP1105bis1.jpg",
                        "dish_name": "Tchep",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "2",
                        "dish_order_date": "9 Mars 2021",
                        "dish_order_status": "En préparation"
                    }
                ]
            },
            {
                "id" :"4",
                "order_number": "123369",
                "order_status": "Annulée",
                "order_owner": "Toutii",
                "order_amount": "100",
                "order_number_of_items": "10",
                "order_date": "9 Mars 2021",
                "order_cancel_date": "11 Mars 2021",
                "order_delivery_date": "13 Mars 2021",
                "order_tag": "cancelled",
                "order_number_color": "red",
                "dishes":[
                    {
                        "id": "1",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date":"9 Mars 2021",
                        "dish_order_status": "En préparation"
                    },
                    {
                        "id": "2",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date": "9 Mars 2021",
                        "dish_order_status": "En préparation"
                    }
                ]
            },
            {
                "id" :"5",
                "order_number": "123370",
                "order_status": "En attente de prise en charge",
                "order_owner": "Toutii",
                "order_amount": "100",
                "order_number_of_items": "10",
                "order_date": "9 Mars 2021",
                "order_cancel_date": "11 Mars 2021",
                "order_delivery_date": "13 Mars 2021",
                "order_tag": "paid",
                "order_number_color": "green",
                "dishes":[
                    {
                        "id": "1",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date":"9 Mars 2021",
                        "dish_order_status": "En préparation"
                    },
                    {
                        "id": "2",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date": "9 Mars 2021",
                        "dish_order_status": "En préparation"
                    }
                ]
            },
            {
                "id" :"6",
                "order_number": "123365",
                "order_status": "Annulée",
                "order_owner": "Toutii",
                "order_amount": "100",
                "order_number_of_items": "10",
                "order_date": "9 Mars 2021",
                "order_cancel_date": "11 Mars 2021",
                "order_delivery_date": "13 Mars 2021",
                "order_tag": "cancelled",
                "order_number_color": "red",
                "dishes":[
                    {
                        "id": "1",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date":"9 Mars 2021",
                        "dish_order_status": "En préparation"
                    },
                    {
                        "id": "2",
                        "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                        "dish_name": "Poulet Yassa",
                        "dish_rating": "4.8/5",
                        "dish_unit_price": "10",
                        "dish_quantity": "5",
                        "dish_order_date": "9 Mars 2021",
                        "dish_order_status": "En préparation"
                    }
                ]
            }
        ]
    }
    return order_list_data
}