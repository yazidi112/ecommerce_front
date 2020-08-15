import React from 'react';
import {   Text, View,TouchableOpacity,TextInput } from 'react-native';
import api from './api';
import { styles } from './styles';

export default class Signup extends React.Component{

    state = {
        email       : '',
        password    : '',
        nom         : '',
        prenom      : '',
        tel         : '',
        adresse     : '',
        message     : ''
    }

    signup = () => {
        api.post('/users/create',{     email: this.state.email,
                                       password: this.state.password,
                                       nom: this.state.nom,
                                       prenom: this.state.prenom,
                                       tel:this.state.tel,
                                       adresse: this.state.adresse}
        ).then(
            res=>{
                if(res.data.id){
                    this.props.navigation.navigate('Login');
                }
            },
            err=>{
                this.setState({message:<Text style={styles.error}>'Erreur lors de linscription !!'</Text>})
            }
        );
    }
    render(){
        return(
            <View style={{margin:10}}>
                <Text style={{textAlign:'center'}}>{this.state.message}</Text>
                <Text>Email</Text>
                <TextInput style={styles.input} onChangeText={(text)=>{this.setState({email: text})}} />
                <Text>Mot de passe</Text>
                <TextInput  style={styles.input} onChangeText={(text)=>{this.setState({password: text})}} />
                <Text>Nom</Text>
                <TextInput  style={styles.input} onChangeText={(text)=>{this.setState({nom: text})}} />
                <Text>Prénom</Text>
                <TextInput  style={styles.input} onChangeText={(text)=>{this.setState({prenom: text})}} />
                <Text>Téléphone</Text>
                <TextInput  style={styles.input}  onChangeText={(text)=>{this.setState({tel: text})}} />
                <Text>Adresse</Text>
                <TextInput  style={styles.input} onChangeText={(text)=>{this.setState({adresse: text})}} />
                 <TouchableOpacity  onPress={ 
                            this.signup
                        }><Text style={styles.button3}>S'inscrire</Text></TouchableOpacity>
            </View>
          )
    }
}