import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Image, StyleSheet, Text, Pressable, } from 'react-native'
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { block } from 'react-native-reanimated';

/* import axios from 'axios'; */

export default function Inscription() {

    /* State */

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

    const [open, setOpen] = useState(false);
    const [civilite, setCivilite] = useState(null);
    const [items, setItems] = useState([
        { label: 'Madame', value: 'madame' },
        { label: 'Monsieur', value: 'monsieur' },
        {
            label: 'label', // required
            value: 'value', // required
            icon: 'icon',
            parent: 'parent',
            selectable: 'selectable',
            disabled: 'disabled',
            testID: 'testID',
            containerStyle: 'containerStyle',
            labelStyle: 'labelStyle'
        },
    ]);

    const [style, setStyle] = useState("");

    const [numTelephone, setNumTelephone] = useState(0);
    const [nomEntreprise, setNomEntreprise] = useState("");
    const [siret, setSiret] = useState("")
    const [adresse, setAdresse] = useState("");
    const [codePostal, setCodePostal] = useState(0)
    const [ville, setVille] = useState("")

    const [mail, setMail] = useState("");
    const [mdp, setMdp] = useState("")
    const [confirmeMdp, setConfirmMdp] = useState("")



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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1, padding_bottom: 100, width: "100%", }}>
                <View style={styles.inside}>
                    <Image source={require("../../assets/img/logo_inscription.png")} style={styles.image} />
                    <Text style={styles.title}>S'inscrire en tant que tatoueur</Text>
                    {/* Information du tatoueur */}
                    <DropDownPicker
                        placeholder="Civilité"
                        style={styles.nom}
                        open={open}
                        value={civilite}
                        items={items}
                        setOpen={setOpen}
                        setValue={setCivilite}
                        setItems={setItems}
                    />

                    <Input
                        placeholder='Nom'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        containerStyle={styles.input}
                        onChangeText={value => setNom(value)}
                    />

                    <Input
                        placeholder='Prenom'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        containerStyle={styles.input}
                        onChangeText={value => setPrenom(value)}
                    />
                    <Input
                        placeholder='Adresse email'
                        containerStyle={styles.input}
                        leftIcon={{ type: 'font-awesome', name: 'at' }}
                        onChangeText={value => setMail(value)}
                    />
                    <Input
                        placeholder='Mot de passe'
                        leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                        containerStyle={styles.input}
                        onChangeText={value => setMdp(value)}
                        secureTextEntry={true}
                    />

                    <Input
                        placeholder="Confirmer le mot de passe"
                        leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                        containerStyle={styles.input}
                        onChangeText={value => setConfirmMdp(value)}
                        secureTextEntry={true}
                    />

                    <Input
                        placeholder="SIRET"
                        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                        containerStyle={styles.input}
                        onChangeText={value => setSiret(value)}
                    />

                    <Input
                        placeholder="Style"
                        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                        containerStyle={styles.input}
                        onChangeText={value => setStyle(value)}
                    />

                    <Input
                        placeholder='Numéro de téléphone entreprise'
                        leftIcon={{ type: 'font-awesome', name: 'phone' }}
                        containerStyle={styles.input}
                        onChangeText={value => setNumTelephone(value)}
                    />

                    <Input
                        placeholder="Adresse postale"
                        leftIcon={{ type: 'font-awesome', name: 'map' }}
                        containerStyle={styles.input}
                        onChangeText={value => setAdresse(value)}
                    />

                    <Input
                        placeholder="Code postal"
                        leftIcon={{ type: 'font-awesome', name: 'list-ol' }}
                        containerStyle={styles.input}
                        onChangeText={value => setCodePostal(value)}
                    />

                    <Input
                        placeholder="Ville"
                        leftIcon={{ type: 'font-awesome', name: 'building' }}
                        containerStyle={styles.input}
                        onChangeText={value => setVille(value)}
                    />

                    <Pressable style={styles.button} onPress={onPress}>
                        <Text style={styles.text}>S'inscrire</Text>
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
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: "5%",
        fontWeight: "bold",
    },
    image: {
        resizeMode: "contain",
        height: "10%",
        width: "50%",
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