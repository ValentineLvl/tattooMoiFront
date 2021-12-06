import React from 'react';
import { StyleSheet , Text, View, Button } from 'react-native';

function SearchScreen(props) {
    return (
        <View style={styles.container}>
            
            <Button 
            title="Rechercher"
            type="solid"
            color = '#424D41'
            onPress={() => props.navigation.navigate('Resultat')}
     />
        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });
    
