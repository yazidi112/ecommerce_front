import React from 'react';
import {   View,TouchableOpacity,Text } from 'react-native';
import { styles  } from './styles';

export default class Footer extends React.Component{

    render(){
         return(
            <View style={styles.footer}>
                <View style={styles.fixToText}>
                    <TouchableOpacity style={styles.footerButton} onPress={() =>
                        this.props.navigation.navigate('Accueil')
                    }><Text>Accueil</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton} onPress={() =>
                        this.props.navigation.navigate('Catégories')
                    }><Text>Catégories</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton} onPress={() =>
                        this.props.navigation.navigate('Panier')
                    }><Text>Panier</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton} onPress={() =>
                        this.props.navigation.navigate('Commandes')
                    }><Text>Commandes</Text></TouchableOpacity>
                </View>            
            </View>
          )
    }
}

