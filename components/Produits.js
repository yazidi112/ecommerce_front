import React from 'react';
import {View,Image,Text,Button} from 'react-native';
import { styles  } from './styles';

export default class Produit extends React.Component{
    render(){
        return(
            <View>
            {this.props.data.map((art)=>{
                return <View style={{paddingVertical:5}}>
                    <Image source={{uri: art.image}}  style={styles.img}/>
                    
                    <View style={styles.fixToText}>
                        <Text style={{fontWeight:'bold'}}>
                            {art.titre}
                            <br/> 
                            {art.prix} DH
                        </Text>
                        <Button title="Ajouter au panier" color='#D253D1' style={styles.button} 
                            onPress={this.props.ajouterAuPanier.bind(this,art)}
                        />
                    </View>
                </View>
            })}
            </View>
        )
    }
}