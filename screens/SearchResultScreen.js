import React from 'react';
import { StyleSheet , Text, View, Button } from 'react-native';

function SearchResultScreen(props) {
    return (
        <View style={styles.container}>
            
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
    });
    
