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