export function getCategories(itemType) {
    let categoriesObject = {};
    if (itemType === 'Dish') {
        categoriesObject = [
            { label: 'Entrée', value: 'starter'},
            { label: 'Plat principal', value: 'main_dish' },
            { label: 'Boisson', value: 'drink' },
            { label: 'Dessert', value: 'dessert' },
        ]
    }
    return categoriesObject

}

export function getDaysOfWeek() {
    const daysOfWeek = [
        {
            itemKey:1,
            itemDescription:'Lundi'
        },
        {
            itemKey:2,
            itemDescription:'Mardi'
        },
        {
            itemKey:3,
            itemDescription:'Mercredi'
        },
        {
            itemKey:4,
            itemDescription:'Jeudi'
        },
        {
            itemKey:5,
            itemDescription:'Vendredi'
        },
        {
            itemKey:6,
            itemDescription:'Samedi'
        },
        {
            itemKey:7,
            itemDescription:'Dimanche'
        }
    ];
    return daysOfWeek;
}


export function getData(dataFromBackend, tag, isEnabled) {
    let data = []
    const indexes = Object.keys(dataFromBackend)
    for (let i = 1; i <= indexes.length; i++) {
        const itemObject = dataFromBackend[i]
        if (
            itemObject['dish_category'] === tag
            &&
            itemObject['isEnabled'] === isEnabled
        ){
            data.push(itemObject)
        }
    }
    return data
}


export function getDataFromID(dataFromBackend, objectNumber) {
    const indexes = Object.keys(dataFromBackend)
    for (let i = 1; i <= indexes.length; i++) {
        const itemObject = dataFromBackend[i]
        if (itemObject['order_number'] === objectNumber){
            return itemObject
        }
    }
}