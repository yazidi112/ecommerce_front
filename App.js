import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Categorie from './components/Categorie';
import CategorieDetails from './components/CategorieDetails';
import Commandes from './components/Commandes';
import DetailsCommandes from './components/CommandeDetails';
import Panier from './components/Panier';
import Login from './components/Login';
import Signup from './components/signup';
 

const Stack = createStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Accueil" component={Home}  />
        <Stack.Screen name="Catégories" component={Categorie}  />
        <Stack.Screen name="Details Catégorie" component={CategorieDetails}  />
        <Stack.Screen name="Panier" component={Panier} />
        <Stack.Screen name="Commandes" component={Commandes} />
        <Stack.Screen name="Détails Commande" component={DetailsCommandes} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}