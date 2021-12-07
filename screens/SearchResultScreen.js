import React from 'react';
import { StyleSheet , Text, View } from 'react-native';
import { Image, Button } from 'react-native-elements';
import HeaderComponent from './HeaderComponent';

function SearchResultScreen(props) {
    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation}/>
            <View style={styles.main}>
            <Button 
            title="Selectionner Artiste"
            type="solid"
            color = '#424D41'
            onPress={() => props.navigation.navigate('TattooArtist')}
     />
     </View>
        </View>
    )
}

export default SearchResultScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop : 50,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
        flex:3,  
        flexDirection : 'row',
        alignItems : 'center',
       justifyContent :'space-evenly',
    },
    });
    
