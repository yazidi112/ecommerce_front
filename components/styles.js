import { StyleSheet } from 'react-native'
  
 const styles = StyleSheet.create({
    title:{
       fontWeight:'bold',
       textAlign: 'center',
       fontSize: 20,
       backgroundColor: 'purple',
       color: 'white',
       paddingVertical: 10
    },
   fixToText: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     backgroundColor: '#fff',
     paddingVertical:4
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
       width: '100%',
       height: 110,
   },
   button: {
       backgroundColor: '#D253D1;'
   }
});

export { styles} 