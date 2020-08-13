import React from 'react';
import { StyleSheet, Text, View,Button,Image,ListView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import api from './api';
import { styles  } from './styles';
import Produits from './Produits';

export default class categories extends React.Component{

    state = {
        categories: [],
        articles: [],
        message: '' 
    }

    componentDidMount(){
        this.getCategories();
    }
    
    getCategories(){
        api.get('/categories').then(
            res => {
                this.setState({categories: res.data});
            }
        )
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
    
    
    ajouterAuPanier(art){
        console.log(art);
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
                <Text style={styles.title}>Catégories</Text>
                <View style={{margin: 10}}>
                <View style={{marginVertical:5}}>
                    {this.state.categories.map((cat)=>{
                        return <Button title={cat.intitule} color="#a903a9" style={{ paddingVertical:4 }}
                            onPress={this.getArticles.bind(this,cat.id)}
                        />
                    })}
                </View>
                <Produits ajouterAuPanier={this.ajouterAuPanier} data={this.state.articles} />
            </View>
            </View>
          )
    }
}

