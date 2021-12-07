import React from 'react';
import { StyleSheet , Text, View } from 'react-native';
import HeaderComponent from './HeaderComponent';

function AppointmentScreen(props) {
    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation}/>
        </View>
    )
}

export default AppointmentScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    paddingTop : 50,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });
