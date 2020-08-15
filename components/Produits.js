import React from 'react';
import {View,Image,Text,TouchableOpacity} from 'react-native';
import { styles  } from './styles';

export default class Produit extends React.Component{
    render(){
        return(
            <View>
            {this.props.data.map((art)=>{
                return <View style={{marginBottom: 10, paddingVertical:5,paddingTop:0, backgroundColor:'white',textAlign:'center'}}>
                    <Image source={{uri: art.image}}  style={styles.img}/>
                    
                    <View >
                        <Text style={{color:'#555'}}>
                            {art.titre}
                        </Text>
                        <Text style={{fontWeight:'bold'}}> 
                            {art.prix} DH
                        </Text>
                        <TouchableOpacity  onPress={
                            this.props.ajouterAuPanier.bind(this,art)
                        }><Text style={styles.button3}>Ajouter au panier</Text></TouchableOpacity>
                         
                    </View>
                </View>
            })}
            </View>
        )
    }
}