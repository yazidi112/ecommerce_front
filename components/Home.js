import React from 'react';
import {  Text, View,Button,Image,ListView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import api from './api';
import { styles  } from './styles';
import Produits from './Produits';


export default class Home extends React.Component{

    state = {
        articles: [],
        message: '' 
    }

    componentDidMount(){
         this.getArticles('');
    }
    
     

    getArticles(catid){
        this.setState({articles:[]});
        this.setState({message:'Chargement..'});
        api.get('/articles?categorie='+catid).then(
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
    
    search(text){
        this.setState({articles:[]});
        this.setState({message:'Recherche..'});
        api.get('/articles?titre='+text).then(
            res => {
                if(res.data.length !== 0){
                    this.setState({articles: res.data});
                    this.setState({message:''});
                    
                }else{
                    this.setState({message:'Aucun article'});
                    this.setState({articles:[]});
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
                <Text style={styles.title}>Accueil</Text>
                <View style={{margin: 10}}>
                    <TextInput placeholder="Recherche produit." style={{borderWidth: 1,borderColor: '#ccc',backgroundColor: "#fff", padding:5, marginVertical:10}} 
                        onChangeText={(text) => this.search(text)}
                    />
                    <view  style={{marginVertical:5}}>
                        <text>{this.state.message}</text>
                        <Produits ajouterAuPanier={this.ajouterAuPanier} data={this.state.articles} />
                    </view>
                </View>
            </View>
          )
    }
}

 