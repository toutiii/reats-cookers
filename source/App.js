import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import OrdersTab from "./tab/OrdersTab";
import DishTab from "./tab/DishTab";
import BalanceTab from "./tab/BalanceTab";
import HomeStack from "./stack/HomeStack";
import OrderView from "./views/OrderView";
import DishFormView from "./forms/DishFormView";
import MenuFormView from "./forms/MenuFormView";
import SettingsCredentialsForm from "./forms/SettingsCredentialsForm";
import SettingsPersonalInformationForm from "./forms/SettingsPersonalInformationForm";
import SettingsAddressForm from "./forms/SettingsAddressForm";
import SettingsOrderInformationForm from "./forms/SettingsOrderInformationForm";
import MenuTab from "./tab/MenuTab";
import OfferTab from "./tab/OfferTab";
import OfferFormView from "./forms/OfferFormView";
import AddView from "./views/AddView";

const Tab = createBottomTabNavigator();

export default class App extends Component {
    render () {
        return (
            <AppearanceProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="Home"
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === 'Home') {
                                    iconName = 'home-outline'
                                }else if (route.name === 'Orders') {
                                    iconName = 'basket-outline';
                                }else if (route.name === 'Dishes') {
                                    iconName = 'restaurant-outline';
                                }else if (route.name === 'Menus') {
                                    iconName = 'book-outline';
                                }else if (route.name === 'Offers') {
                                    iconName = 'pricetag-outline';
                                }else if (route.name === 'Add') {
                                    iconName = 'add-circle-outline';
                                }else if (route.name === 'Balance') {
                                    iconName = 'cash-outline';
                                }
                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarButton: [
                                "OrderView",
                                "DishFormView",
                                "MenuFormView",
                                "SettingsCredentialsForm",
                                "SettingsPersonalInformationForm",
                                "SettingsAddressForm",
                                "SettingsOrderInformationForm",
                                "Balance",
                                "OfferFormView",
                            ].includes(route.name)
                                ? () => {
                                    return null;
                                }
                                : undefined,
                        })}
                        tabBarOptions={{
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'gray',
                        }}
                    >
                        <Tab.Screen name="Home" component={HomeStack} />
                        <Tab.Screen name="Orders" component={OrdersTab} options={{ tabBarBadge: 3 }} />
                        <Tab.Screen name="Dishes" component={DishTab} />
                        <Tab.Screen name="Menus" component={MenuTab} />
                        <Tab.Screen name="Offers" component={OfferTab} />
                        <Tab.Screen name="Add" component={AddView} />
                        <Tab.Screen name="OrderView" component={OrderView}/>
                        <Tab.Screen name="DishFormView" component={DishFormView}/>
                        <Tab.Screen name="MenuFormView" component={MenuFormView}/>
                        <Tab.Screen name="OfferFormView" component={OfferFormView}/>
                        <Tab.Screen name="SettingsCredentialsForm" component={SettingsCredentialsForm}/>
                        <Tab.Screen name="SettingsPersonalInformationForm" component={SettingsPersonalInformationForm}/>
                        <Tab.Screen name="SettingsAddressForm" component={SettingsAddressForm}/>
                        <Tab.Screen name="SettingsOrderInformationForm" component={SettingsOrderInformationForm}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
        )
    }
}