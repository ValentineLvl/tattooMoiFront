import React from 'react';
import { StyleSheet , Text, View, Button } from 'react-native';

function SelectedTattooArtistScreen(props) {
    return (
        <View style={styles.container}>
            
            <Button 
            title="Prendre Rdv"
            type="solid"
            color = '#424D41'
            onPress={() => props.navigation.navigate('Formulaire')}
     />
        </View>
    )
}

export default SelectedTattooArtistScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });
    

    
