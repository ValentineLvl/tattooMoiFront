import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Text, Linking, Dimensions } from 'react-native'
import { Button } from 'react-native-elements';

import DevisItems from "./DevisItems";


export default function DevisAttente({ navigation }) {
    const data = [
        {
            nom: "Doe",
            prenom: "Jhon",
            zoneTattoo: "avant bras",
            style: "Old School",
            hauteur: 74.1,
            largeur: 72.1,
            description: "Je voudrais me faire tatouer l'avant bras, avec des couelurs monochrome",
            disponibilite: "Seulement le samedi",
            idee: {uri: 'https://www.megustattoo.fr/wp-content/uploads/2021/08/Image-8359.jpg'},
        },
        {
            nom: "Doe",
            prenom: "Jhon",
            zoneTattoo: "avant bras",
            style: "Old School",
            hauteur: 74.1,
            largeur: 72.1,
            description: "Je voudrais me faire tatouer l'avant bras, avec des couelurs monochrome",
            disponibilite: "Seulement le samedi",
            idee: {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiOa4dOuQpIwT58DvINgytiPc3iR85Kiukpw&usqp=CAU'},
        },
        {
            nom: "Doe",
            prenom: "Jhon",
            zoneTattoo: "avant bras",
            style: "Old School",
            hauteur: 74.1,
            largeur: 72.1,
            description: "Je voudrais me faire tatouer l'avant bras, avec des couelurs monochrome",
            disponibilite: "Seulement le samedi",
            idee: {uri: 'https://www.megustattoo.fr/wp-content/uploads/2021/08/Image-8359.jpg'},
        },
        {
            nom: "Doe",
            prenom: "Jhon",
            zoneTattoo: "avant bras",
            style: "Old School",
            hauteur: 74.1,
            largeur: 72.1,
            description: "Je voudrais me faire tatouer l'avant bras, avec des couelurs monochrome",
            disponibilite: "Seulement le samedi",
            idee: {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiq0ZM_eruPyPY1IqPSnzZ8HqQcgcYDyNMTg&usqp=CAU'},
        },
        {
            nom: "Doe",
            prenom: "Jhon",
            zoneTattoo: "avant bras",
            style: "Old School",
            hauteur: 74.1,
            largeur: 72.1,
            description: "Je voudrais me faire tatouer l'avant bras, avec des couelurs monochrome",
            disponibilite: "Seulement le samedi",
            idee: {uri: 'https://www.megustattoo.fr/wp-content/uploads/2021/08/Image-8359.jpg'},
        },
    ]

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
            <Text style={styles.title}>Mes RDV à confirmer</Text>
            <ScrollView>
                {/* Utilisez la fonction .map() pour faire tout les devis à confirmer */}
                {
                    data.map((rdv)=>{
                        return <DevisItems data={rdv} />
                    })
                }
            </ScrollView>
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