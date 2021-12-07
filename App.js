import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';

import SearchScreen from './screens/SearchScreen';
import AccountScreen from './screens/AccountScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import SelectedTattooArtistScreen from './screens/SelectedTattooArtistScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import saveTatoueurInfos from './reducers/saveTatoueurInfos';

const store = createStore(combineReducers({ saveTatoueurInfos }));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function SearchStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Resultat" component={SearchResultScreen} />
            <Stack.Screen name="TattooArtist" component={SelectedTattooArtistScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color }) => {
                            let iconName;
                            if (route.name === 'Recherche') {
                                iconName = 'search';
                            } else if (route.name === 'Mes RDV') {
                                iconName = 'calendar-o';
                            } else if (route.name === 'Mon compte') {
                                iconName = 'user';
                            }
                            return <FontAwesome name={iconName} size={25} color={color} />;
                        },
                        tabBarActiveTintColor: "#C2A77D",
                        tabBarInactiveTintColor: "#F1EFE5",
                        tabBarStyle: { backgroundColor: "#424D41" },
                        headerShown: false
                    }
                    )}
                >
                    <Tab.Screen name="Recherche" component={SearchStack} />
                    <Tab.Screen name="Mes RDV" component={AppointmentScreen} />
                    <Tab.Screen name="Mon compte" component={AccountScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}