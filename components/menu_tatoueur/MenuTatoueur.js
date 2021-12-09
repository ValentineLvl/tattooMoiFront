import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Image, StyleSheet, Text, Pressable, Linking } from 'react-native'
import { Button } from 'react-native-elements';


export default function MenuTatoueur({ navigation }) {

    function onPress() {
        console.log("Click")
    }

    function goToURL() {
        const url = "url"
        Linking.openURL(url);
    }

    function goInscription() {
        navigation.push('inscription', { "pageName": "inscription" })
    }


    return (
        <View style={styles.container}>
            <Image source={require("../../assets/img/logo_inscription.png")} style={styles.image} />
            <Text style={styles.title}>Mon compte tatoueur</Text>
            <Button
                icon={{
                    name: "info",
                    size: 15,
                    color: "white"
                }}
                title="Mes informations"
                containerStyle={styles.button}
                buttonStyle={{
                    backgroundColor: '#C2A77D'
                }}
            />
            <Button
                icon={{
                    name: "calendar",
                    type: 'font-awesome',
                    size: 15,
                    color: "white"
                }}
                title="Mes rendez-vous"
                containerStyle={styles.button1}
                buttonStyle={{
                    backgroundColor: '#C2A77D'
                }}
            />
            <Button
                icon={{
                    name: "newspaper-o",
                    type: 'font-awesome',
                    size: 15,
                    color: "white",
                }}
                title="Mes devis à confirmer"
                containerStyle={styles.button1}
                buttonStyle={{
                    backgroundColor: '#C2A77D'
                }}
            />
            <Button
                icon={{
                    name: "history",
                    type: "Fontisto",
                    size: 15,
                    color: "white"
                }}
                title="Historique des devis"
                containerStyle={styles.button1}
                buttonStyle={{
                    backgroundColor: '#C2A77D'
                }}
            />

            <Button
                icon={{
                    name: "sign-out",
                    type: "font-awesome",
                    size: 15,
                    color: "white"
                }}
                title="Se déconnecter"
                containerStyle={styles.button_disconnect}
                buttonStyle={{
                    backgroundColor: '#9E3030'
                }}
            />
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1EFE5',
        flex: 1,
        alignItems: 'center',
        width: "100%",
        height: "100%",
        top: 0,
    },
    inside: {
        flex: 1,
        paddingTop: "20%",
        paddingBottom: "20%",
        width: "100%",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginTop: "5%",
        fontWeight: "bold",
    },
    image: {
        resizeMode: "contain",
        height: "10%",
        width: "100%",
        marginLeft: "-50%",
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: "80%",
        marginBottom: "5%",
        margin: "2%",
        marginLeft: "0%",
    },
    button: {
        marginTop: '10%',
        width: '80%',
        backgroundColor: '#C2A77D',
        color: '#454543',
        paddingLeft: "-50%",
    },
    button1: {
        marginTop: '8%',
        width: '80%',
    },
    button_disconnect: {
        marginTop: '8%',
        width: '50%',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    text1: {
        marginTop: '-15%',
        marginBottom: '5%',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
});