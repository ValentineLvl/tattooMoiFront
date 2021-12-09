import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Image, StyleSheet, Text, Pressable, } from 'react-native'
import { Input, Avatar, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { set } from 'react-native-reanimated';
import DropDownPicker from 'react-native-dropdown-picker';
import Icone from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

/* import axios from 'axios'; */

export default function Inscription() {

    /* State */
    const [avatar, setAvatar] = useState(null)

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

    const [style, setStyle] = useState("");

    const [numTelephone, setNumTelephone] = useState(0);
    const [nomEntreprise, setNomEntreprise] = useState("");
    const [siret, setSiret] = useState("")
    const [adresse, setAdresse] = useState("");
    const [codePostal, setCodePostal] = useState(0)
    const [ville, setVille] = useState("")

    const [mail, setMail] = useState("");
    const [siteWeb, setSiteWeb] = useState("")
    const [instagram, setInstagram] = useState("")

    const [mesStyles, setMesStyles] = useState([])
    const [gal1, setGal1] = useState(null)
    const [gal2, setGal2] = useState(null)
    const [gal3, setGal3] = useState(null)

    const items = [
        // this is the parent or 'item'
        {
            name: 'Styles',
            id: 0,
            // these are the children or 'sub items'
            children: [
                {
                    name: 'Old School',
                    id: 'old_school',
                },
                {
                    name: 'New School',
                    id: 'new_school',
                },
                {
                    name: 'Realism',
                    id: 'realism',
                },
                {
                    name: 'Japonais',
                    id: "japonais",
                },
                {
                    name: 'Tribal',
                    id: "trbail",
                },
                {
                    name: 'Fineline',
                    id: 'fineline',
                },
                {
                    name: 'Dotwork',
                    id: "dotwork",
                },
                {
                    name: 'Geometric',
                    id: "geometric",
                },
                {
                    name: 'Lettering',
                    id: "lettering",
                },
            ],
        },
    ];

    useEffect(() => {
        //_getData //Mettre les valeurs dans les states
        console.log(mesStyles)
    }, [setMesStyles])

    let openImagePickerAsync = async () => { // Prendre l'image pour l'avatar
        console.log("PRESS");
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        setAvatar(pickerResult.uri)
        console.log(pickerResult.uri);
    }

    let galPicker = async (number) => { // Prendre l'image pour la galerie
        console.log("PRESS");
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        switch (number) {
            case 1:
                setGal1(pickerResult.uri)
                break;
            case 2:
                setGal2(pickerResult.uri)
                break;
            case 3:
                setGal3(pickerResult.uri)
                break;
        }
    }

    async function sendDataTatoueur() { // Envoyer les données modifiées
        await axios({
            method: 'post',
            url: 'url_a_mettre',
            data: {
                avatar,
                nom,
                prenom,
                style,
                numTelephone,
                nomEntreprise,
                siret,
                adresse,
                codePostal,
                ville,
                mail,
                siteWeb,
                instagram,
                mesStyles,
                gal1,
                gal2,
                gal3,
            },
        });
    }

    async function _getData(userV, passwordV) { // Récupérer les données
        const url = '' //mettre le lien URL de l'API
        return fetch(url, {
            method: 'GET', // mettre la méthode du requête
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => { // Mettre les valeurs dans les states
                setAvatar(response.data.avatar)
                setNom(response.data.nom)
                setPrenom(response.data.prenom)
                setStyle(response.data.style)
                setNumTelephone(response.data.numTelephone)
                setNomEntreprise(response.data.nomEntreprise)
                setSiret(response.data.siret)
                setAdresse(response.data.adresse)
                setCodePostal(response.data.codePostal)
                setVille(response.data.ville)
                setMail(response.data.mail)
                setSiteWeb(response.data.siteWeb)
                setInstagram(response.data.instagram)
                setMesStyles(response.data.mesStyles)
                setGal1(response.data.gal1)
                setGal2(response.data.gal2)
                setGal3(response.data.gal3)
            })
            .catch((error) => console.error(error))
    }

    function onPress() {// Fonction lors du click
        console.log("Click")
        sendDataTatoueur()
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1, padding_bottom: 100, width: "100%", }}>
                <View style={styles.inside}>
                    <Image source={require("../../assets/img/logo_inscription.png")} style={styles.image} />
                    <Text style={styles.title}>Mes informations</Text>
                    {/* Information du tatoueur */}
                    <Avatar
                        size="xlarge"
                        icon={{ name: 'user', type: 'font-awesome' }}
                        source={{
                            uri:
                                avatar,
                        }}
                        onPress={openImagePickerAsync}
                    >
                    </Avatar>
                    <Pressable style={styles.button} onPress={openImagePickerAsync}>
                        <Icon
                            color="white"
                            name='upload'
                            type='font-awesome' />
                        <Text style={styles.text}>Télécharger une image</Text>
                    </Pressable>

                    <View style={{ borderBottomColor: "black", borderBottomWidth: 1.5, width: "60%", marginTop: "5%", }}></View>

                    <Text style={{ marginTop: "5%", }}>Nom :</Text>
                    <Input
                        placeholder='Nom'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        containerStyle={styles.input}
                        onChangeText={value => setNom(value)}
                    />

                    <Text>Prénom :</Text>
                    <Input
                        placeholder='Prenom'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        containerStyle={styles.input}
                        onChangeText={value => setPrenom(value)}
                    />

                    <Text>Adresse mail : </Text>
                    <Input
                        placeholder='Adresse email'
                        containerStyle={styles.input}
                        leftIcon={{ type: 'font-awesome', name: 'at' }}
                        onChangeText={value => setMail(value)}
                    />

                    <Text>SIRET : </Text>
                    <Input
                        placeholder="SIRET"
                        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                        containerStyle={styles.input}
                        onChangeText={value => setSiret(value)}
                    />

                    <Text>Mes styles: </Text>

                    <SectionedMultiSelect
                        items={items}
                        IconRenderer={Icon}
                        uniqueKey="id"
                        subKey="children"
                        selectText="Choisir mes styles"
                        showDropDowns={true}
                        readOnlyHeadings={true}
                        onSelectedItemsChange={(items) => { setMesStyles(items); console.log(items) }}
                        selectedItems={mesStyles}
                        styles={{
                            selectedItemText: {
                                color: 'red',
                            },
                            selectedSubItemText: {
                                color: 'red',
                            },
                        }}
                        tagBorderColor="#000000"
                        tagTextColor="#000000"
                    />

                    <Text>Numéro de téléphone : </Text>
                    <Input
                        placeholder='Numéro de téléphone entreprise'
                        leftIcon={{ type: 'font-awesome', name: 'phone' }}
                        containerStyle={styles.input}
                        onChangeText={value => setNumTelephone(value)}
                    />

                    <Text>Adresse postale : </Text>
                    <Input
                        placeholder="Adresse postale"
                        leftIcon={{ type: 'font-awesome', name: 'map' }}
                        containerStyle={styles.input}
                        onChangeText={value => setAdresse(value)}
                    />
                    <Text>Code postal : </Text>
                    <Input
                        placeholder="Code postal"
                        leftIcon={{ type: 'font-awesome', name: 'list-ol' }}
                        containerStyle={styles.input}
                        onChangeText={value => setCodePostal(value)}
                    />

                    <Text>Ville : </Text>
                    <Input
                        placeholder="Ville"
                        leftIcon={{ type: 'font-awesome', name: 'building' }}
                        containerStyle={styles.input}
                        onChangeText={value => setVille(value)}
                    />

                    <Text>Site web : </Text>
                    <Input
                        placeholder="Site web"
                        leftIcon={{ type: 'Foundation', name: 'web' }}
                        containerStyle={styles.input}
                        onChangeText={value => setSiteWeb(value)}
                    />

                    <Text>Mon compte instagram : </Text>
                    <Input
                        placeholder="Lien instagram"
                        leftIcon={{ type: 'font-awesome', name: 'instagram' }}
                        containerStyle={styles.input}
                        onChangeText={value => setInstagram(value)}
                    />

                    <Text>Ma galerie photos : </Text>
                    <View style={styles.align}>
                        <Avatar
                            size="large"
                            icon={{ name: 'upload', type: 'font-awesome' }}
                            containerStyle={styles.space}
                            source={{
                                uri:
                                    gal1,
                            }}
                            onPress={() => { galPicker(1) }}
                        >
                        </Avatar>
                        <Avatar
                            size="large"
                            containerStyle={styles.space}
                            icon={{ name: 'upload', type: 'font-awesome' }}
                            source={{
                                uri:
                                    gal2,
                            }}
                            onPress={() => { galPicker(2) }}
                        >
                        </Avatar>
                        <Avatar
                            size="large"
                            icon={{ name: 'upload', type: 'font-awesome' }}
                            containerStyle={styles.space}
                            source={{
                                uri:
                                    gal3,
                            }}
                            onPress={() => { galPicker(3) }}
                        >
                        </Avatar>
                    </View>

                    <Pressable style={styles.button} onPress={onPress}>
                        <Text style={styles.text}>Valider les modifications</Text>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: "100%",
        marginTop: "5%",
        marginBottom: "5%",
        alignItems: 'center',
        justifyContent: "center",
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
        width: "80%",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    space: {
        marginRight: "1%",
    }
});