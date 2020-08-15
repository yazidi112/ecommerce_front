import React from 'react';
import {   Text, View,TouchableOpacity,TextInput } from 'react-native';
import api from './api';
import { styles } from './styles';
import axios from 'axios';

export default class Login extends React.Component{

    state = {
        email       : '',
        password    : '',
        message     : ''
    }

    login =() => {
        api.post('../login?email='+this.state.email+'&password='+this.state.password).then(
            res =>{
                console.log(res);
                if(res.data === null){
                    this.setState({message: <Text style={styles.error}>Erreur: Email ou mot de passe incorrect !</Text>})
                }else{
                    this.setState({message: <Text style={styles.success}>Authentifié.</Text>});
                    localStorage.setItem('user',JSON.stringify(res.data));
                    this.props.navigation.navigate('Accueil', { update: 'update' });
                }
            },
            err =>{
                this.setState({message: <Text style={styles.error}>Erreur lors d'authentification ! Veuillez ressayer.</Text>})
            }
        );
    }
    render(){
        return(
            <View style={{margin:10}}>
                <Text style={{textAlign:'center'}}>{this.state.message}</Text>
                <Text>Email</Text>
                <TextInput style={styles.input}  onChangeText={(text)=>{this.setState({email: text})}}  />
                <Text>Mot de passe</Text>
                <TextInput secureTextEntry={true} style={styles.input}  onChangeText={(text)=>{this.setState({password: text})}}  />
                <TouchableOpacity  onPress={ 
                            this.login
                        }><Text style={styles.button3}>Connexion</Text></TouchableOpacity>
             </View>
          )
    }
}