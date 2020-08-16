import React from 'react';
import {   Text, View,Button,TouchableOpacity   } from 'react-native';
import api from './api';
import { styles  } from './styles';
import Footer from './Footer';


export default class Commandes extends React.Component{
     
    state = {
        commandes: [],
        user     : JSON.parse(localStorage.getItem('user')),
        message  : ''
    }

    componentDidMount(){
        this.getCommandes();
    }

    getCommandes = () =>{
        this.setState({message:'Chargement en cours..'});
        let id = this.state.user? this.state.user.id: null;
        api.get('/commandes?user='+id).then(
            res => {
                this.setState({commandes: res.data});
                this.setState({message:''});
            }
        )
    }

    

    render(){
        if(!localStorage.getItem('user'))
            return (
                <View style={{margin:10}}>
                    <Text style={{marginVertical:5}}>Veuillez s'authentifier pour pouvoir voir votre commandes</Text>
                     
                    <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Login')}>
                        <Text style={styles.button3}>Connexion</Text>
                    </TouchableOpacity>
                    <Footer navigation={this.props.navigation} /> 
                </View>

            )
        return(
            <View style={{margin:10}}>
                  <View style={{backgroundColor:'white',padding:5,marginBottom:10}}>
                    <Text>{this.state.message}</Text>
                    {this.state.commandes.map((c,index)=>{
                        return  <View key={index} style={styles.fixToText}>
                                    <Text>{c.id}</Text>
                                    <Text>{c.date}</Text>
                                    <TouchableOpacity  onPress={() =>
                                        this.props.navigation.navigate("Détails Commande",{id: c.id})
                                    }><Text style={styles.button3}>Détails</Text></TouchableOpacity>
                                     
                                </View>
                    })}
                 </View>
               
                <Footer navigation={this.props.navigation} />  
            </View>
          )
    }
}

 