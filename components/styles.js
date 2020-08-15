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
   input : {
    height: 40, padding:4, borderColor: '#f56b3f', borderWidth: 1, backgroundColor: '#fff',marginVertical:8
   },
   img: {
       width: '100%',
       height: 200,
   },
   button: {
       backgroundColor: '#D253D1;'
   },
   button2:{textAlign: 'center',color:'#f4511e',backgroundColor:'white',borderRadius:5, padding:5,borderWidth:1,borderColor:'#ccc',margin:4},
   button3:{textAlign: 'center', color:'white',backgroundColor:'#f4511e',borderRadius:5, padding:8,borderWidth:1,borderColor:'#ccc',margin:4},
   footer:{
    position: 'fixed', left: 0, right: 0, bottom: 0,
    padding:10,
    backgroundColor: '#fff',
    borderTopColor: '#f4511e',
    borderTopWidth:3
   },
   footerButton:{
        color: '#000',
        backgroundColor: '#fff',
        height:30
   },
   error:{
        color: 'red',
        backgroundColor: '#f7d5d5',
        padding: '6px',
        borderRadius: '6px',
        margin: '5px',
        width: '100%'
   },
   success:{
        color: 'green',
        backgroundColor: 'white',
        padding: '6px',
        borderRadius: '6px',
        margin: '5px',
        width: '100%'
   }
});

export { styles} 