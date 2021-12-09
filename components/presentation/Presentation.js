import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Image, StyleSheet, Text, Pressable, } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import FadeIn from '../animates/FadeIn';

export default function Presentation({navigation }) {
    const navigationRef = useNavigationContainerRef();

    useEffect(()=>{
        setTimeout(() => {
            navigation.push('connexion',{"pageName":"connexion"})
          }, 3000);
    })

    return (
            <View style={styles.container}>
                 <FadeIn>
                    <Image source={require("../../assets/img/logo.png")} style={styles.image} />
                </FadeIn>
            </View>

    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#424D41',
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: "5%",
        fontWeight: "bold",
    },
    image: {
        resizeMode: "contain",
        width: "100%",
        top: '25%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: "80%",
        marginBottom: "5%",
        margin: "2%",
        marginLeft: "2%",
    },
    align: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    nom: {
        width: "35%",
        borderWidth: 1,
        borderColor: 'black',
        margin: "2%",
        marginLeft: "10%",
        backgroundColor: '#F1EFE5',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#424d41',
        width: "50%",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});