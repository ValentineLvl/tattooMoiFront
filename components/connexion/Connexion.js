import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Image, StyleSheet, Text, Pressable, Linking } from 'react-native'
import { Input } from 'react-native-elements';


export default function Connexion({navigation }) {

    /* State */

    const [mail, setMail] = useState("");
    const [mdp, setMdp] = useState("")



    /* async function sendDataTatoueur() {
        await axios({
            method: 'post',
            url: 'url_a_mettre',
            data: {},
        });
    } */

    function onPress() {
        console.log("Click")
    }

    function goToURL() {
        const url = "url"
        Linking.openURL(url);
    }

    function goInscription() {
        navigation.push('inscription',{"pageName":"inscription"})
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1, padding_bottom: 100, width: "100%", }}>

                <View style={styles.inside}>
                    <Image source={require("../../assets/img/logo_inscription.png")} style={styles.image} />
                    <View style={styles.inside}>
                        <Text style={styles.title}> Se connecter en tant que tatoueur </Text>
                        <Input
                            placeholder='Adresse email'
                            containerStyle={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'at' }}
                            onChangeText={value => setMail(value)}
                            underlineColorAndroid="transparent"
                        />
                        <Input
                            placeholder='Mot de passe'
                            leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                            containerStyle={styles.input}
                            onChangeText={value => setMdp(value)}
                            secureTextEntry={true}
                        />
                        <Text>Mot de passe oublié ?</Text>

                        <Pressable style={styles.button} onPress={onPress}>
                            <Text style={styles.text}>Se connecter</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.text1}>ou</Text>
                    <Pressable style={styles.button1} onPress={goInscription}>
                        <Text style={styles.text}>S'incrire</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1EFE5',
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    inside: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingTop: "20%",
        paddingBottom: "20%",
        width: "100%",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: "5%",
        fontWeight: "bold",
    },
    image: {
        resizeMode: "contain",
        height: "20%",
        width: "100%",
        marginLeft: "-35%",
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#424d41',
        marginTop: "10%",
        width: "50%",
    },

    button1: {
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