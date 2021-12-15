import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { connect } from 'react-redux';


function HeaderComponent(props) {
    //console.log('(store de props data user)', props.dataUser); 
    if (props.dataUser !== null) {
        return (
            <View style={styles.header}>
                <Image
                    source={require('../assets/tattoo-moi_1.png')}
                    style={{ width: 200, height: 80, marginRight: 50 }} />
                <Text style={styles.titre}>Salut {props.dataUser.firstName} !</Text>
            </View>
        )
    }
    else if (props.dataTattoo !== null) {
        return (
            <View style={styles.header}>
                <Image
                    source={require('../assets/tattoo-moi_1.png')}
                    style={{ width: 200, height: 80, marginRight: 50 }} />
                <Text style={styles.titre}>Salut {props.dataTattoo.firstName} !</Text>
            </View>
        )
    }
    else if (props.dataUser == null) {
        return (
            <View style={styles.header}>
                <Image
                    source={require('../assets/tattoo-moi_1.png')}
                    style={{ width: 200, height: 80, marginRight: 70 }} />
                <Button
                    title="Connexion"
                    titleStyle={{ fontSize: 14, color: '#424D41' }}
                    type="clear"
                    onPress={() => props.navigation.navigate('Connexion')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 2,
        maxHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        //paddingBottom: 20
    },
    titre: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#454543',
    },
});

function mapStateToProps(state) {
    return { dataUser: state.dataUser, dataTattoo: state.dataTattoo }
}

export default connect(
    mapStateToProps,
    null
)(HeaderComponent);
