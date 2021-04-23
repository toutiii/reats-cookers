export function getBalanceData () {
    const balance_list_data = {
        "data": [
            {
                "id": "1",
                "order_number": "123365",
                "order_amount": "50€"
            },
            {
                "id": "2",
                "order_number": "123365",
                "order_amount": "50€"
            },
            {
                "id": "3",
                "order_number": "123365",
                "order_amount": "50€"
            },
            {
                "id": "4",
                "order_number": "123365",
                "order_amount": "50€"
            },
            {
                "id": "5",
                "order_number": "123365",
                "order_amount": "50€"
            },
            {
                "id": "6",
                "order_number": "123365",
                "order_amount": "50€"
            },
            {
                "id": "7",
                "order_number": "123365",
                "order_amount": "50€"
            },
            {
                "id": "8",
                "order_number": "123365",
                "order_amount": "50€"
            }
        ]
    }
    let data = []
    const indexes = Object.keys(balance_list_data)
    for (let i = 1; i <= indexes.length; i++) {
        const itemObject = balance_list_data[i]
        data.push(itemObject)
    }
    return data
}