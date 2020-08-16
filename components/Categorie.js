import React from 'react';
import {   Text,TouchableOpacity, View  } from 'react-native';
import api from './api';
import { styles  } from './styles';
import Produits from './Produits';
import Footer from './Footer';


export default class categories extends React.Component{

    state = {
        categories: [],
        message: '' 
    }

    componentDidMount(){
        this.getCategories();
    }
    
    getCategories=()=>{
        this.setState({message:'Chargement en cours..'});
        api.get('/categories').then(
            res => {
                this.setState({categories: res.data});
                this.setState({message:''});
            }
        )
    }

   

    render(){
         return(
            <View>
                <View style={{margin: 10}}>
                <Text>{this.state.message}</Text>
                <View style={{marginVertical:5}}>
                    {this.state.categories.map((cat)=>{
                        return <TouchableOpacity  onPress={() => {
                            this.props.navigation.navigate("Details Catégorie",{categorie_id    : cat.id,
                                                                                categorie_title : cat.intitule})}
                            }>
                            <Text style={styles.button3}>{cat.intitule}</Text>
                        </TouchableOpacity>
                    })}
                </View>
            </View>
            <Footer navigation={this.props.navigation} /> 
            </View>
          )
    }
}

