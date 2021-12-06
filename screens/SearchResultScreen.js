import React from 'react';
import { StyleSheet , Text, View, Button } from 'react-native';

function SearchResultScreen() {
    return (
        <View style={styles.container}>
           <Text>Result</Text> 
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
    
