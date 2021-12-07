import React from 'react';
import { StyleSheet , Text, View } from 'react-native';
import { Image, Button } from 'react-native-elements';

function SearchResultScreen(props) {
    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <Image 
                source = {require('../assets/tattoo-moi_1.png')}
                style={{ width: 200, height: 80, marginRight: 70 }} />
            <Button
            title="Connexion"
            titleStyle={{color:'#424D41'}}
            type="clear"
            onPress={() => props.navigation.navigate('Connexion')}
            />
            </View>
            
            <Button 
            title="Selectionner Artiste"
            type="solid"
            color = '#424D41'
            onPress={() => props.navigation.navigate('TattooArtist')}
     />
        </View>
    )
}

export default SearchResultScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    });
    
