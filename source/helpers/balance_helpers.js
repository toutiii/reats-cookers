export function getBalanceData () {
    const balance_list_data = {
        1:{
            id :'1',
            order_number: '123365',
            order_amount: '50€',
        },
        2:{
            id :'2',
            order_number: '123365',
            order_amount: '50€',
        },
        3:{
            id :'3',
            order_number: '123365',
            order_amount: '50€',
        },
        4:{
            id :'4',
            order_number: '123365',
            order_amount: '50€',
        },
        5:{
            id :'5',
            order_number: '123365',
            order_amount: '50€',
        },
        6:{
            id :'6',
            order_number: '123365',
            order_amount: '50€',
        },
        7:{
            id :'7',
            order_number: '123365',
            order_amount: '50€',
        },
        8:{
            id :'8',
            order_number: '123365',
            order_amount: '50€',
        },
    }
    let data = []
    const indexes = Object.keys(balance_list_data)
    for (let i = 1; i <= indexes.length; i++) {
        const itemObject = balance_list_data[i]
        data.push(itemObject)
    }
    return data
}