import React, { useState } from 'react';

import { connect } from 'react-redux';

import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Noir', value: 'noir' },
    { label: 'Couleur', value: 'couleur' },
];

const tattooStyles = ['old school', 'new school', 'realism', 'japanese', 'tribal', 'fineline', 'dotwork', 'geometric', 'lettering'];

function SearchScreen(props) {

    const [dropdownValue, setDropdownValue] = useState(null);

    const [selected, setSelected] = useState([]);

    const handlePress = async (tattooStyle) => {
        selected.includes(tattooStyle)
            ?
            setSelected(selected.filter(s => s !== tattooStyle))
            :
            setSelected([...selected, tattooStyle]);

        let rawResponse = await fetch(`http://192.168.1.101:3000/search-tattoo?styleList=${tattooStyle}`)
        let response = await rawResponse.json()

        console.log(response.result)

        props.saveTatoueurInfos(response.searchResult)
    }

    const tmp = tattooStyles.map((tattooStyle, i) => (

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
            <View style={styles.header}>
                <Image
                    source={require('../assets/tattoo-moi_1.png')}
                    style={{ width: 200, height: 80, marginRight: 70 }} />
                <Button
                    title="Connexion"
                    buttonStyle={{ backgroundColor: '#F1EFE5', paddingRight: 5, paddingLeft: 5, marginRight: 10, marginTop: 20 }}
                    titleStyle={{ color: '#424D41', marginBottom: 10, fontSize: 15 }}
                    type="solid"
                />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Tatoueur, TattooShop"
            />
            <TextInput
                style={styles.inputLocalisation}
                placeholder="Localisation"
            />

            <View style={styles.btnGroup}>

                {tmp}

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
                    onPress={() => props.navigation.navigate('Resultat')}
                />
            </View>
            <Button
                title="Vous êtes pro ? Cliquez ici"
                buttonStyle={{ backgroundColor: '#F1EFE5', padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 5 }}
                titleStyle={{ color: '#424D41', marginBottom: 10, fontSize: 15 }}
                type="solid"
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
        width: 110,
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

const mapDispatchToProps = (dispatch) => {
    return {
        saveTatoueurInfos: (infos) => dispatch({ type: 'saveTatoueurInfos', infos })
    }
}
export default connect(null, mapDispatchToProps)(SearchScreen)