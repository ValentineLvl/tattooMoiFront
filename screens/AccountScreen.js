import React from 'react';
import { StyleSheet , Text, View } from 'react-native';

function AccountScreen() {
    return (
        <View style={styles.container}>
            <Text>Mon compte</Text>
        </View>
    )
}

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });
