import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';

import HeaderComponent from './HeaderComponent';

import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Noir', value: 'black&grey' },
    { label: 'Couleur', value: 'color' },
];

const tattooStyles = ['old school', 'new school', 'realism', 'japanese', 'tribal', 'fineline', 'dotwork', 'geometric', 'lettering'];

function SearchScreen(props) {

    const [userToken, setUserToken] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [selected, setSelected] = useState([]);
    //const [tattooshopName, setTattooshopName] = useState('');
    const [tatoueurName, setTatoueurName] = useState('');

    const [styleArray, setStyleArray] = useState([]);

    //A l'initialisation de searchScreen, si le user était connecté on remet ses infos dans le store avec une route get
    useEffect(() => {

        AsyncStorage.getItem("dataUserToken", function (error, data) {

            if (data) {
                const findUser = async () => {
                    const reqFind = await fetch(`http://192.168.1.101:3000/client-data?token=${data}`)
                    const resultFind = await reqFind.json()

                    props.addDataUser(resultFind.client)
                }
                findUser();
                setUserToken(true);
            }
        });

    }, []);

    const handlePress = async (tattooStyle) => {
        selected.includes(tattooStyle)
            ?
            setSelected(selected.filter(s => s !== tattooStyle))
            :
            setSelected([...selected, tattooStyle]);
    }

    const onSearchStylePress = async () => {

        let rawResponse = await fetch('http://192.168.1.101:3000/search-tattoo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ styleList: selected, firstName: tatoueurName })
        });

        let response = await rawResponse.json()

        setStyleArray(response.searchResult)

        props.saveTatoueurInfos(response.searchResult)

        console.log('SEARCHRESULT', response.searchResult)

        if (response.searchResult.length === 0) {
            Alert.alert(
                "Sorry...",
                "Tatoueur non trouvé",
                [
                    { text: "OK", onPress: () => props.navigation.goBack() }
                ]
            );
        }
        
        setTatoueurName('');

        props.navigation.navigate('Resultat')

    }

    const tattooStyleBtn = tattooStyles.map((tattooStyle, i) => (

        <TouchableOpacity
            key={i}
            onPress={() => handlePress(tattooStyle)}
            style={[styles.button, { backgroundColor: selected.includes(tattooStyle) ? '#C2A77D' : '#F1EFE5' }]}
        >
            <Text style={[styles.textButton, { color: selected.includes(tattooStyle) ? '#F1EFE5' : '#C2A77D' }]}>
                {tattooStyle}
            </Text>
        </TouchableOpacity>
    ));

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation} />

            <TextInput
                onChangeText={(value) => setTatoueurName(value)}
                value={tatoueurName}
                style={styles.input}
                placeholder="Tatoueur, TattooShop"
            />
            <TextInput
                style={styles.inputLocalisation}
                placeholder="Localisation"
            />

            <View style={styles.btnGroup}>

                {tattooStyleBtn}

            </View>

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                containerStyle={{ backgroundColor: '#F1EFE5' }}
                activeColor={'#C2A77D'}
                maxHeight={110}
                labelField="label"
                valueField="value"
                placeholder="Couleur"
                value={dropdownValue}
                onChange={item => {
                    setDropdownValue(item.value);
                }}
            />

            <View style={styles.main}>
                <Button
                    title="Rechercher"
                    type="solid"
                    buttonStyle={{ backgroundColor: '#424D41', paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10 }}
                    onPress={() => onSearchStylePress()}
                />
            </View>
            <Button
                title="Vous êtes pro ? Cliquez ici"
                buttonStyle={{ backgroundColor: '#F1EFE5', padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 5 }}
                titleStyle={{ color: '#424D41', marginBottom: 10, fontSize: 15 }}
                type="solid"
                onPress={() => props.navigation.navigate('Connexion Tatoueur')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
        backgroundColor: '#F1EFE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 2,
        maxHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 30
    },
    main: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        marginTop: 30,
        borderWidth: 0.5,
        padding: 10,
    },
    inputLocalisation: {
        height: 40,
        width: '80%',
        margin: 12,
        marginBottom: 30,
        borderWidth: 0.5,
        padding: 10,
    },
    button: {
        backgroundColor: '#F1EFE5',
        borderColor: '#454543',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        width: 125,
    },
    textButton: {
        color: '#C2A77D',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    selectedButton: {
        backgroundColor: '#C2A77D',
        borderColor: '#454543',
        borderWidth: 1,
        padding: 8,
        width: 120,
        color: '#F1EFE5', fontSize: 17, fontWeight: 'bold'
    },
    selectedTextButton: {
        color: '#F1EFE5',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnGroup: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    dropdown: {
        width: '80%',
        margin: 16,
        marginTop: 60,
        height: 50,
        borderStyle: 'solid',
        borderRadius: 10,
        borderColor: '#454543',
        borderWidth: 0.5,
        backgroundColor: '#F1EFE5'
    },
    placeholderStyle: {
        fontSize: 15,
        textAlign: 'center',
    },
    selectedTextStyle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#454543'
    },
});

function mapStateToProps(state) {
    return { dataUser: state.dataUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveTatoueurInfos: (infos) => dispatch({ type: 'saveTatoueurInfos', infos: infos }),
        addDataUser: (dataUser) => dispatch({ type: 'addDataUser', dataUser: dataUser })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)