import React from 'react';
import {   Text, View    } from 'react-native';
import api from './api';
import { styles  } from './styles';
import Footer from './Footer';


export default class CommandesDetails extends React.Component{
     
    state = {
        commande : {lignecommandes:[]},
        message  : ''
    }
    

    componentDidMount(){
        this.getCommande(this.props.route.params.id)
    }

    

    getCommande(id){
        this.setState({message:'Chargement en cours..'});
        api.get('/commandes/'+id).then(
            res => {
                this.setState({commande: res.data});
                this.setState({message:''});
            }
        )
    }

    render(){
        
        return(
            <View style={{margin:10}}>
                <View style={{backgroundColor:'white',padding:5}}>
                <Text>{this.state.message}</Text>
                <Text>Date: {this.state.commande.date}</Text>
                <View style={styles.separator} />
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

 