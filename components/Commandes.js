import React from 'react';
import {   Text, View,Button,TouchableOpacity   } from 'react-native';
import api from './api';
import { styles  } from './styles';
import Footer from './Footer';


export default class Commandes extends React.Component{
     
    state = {
        commandes: [],
        commande : {lignecommandes:[]},
        user     : JSON.parse(localStorage.getItem('user'))
    }

    componentDidMount(){
        this.getCommandes();
    }

    getCommandes(){
        let id = this.state.user? this.state.user.id: null;
        api.get('/commandes?user='+id).then(
            res => {
                this.setState({commandes: res.data});
            }
        )
    }

    getSelectedCommande(id){
        api.get('/commandes/'+id).then(
            res => {
                this.setState({commande: res.data});
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
                    {this.state.commandes.map((c,index)=>{
                        return  <View key={index} style={styles.fixToText}>
                                    <Text>{c.id}</Text>
                                    <Text>{c.date}</Text>
                                    <TouchableOpacity  onPress={
                                        this.getSelectedCommande.bind(this,c.id)
                                    }><Text style={styles.button3}>Détails</Text></TouchableOpacity>
                                     
                                </View>
                    })}
                 </View>
                <View style={{backgroundColor:'white',padding:5}}>
                <View  style={styles.fixToText}>
                    <Text>Article</Text>
                    <Text>Prix</Text>
                    <Text>Quantité</Text>
                    <Text>Montant</Text>
                </View>
                <View style={styles.separator} />
                {this.state.commande.lignecommandes.map((ligne,index)=>{
                    return  <View key={index} style={styles.fixToText}>
                                <Text>{ligne.article.titre}</Text>
                                <Text>{ligne.prix} DH</Text>
                                <Text>{ligne.quantite}</Text>
                                <Text>{ligne.prix * ligne.quantite} DH</Text>
                            </View>
                })}
                {this.state.commande.lignecommandes.length>0 &&
                <View style={styles.fixToText}>
                    <Text style={{fontWeight:'bold'}}>TOTAL</Text>
                    <Text style={{fontWeight:'bold'}}>
                        {(this.state.commande.lignecommandes.reduce((a, b) => parseFloat(a) + parseFloat(b.prix * b.quantite), 0)).toFixed(2)} DH
                    </Text>
                </View>
                }
                </View>
                <Footer navigation={this.props.navigation} />  
            </View>
          )
    }
}

 