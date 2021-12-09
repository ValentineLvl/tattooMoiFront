import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Image, StyleSheet, Text, Pressable, Linking, Dimensions } from 'react-native'
import { Button, Icon } from 'react-native-elements';


export default function DevisAttente(props, { navigation }) {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

    const [zoneTattoo, setZoneTatoo] = useState("");
    const [style, setStyle] = useState("");

    const [hauteur, setHauteur] = useState(0.0);
    const [largeur, setLargeur] = useState(0.0);

    const [description, setDescription] = useState("");
    const [disponibilite, setDisponibilite] = useState("");
    const [idee, setIdee] = useState("../../assets/img/logo_inscription.png")

    const [popUp, setPopUp] = useState(false)
    const [popUpR, setPopUpR] = useState(false)

    useEffect(() => {
        const data = props.data;
        console.log(data.idee)
        setNom(data.nom)
        setPrenom(data.prenom)
        setZoneTatoo(data.zoneTattoo)
        setStyle(data.style)
        setHauteur(data.hauteur)
        setLargeur(data.largeur)
        setDescription(data.description)
        setDisponibilite(data.disponibilite)
        setIdee(data.idee)
    })

    function _valider() {
        console.log("Valider")
        // algo pour valider un RDV 
    }

    function _refuser() {
        console.log("Refuser")
        // algo pour refuser un RDV 
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title1}> Rendez-vous avec {prenom + " " + nom} :</Text>
            <View style={styles.align}>
                <View style={styles.boxLeft}>
                    <Text style={styles.title2}>Zone à tatouer :</Text>
                    <Text>{zoneTattoo}</Text>
                </View>
                <View>
                    <Text style={styles.title2}>Style :</Text>
                    <Text>{style}</Text>
                </View>
            </View>

            <View style={styles.align}>
                <View style={styles.boxLeft}>
                    <Text style={styles.title2}>Hauteur :</Text>
                    <Text>{hauteur}</Text>
                </View>
                <View>
                    <Text style={styles.title2}>Largeur :</Text>
                    <Text>{largeur}</Text>
                </View>
            </View>

            <Text style={styles.title2}>Description du projet :</Text>
            <Text>{description}</Text>

            <Text style={styles.title2}>Disponibilité :</Text>
            <Text>{disponibilite}</Text>

            <Text style={styles.title2}>Idée du projet :</Text>
            <Image source={idee} style={styles.img} />

            <View style={styles.align}>
                <View style={{ marginRight: "20%", }}>
                    <Icon
                        type="font-awesome"
                        name="check"
                        color="green"
                        onPress={() => { setPopUp(true) }}
                    />
                </View>
                <Icon
                    type="font-awesome"
                    name="times"
                    color="red"
                    onPress={() => { setPopUpR(true) }}
                />
            </View>
            {popUp ?
                <View visible={false} style={styles.valide}>
                    <View style={styles.popupContain}>
                        <Text style={styles.title2}>Confirmer ce rendez-vous ?</Text>
                        <Text>{prenom + " " + nom}</Text>
                        <View style={styles.align}>
                            <View style={{ marginRight: "20%", }}>
                                <Icon
                                    type="font-awesome"
                                    name="check"
                                    color="green"
                                    onPress={_valider}
                                />
                            </View>
                            <Icon
                                type="font-awesome"
                                name="times"
                                color="red"
                                onPress={() => { setPopUp(false) }}
                            />
                        </View>
                    </View>
                </View>
                : null}

            {popUpR ?
                <View visible={false} style={styles.valide}>
                    <View style={styles.popupContain}>
                        <Text style={styles.title2}>Refuser ce rendez-vous ?</Text>
                        <Text>{prenom + " " + nom}</Text>
                        <View style={styles.align}>
                            <View style={{ marginRight: "20%", }}>
                                <Icon
                                    type="font-awesome"
                                    name="check"
                                    color="green"
                                    onPress={_refuser}
                                />
                            </View>
                            <Icon
                                type="font-awesome"
                                name="times"
                                color="red"
                                onPress={() => { setPopUpR(false) }}
                            />
                        </View>
                    </View>
                </View>
                : null}
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: "25em",
        height: "25.5em",
        marginBottom: "6em",
        borderWidth: 2,
    },
    align: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: "5%",
        width: "100%",
    },
    boxLeft: {
        marginRight: '30%',
    },
    title1: {
        fontSize: "1.5em",
        fontWeight: "bold",
    },
    title2: {
        fontSize: "1em",
        fontWeight: "bold",
    },
    img: {
        height: 200,
        width: 200,
    },
    valide: {
        zIndex: 99999,
        width: Dimensions.get('window').width,
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: 'center',
    },
    popupContain: {
        alignItems: 'center',
        marginTop: "45%",
        padding: "5%",
        width: "80%",
        height: "25%",
        backgroundColor: "#F1EFE5",
        borderRadius: 5,
    },
});