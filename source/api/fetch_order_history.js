export default function fetch_order_history(){

    let result = {
        status: 200,
        ok: true,
        json:{
            "data":[
                {
                    "id" :"1",
                    "order_number": "123366",
                    "order_status": "Livrée",
                    "order_owner": "Toutii",
                    "order_amount": "100",
                    "order_number_of_items": "10",
                    "order_date": "9 Mars 2021",
                    "order_cancel_date": "11 Mars 2021",
                    "order_delivery_date": "11 Mars 2021",
                    "order_tag": "archived",
                    "order_number_color": "darkgrey",
                    "dishes":[
                        {
                            "id": "1",
                            "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                            "dish_name": "Poulet Yassa",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "5",
                            "dish_order_date":"9 Mars 2021",
                            "dish_order_status": "Livré"
                        },
                        {
                            "id": "2",
                            "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                            "dish_name": "Poulet Yassa",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "5",
                            "dish_order_date": "9 Mars 2021",
                            "dish_order_status": "Livré"
                        }
                    ]
                },
                {
                    "id" :"2",
                    "order_number": "123367",
                    "order_status": "Livrée",
                    "order_owner": "Toutii",
                    "order_amount": "100",
                    "order_number_of_items": "10",
                    "order_date": "9 Mars 2021",
                    "order_cancel_date": "11 Mars 2021",
                    "order_delivery_date": "13 Mars 2021",
                    "order_tag": "archived",
                    "order_number_color": "darkgrey",
                    "dishes":[
                        {
                            "id": "1",
                            "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                            "dish_name": "Poulet Yassa",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "5",
                            "dish_order_date":"9 Mars 2021",
                            "dish_order_status": "Livré"
                        },
                        {
                            "id": "2",
                            "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                            "dish_name": "Poulet Yassa",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "5",
                            "dish_order_date": "9 Mars 2021",
                            "dish_order_status": "Livré"
                        }
                    ]
                },
                {
                    "id" :"3",
                    "order_number": "123368",
                    "order_status": "Livrée",
                    "order_owner": "Toutii",
                    "order_amount": "70",
                    "order_number_of_items": "7",
                    "order_date": "9 Mars 2021",
                    "order_cancel_date": "11 Mars 2021",
                    "order_delivery_date": "12 Mars 2021",
                    "order_tag": "archived",
                    "order_number_color": "darkgrey",
                    "order_is_menu": true,
                    "dishes":[
                        {
                            "id": "1",
                            "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                            "dish_name": "Poulet Yassa",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "5",
                            "dish_order_date":"9 Mars 2021",
                            "dish_order_status": "Livré"
                        },
                        {
                            "id": "2",
                            "dish_photo": "http://www.fashioncooking.fr/wp-content/uploads/2010/12/IMGP1105bis1.jpg",
                            "dish_name": "Tchep",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "2",
                            "dish_order_date": "9 Mars 2021",
                            "dish_order_status": "Livré"
                        }
                    ]
                },
                {
                    "id" :"4",
                    "order_number": "123368",
                    "order_status": "Livrée",
                    "order_owner": "Toutii",
                    "order_amount": "70",
                    "order_number_of_items": "7",
                    "order_date": "9 Mars 2021",
                    "order_cancel_date": "11 Mars 2021",
                    "order_delivery_date": "12 Mars 2021",
                    "order_tag": "archived",
                    "order_number_color": "darkgrey",
                    "order_is_menu": true,
                    "dishes":[
                        {
                            "id": "1",
                            "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                            "dish_name": "Poulet Yassa",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "5",
                            "dish_order_date":"9 Mars 2021",
                            "dish_order_status": "Livré"
                        },
                        {
                            "id": "2",
                            "dish_photo": "http://www.fashioncooking.fr/wp-content/uploads/2010/12/IMGP1105bis1.jpg",
                            "dish_name": "Tchep",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "2",
                            "dish_order_date": "9 Mars 2021",
                            "dish_order_status": "Livré"
                        }
                    ]
                },
                {
                    "id" :"5",
                    "order_number": "123368",
                    "order_status": "Livrée",
                    "order_owner": "Toutii",
                    "order_amount": "70",
                    "order_number_of_items": "7",
                    "order_date": "9 Mars 2021",
                    "order_cancel_date": "11 Mars 2021",
                    "order_delivery_date": "12 Mars 2021",
                    "order_tag": "archived",
                    "order_number_color": "darkgrey",
                    "order_is_menu": true,
                    "dishes":[
                        {
                            "id": "1",
                            "dish_photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                            "dish_name": "Poulet Yassa",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "5",
                            "dish_order_date":"9 Mars 2021",
                            "dish_order_status": "Livré"
                        },
                        {
                            "id": "2",
                            "dish_photo": "http://www.fashioncooking.fr/wp-content/uploads/2010/12/IMGP1105bis1.jpg",
                            "dish_name": "Tchep",
                            "dish_rating": "4.8/5",
                            "dish_unit_price": "10",
                            "dish_quantity": "2",
                            "dish_order_date": "9 Mars 2021",
                            "dish_order_status": "Livré"
                        }
                    ]
                }
            ]
        }
    }
    return result
}