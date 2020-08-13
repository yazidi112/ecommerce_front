import React from 'react';
import { StyleSheet, Text, View,Button,Image,ListView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import api from './api';
import { styles  } from './styles';

export default class Commandes extends React.Component{
     

    render(){
         return(
            <View>
                <Text style={styles.title}>Mes commandes</Text>
                 
                
            </View>
          )
    }
}

 