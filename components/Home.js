import React from 'react';
import {  Text, View,Button,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import api from './api';
import { styles  } from './styles';
import Produits from './Produits';
import Footer from './Footer';

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
            <View style={{marginBottom:40}}>
                <View style={{backgroundColor:'white',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
                 {!localStorage.getItem('user') && 
                    
                        <View style={styles.fixToText}>
                            <TouchableOpacity  onPress={() =>
                                this.props.navigation.navigate('Login')
                            }><Text style={styles.button2}>Connexion</Text></TouchableOpacity>

                            <TouchableOpacity  onPress={() =>
                                this.props.navigation.navigate('Signup')
                            }><Text style={styles.button2}>S'inscrire</Text></TouchableOpacity>

                        </View>
                    
                }
                {localStorage.getItem('user') && 
                    <View style={styles.fixToText}>
                        <Text style={{margin:'4px'}}>
                            Bienvenue <Text style={{fontWeight:'bold'}}>{JSON.parse(localStorage.getItem('user')).email}</Text>
                        </Text>
                        <TouchableOpacity  onPress={() =>{
                                localStorage.removeItem('user');
                                this.props.navigation.navigate('Accueil', { update: 'update' })
                            }
                        }><Text style={styles.button2}>Déconnexion</Text></TouchableOpacity>
                         
                    </View>
                }
                </View>
                <View style={{margin: 10}}>
                    <TextInput placeholder="Rechercher un produit." style={styles.input} 
                        onChangeText={(text) => this.search(text)}
                    />
                    <view  style={{marginVertical:5}}>
                        <text>{this.state.message}</text>
                        <Produits ajouterAuPanier={this.ajouterAuPanier} data={this.state.articles} />
                    </view>
                </View>
                <Footer navigation={this.props.navigation} />                    
                 
            </View>
          )
    }
}

 