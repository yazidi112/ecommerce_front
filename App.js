import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Categorie from './components/Categorie';
import Commandes from './components/Commandes';
import Panier from './components/Panier';

 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Accueil" component={Home}  />
        <Tab.Screen name="Catégories" component={Categorie}  />
        <Tab.Screen name="Panier" component={Panier} />
        <Tab.Screen name="Commandes" component={Commandes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}