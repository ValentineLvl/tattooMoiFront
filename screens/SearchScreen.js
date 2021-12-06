import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image } from 'react-native-elements';


function SearchScreen(props) {
    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <Image 
                source = {require('../assets/tattoo-moi_1.png')}
                style={{ width: 200, height: 80, marginRight: 70 }} />
            <Button
            title="Connexion"
            buttonStyle = {{backgroundColor:'#424D41', padding:1, paddingRight:5, paddingLeft:5, borderRadius:5}}
            type="solid"
            />
            </View>
            
<View style = {styles.main}>
            <Button 
            title="Rechercher"
            type="solid"
            buttonStyle = {{backgroundColor : '#424D41'}}
            onPress={() => props.navigation.navigate('Resultat')}
     />
     </View>
        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection : 'column',
      paddingTop : 50,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        flex:2,  
        maxHeight : 80,
        flexDirection : 'row',
        alignItems : 'center',
       justifyContent :'space-evenly',
    },
    main: {
        flex:3,
        flexDirection : 'column',  
        alignItems : 'center',
        justifyContent: 'center',
    },
    });
    
