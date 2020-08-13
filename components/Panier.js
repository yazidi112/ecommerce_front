import React from 'react';
import { View , Text, Button } from 'react-native';
import api from './api';
import { styles  } from './styles';


export default class Panier extends React.Component{

    state = {
        panier: [],
        message: ''
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
        api.post('/commandes',{user:'/api/users/1',date: '2020/08/13'}).then(
            res => {
                this.setState({message: <Text style={{color:'green'}}>Achat effectué avec success.</Text>});
                localStorage.removeItem("panier");
                this.setState({panier: []});
            },
            err => {
                this.setState({message: <Text style={{color:'red'}}>Opération echouée.</Text>})
            }
        )
    }

    render(){
        return(
            <View>
                <Text style={styles.title}>Mon panier</Text>
                <View style={{margin: 10}}>
                    <Text>{this.state.message} </Text>
                    <View style={styles.fixToText}>
                        <Text style={{fontWeight:'bold'}}>TOTAL</Text>
                        <Text style={{fontWeight:'bold'}}>
                            {(this.state.panier.reduce((a, b) => parseFloat(a) + parseFloat(b.montant), 0)).toFixed(2)} DH
                        </Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.fixToText}>
                        <Text>Produit</Text>
                        <Text>Prix</Text>
                        <Text>Quantité</Text>
                        <Text>Montant</Text>
                        <Text> </Text>
                    </View>
                    <View style={styles.separator} />
                    {this.state.panier.map((ligne,index)=>{
                        return  <View key={index} style={styles.fixToText}>
                                    <Text>{ligne.article.titre}</Text>
                                    <Text>{ligne.prix}</Text>
                                    <Text>
                                        <Button color='#D253D1' title="-" 
                                            onPress={this.onLigneQteUpdate.bind(this,index,-1)} />
                                        {ligne.qte}
                                        <Button color='#D253D1' title="+" onPress={this.onLigneQteUpdate.bind(this,index,1)} />
                                    </Text>
                                    <Text>{ligne.montant} DH</Text>
                                    <Button color="red" title="X" 
                                        onPress={this.delete.bind(this)} />
                                </View>
                    })}
                    <Button title="Acheter" color='#D253D1' onPress={this.acheter} />
                </View>
            </View>
            )
    }
}

 