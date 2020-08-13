import React from 'react';
import {   Text, View,Button,TextInput } from 'react-native';

export default class Login extends React.Component{
    render(){
        return(
            <View>
                <Text>Nom d'utilisateur</Text>
                <TextInput/>
                <Text>Mot de passe</Text>
                <TextInput/>
                <Button
                title="Connexion"
                />
            </View>
          )
    }
}