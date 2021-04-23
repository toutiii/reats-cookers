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


export function getData(
    dataFromBackend,
    tag = undefined,
    isEnabled = undefined,
    tagField = undefined,
    keyField = undefined,
    wantedFields=[]
) {
    let data = []
    const indexes = Object.keys(dataFromBackend['data'])

    if (tag !== undefined && tagField !== undefined && wantedFields.length === 0) {
        for (let i = 0; i < indexes.length; i++) {
            const itemObject = dataFromBackend['data'][i]
            itemObject['key'] = itemObject[keyField]
            if (isEnabled !== undefined) {
                if (itemObject[tagField] === tag && itemObject['isEnabled'] === isEnabled) {
                    data.push(itemObject)
                }
            }
            else{
                if (itemObject[tagField] === tag) {
                    data.push(itemObject)
                }
            }
        }
    }
    else if (tag === undefined && tagField === undefined && wantedFields.length > 0 && isEnabled === undefined) {
        for (let i = 0; i < indexes.length; i++) {
            const itemObject = dataFromBackend['data'][i]
            let tempObject = {}
            for (let j = 0; j < wantedFields.length; j++) {
                tempObject['key'] = itemObject[keyField]
                tempObject[wantedFields[j]] = itemObject[wantedFields[j]]
            }
            data.push(tempObject)
        }
    }
    return data
}


export function getDataFromUniqueField(dataFromBackend, objectNumber) {
    const indexes = Object.keys(dataFromBackend['data'])
    for (let i = 0; i < indexes.length; i++) {
        const itemObject = dataFromBackend['data'][i]
        if (itemObject['order_number'] === objectNumber){
            return itemObject
        }
    }
}