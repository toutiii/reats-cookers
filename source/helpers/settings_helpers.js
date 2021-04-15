export function getUserSettings() {
    const userSettingsObject = {
        credential_infos_section:{
            title: 'credential_infos',
            data: {
                email: 'toulevi@yahoo.fr',
            },
        },
        personal_infos_section:{
            title: 'personal_infos',
            data: {
                siret: 'FJGUT2-FRF-55',
                firstname: 'Irène',
                lastname: 'JANTEN',
                phone: '0649510110',
            },
        },
        address_section:{
            title: 'address',
            data: {
                street_number: '1',
                street_name: 'rue René Cassin',
                postal_code: '91100',
                town: "Corbeil-Essonnes",
            },
        },
        order_infos_section:{
            title: 'order_infos',
            data: {
                order_days: 'Lundi, Mercredi, Vendredi',
                delivery_days: 'Mardi, Jeudi, Samedi',
                max_order_number: 30,
            },
        },
    }
    return userSettingsObject
}