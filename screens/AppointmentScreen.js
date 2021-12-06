import React from 'react';
import { StyleSheet , Text, View } from 'react-native';

function AppointmentScreen() {
    return (
        <View style={styles.container}>
            <Text>Mes RDV</Text>
        </View>
    )
}

export default AppointmentScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });
