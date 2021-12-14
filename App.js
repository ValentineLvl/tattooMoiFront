import { LogBox } from 'react-native';
//LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

import React from 'react';

//Screens client
import SearchScreen from './screens/SearchScreen';
import AccountScreen from './screens/AccountScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProjectFormScreen from './screens/ProjectFormScreen';
import ClientInfoScreen from './screens/ClientInfoScreen';
import FavorisScreen from './screens/FavorisScreen';

//Screens tatoueur
import SignInTatoueurScreen from './screensTatoueur/SignInTatoueurScreen';
import SelectedTattooArtistScreen from './screens/SelectedTattooArtistScreen';
import SignUpTatoueurScreen from './screensTatoueur/SignUpTatoueurScreen';
import AccountTatoueurScreen from './screensTatoueur/AccountTatoueurScreen';
import AppointmentTatoueurScreen from './screensTatoueur/AppointmentTatoueurScreen';
import CalendarScreen from './screensTatoueur/CalendarScreen';
import TattooInfosScreen from './screensTatoueur/TattooInfosScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import formList from './reducers/form';
import dataUser from './reducers/dataUser';
import saveTatoueurInfos from './reducers/saveTatoueurInfos';
import selectedArtistInfos from './reducers/selectedArtistInfos';
import dataTattoo from './reducers/dataTattoo';
// import photoList from './reducers/photo';

const store = createStore(combineReducers({ formList, dataUser, saveTatoueurInfos, selectedArtistInfos, dataTattoo }));

const Stack = createStackNavigator();
const SearchStack = createStackNavigator();
const AccountStack = createStackNavigator();
const AccountTattooStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabTattoo = createBottomTabNavigator();

function TabBottomClient() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;
                    if (route.name === 'Recherche') {
                        iconName = 'search';
                    } else if (route.name === 'Mes demandes') {
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
            <Tab.Screen name="Recherche" component={SearchStackNav} />
            <Tab.Screen name="Mes demandes" component={AppointmentScreen} />
            <Tab.Screen name="Mon compte" component={AccountStackNav} />
        </Tab.Navigator>
    )
}

function SearchStackNav() {
    return (
        <SearchStack.Navigator screenOptions={{ headerShown: false }} >
        <SearchStack.Screen name="Search" component={SearchScreen} />
        <SearchStack.Screen name="Resultat" component={SearchResultScreen} />
        <SearchStack.Screen name="TattooArtist" component={SelectedTattooArtistScreen} />
        <SearchStack.Screen name="Formulaire" component={ProjectFormScreen} />
        </SearchStack.Navigator>
    );
}

function AccountStackNav() {
    return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }} >
    <AccountStack.Screen name="Account" component={AccountScreen}/>
    <AccountStack.Screen name="Mes infos" component={ClientInfoScreen}/>
    <AccountStack.Screen name="Mes favoris" component={FavorisScreen} />
    <AccountStack.Screen name="Mes demandes" component={AppointmentScreen} />
    </AccountStack.Navigator>
    );
}

function TabBottomTattoo() {
    return (
        <TabTattoo.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;
                    if (route.name === 'Calendrier') {
                        iconName = 'calendar';
                    } else if (route.name === 'Mes demandes') {
                        iconName = 'calendar-o';
                    } else if (route.name === 'Mon espace') {
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
            <TabTattoo.Screen name="Calendrier" component={CalendarScreen} />
            <TabTattoo.Screen name="Mes demandes" component={AppointmentTatoueurScreen} />
            <TabTattoo.Screen name="Mon espace" component={AccountTattooStackNav} />
        </TabTattoo.Navigator>
    )
}

function AccountTattooStackNav() {
    return (
    <AccountTattooStack.Navigator screenOptions={{ headerShown: false }} >
    <AccountTattooStack.Screen name="AccountTattoo" component={AccountTatoueurScreen}/>
    <AccountTattooStack.Screen name="Infos" component={TattooInfosScreen}/>
    <AccountTattooStack.Screen name="Calendar" component={CalendarScreen} />
    <AccountTattooStack.Screen name="Demandes" component={AppointmentTatoueurScreen} />
    </AccountTattooStack.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} >
                    <Stack.Screen name="TabBottomClient" component={TabBottomClient} />
                    <Stack.Screen name="Connexion" component={SignInScreen} />
                    <Stack.Screen name="Inscription" component={SignUpScreen} />
                    <Stack.Screen name="Connexion Tatoueur" component={SignInTatoueurScreen} />
                    <Stack.Screen name="Inscription Tatoueur" component={SignUpTatoueurScreen} />
                    <Stack.Screen name="TabBottomTattoo" component={TabBottomTattoo} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}