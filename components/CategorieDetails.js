import React from 'react';
import {   Text,TouchableOpacity, View  } from 'react-native';
import api from './api';
import { styles  } from './styles';
import Produits from './Produits';
import Footer from './Footer';


export default class CategorieDetails extends React.Component{

    state = {
        articles: [],
        message: '' 
    }
    
    constructor(props) {
        super(props);
        this.getArticles(props.route.params.categorie_id);
    }

    getArticles = (categorie_id) =>{

        this.setState({message:'Chargement en cours..'});
        api.get('/articles?categorie='+categorie_id).then(
            res => {
                if(res.data.length !== 0){
                    this.setState({articles: res.data});
                    this.setState({message:''});
                }else{
                    this.setState({message:'Aucun article'});
                }
                
            }
        )
    }
    
    
    ajouterAuPanier(art){
        let panier = [];
        if(localStorage.getItem('panier'))
            panier = JSON.parse(localStorage.getItem('panier'));
        
        let ligne = {article:art,prix:art.prix,qte:1,montant: art.prix}
        panier.push(ligne);
        localStorage.setItem('panier',JSON.stringify(panier));
    }

    render(){
         return(
            <View>
                <View style={{margin: 10}}>
                <View style={{marginVertical:5,backgroundColor:'white', color:'orange',padding:5,fontWeight:'bold'}}>
                    <Text>{this.props.route.params.categorie_title}</Text>
                </View>
                <Produits ajouterAuPanier={this.ajouterAuPanier} data={this.state.articles} />
            </View>
            <Footer navigation={this.props.navigation} /> 
            </View>
          )
    }
}

