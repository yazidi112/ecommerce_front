import React from 'react';
import { View , Text, Button ,TouchableOpacity} from 'react-native';
import api from './api';
import { styles  } from './styles';
import Footer from './Footer';
import date from './helpers/date';


export default class Panier extends React.Component{

    state = {
        panier      : [],
        message     : '',
        user        : JSON.parse(localStorage.getItem('user'))
    }

    constructor(props){
        super(props);
       
    }

    componentDidMount(){
        this.setState({
            panier: JSON.parse(localStorage.getItem('panier'))
        });
    }

    delete(index){
        let panier = this.state.panier;
        panier.splice(index,1);
        this.setState({panier});
        localStorage.setItem("panier",JSON.stringify(panier));
    }

    onLigneQteUpdate(index,value){
        let panier = this.state.panier;
        panier[index].qte = parseInt(panier[index].qte) + parseInt(value);
        panier[index].montant  = (parseFloat(panier[index].prix) * parseFloat(panier[index].qte)).toFixed(2);
        this.setState({panier});
        localStorage.setItem("panier",JSON.stringify(panier));
    }

    

    acheter = () => {
        
        this.setState({message: <Text style={{color:'orange'}}>Opération en cours.</Text>})
        api.post('/commandes',{user:'/api/users/'+this.state.user.id,date: date()}).then(
            res => {
                this.setState({message: <Text style={styles.success}>Opération effectué avec success.</Text>});
                this.state.panier.map((c) => {
                        
                    return api.post('/lignecommandes',{
                            "article"   : "/api/articles/" + c.article.id,
                            "quantite"  : c.qte,
                            "prix"      : parseFloat(c.prix),
                            "commande"   : "/api/commandes/"+res.data.id
                        }).then(
                            res => {
                                console.log(res.data);
                            },
                            err => {
                                console.log(err)
                            }
                        )
                });
                localStorage.removeItem("panier");
                this.setState({panier: []});
            },
            err => {
                this.setState({message: <Text style={styles.error}>Opération echouée.</Text>})
            }
        )
    }

    render(){
        return(
            <View>
                <View style={{margin: 10}}>
                    <Text style={{textAlign:'center'}}>{this.state.message} </Text>
                        {this.state.panier &&
                            <View style={styles.fixToText}>
                                <Text style={{fontWeight:'bold'}}>TOTAL</Text>
                                <Text style={{fontWeight:'bold'}}>
                                    {(this.state.panier.reduce((a, b) => parseFloat(a) + parseFloat(b.montant), 0)).toFixed(2)} DH
                                </Text>
                            </View>
                        }
                            <View style={{backgroundColor:'white'}} >
                                <View style={styles.separator} />
                                <View style={styles.fixToText}>
                                    <Text>Produit</Text>
                                    <Text>Prix</Text>
                                    <Text>Quantité</Text>
                                    <Text>Montant</Text>
                                    <Text> </Text>
                                </View>
                                <View style={styles.separator} />
                            </View>
                         
                        {this.state.panier && this.state.panier.map((ligne,index)=>{
                            return  <View key={index} style={styles.fixToText}>
                                        <Text>{ligne.article.titre}</Text>
                                        <Text>{ligne.prix}</Text>
                                        <Text>
                                            <Button color='#f4d01e' title="-" 
                                                onPress={this.onLigneQteUpdate.bind(this,index,-1)} />
                                            <Text style={{margin: 4}}>{ligne.qte}</Text>
                                            <Button color='#f4d01e' title="+" onPress={this.onLigneQteUpdate.bind(this,index,1)} />
                                        </Text>
                                        <Text>{ligne.montant} DH</Text>
                                        <Button color="red" title="X" 
                                            onPress={this.delete.bind(this)} />
                                    </View>
                        })}
                     
                    {!this.state.panier && 
                        <View style={{margin:10}}>
                            <Text style={{marginVertical:5,textAlign:'center'}}>Panier vide</Text>
                        </View>
                    }
                    {localStorage.getItem('user') && this.state.panier && 
                        <TouchableOpacity  onPress={this.acheter}>
                            <Text style={styles.button3}>Acheter</Text>
                        </TouchableOpacity>
                    }
                    {!localStorage.getItem('user') && 
                         <View style={{margin:10}}>
                            <Text style={{marginVertical:5}}>Veuillez s'authentifier pour pouvoir voir acheter</Text>
                             
                            <TouchableOpacity  onPress={()=>
                                this.props.navigation.navigate('Login')}>
                                <Text style={styles.button3}>Connexion</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    
                </View>
                <Footer navigation={this.props.navigation} />  
            </View>
            )
    }
}

 