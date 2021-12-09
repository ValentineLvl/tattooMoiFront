import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inscription from './components/inscription/Inscription';
import Presentation from './components/presentation/Presentation';
import Connexion from './components/connexion/Connexion';
import MenuTatoueur from './components/menu_tatoueur/MenuTatoueur';
import MesInfos from './components/mes_infos/MesInfos';
import MesRdv from './components/mes_rdv/MesRdv';
import DevisAttente from './components/mes_rdv_confirmer/DevisAttente';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen options={{ headerShown: false }} name="presentation" component={Presentation} /> */}
        {/* <Stack.Screen name="inscription" component={Inscription} /> */}
        {/* <Stack.Screen name="connexion" component={Connexion} /> */}
        {/* <Stack.Screen name="menuTatoueur" component={MenuTatoueur} options={{ title: 'Menu tatoueur' }} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="mesinfos" component={MesInfos} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="mes_rdv" component={MesRdv} /> */}
        <Stack.Screen options={{ headerShown: false }} name="mes_devis" component={DevisAttente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
