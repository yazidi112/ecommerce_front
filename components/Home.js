import React from 'react';
import { StyleSheet, Text, View,Button,Image,ListView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
    
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    
        this.state = {
          dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
      }
    render(){
        const imageSource = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';
        return(
            <View style={{margin:10}}>
                <TextInput placeholder="Recherche produit." style={{borderWidth: 1,borderColor: '#ccc',backgroundColor: "#fff", padding:5, marginVertical:10}} />
                <Text>Nouveautés</Text>
                <View style={styles.separator}/>
                <View style={styles.container}>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={data => (
                    <View >
                        <Image
                            source={{ uri: imageSource }}
                            style={styles.img}
                        />
                        <Text>{data}</Text>
                    </View>)}
                />
                </View>
                <Text>Catégories</Text>
                <View style={styles.separator}/>
                <View style={styles.fixToText}>
                    <Button title="Mon profile"  
                        onPress={() =>
                            this.props.navigation.navigate('Profile')
                        }
                    />
                    <Button title="Mon panier" color="#f194ff" 
                        onPress={() =>
                            this.props.navigation.navigate('Panier')
                        }
                    />
                    <Button title="Connexion"
                        onPress={() =>
                            this.props.navigation.navigate('Login')
                        }
                    />
                </View>
            </View>
          )
    }
}

const styles = StyleSheet.create({
     
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical:5
    },
    container: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
       justifyContent: 'space-between',
    },
    img: {
        width: 193,
        height: 110,
    },
  });