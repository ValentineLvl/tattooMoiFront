import React, { useState } from 'react';

import { connect } from 'react-redux';

import { StyleSheet, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Noir', value: 'noir' },
    { label: 'Couleur', value: 'couleur' },
];
function SearchScreen(props) {

    const [dropdownValue, setDropdownValue] = useState(null);

    const onClickBtn = async (value) => {
        let rawResponse = await fetch(`http://192.168.1.101:3000/search-tattoo?styleList=${value}`)
        let response = await rawResponse.json()

        props.saveTatoueurInfos(response)
    }

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
                <Button
                    title="Old School"
                    type="outline"
                    buttonStyle={styles.button}
                    titleStyle={{ color: '#C2A77D', fontSize: 17, fontWeight: 'bold' }}
                    onPress={() => onClickBtn('old school')}
                />
                <Button
                    title="New School"
                    type="outline"
                    buttonStyle={styles.selectedButton}
                    titleStyle={{ color: '#F1EFE5', fontSize: 17, fontWeight: 'bold' }}
                    onPress={() => onClickBtn('new school')}
                />
                <Button
                    title="Realism"
                    type="outline"
                    buttonStyle={styles.button}
                    titleStyle={{ color: '#C2A77D', fontSize: 17, fontWeight: 'bold' }}
                    onPress={() => onClickBtn('realism')}
                />
            </View>

            <View style={styles.btnGroup}>
                <Button
                    title="Japonais"
                    type="outline"
                    buttonStyle={styles.button}
                    titleStyle={{ color: '#C2A77D', fontSize: 17, fontWeight: 'bold' }}
                    onPress={() => onClickBtn('japanese')}
                />
                <Button
                    title="Tribal"
                    type="outline"
                    buttonStyle={styles.button}
                    titleStyle={{ color: '#C2A77D', fontSize: 17, fontWeight: 'bold' }}
                    onPress={() => onClickBtn('tribal')}
                />
                <Button
                    title="Fineline"
                    type="outline"
                    buttonStyle={styles.selectedButton}
                    titleStyle={{ color: '#F1EFE5', fontSize: 17, fontWeight: 'bold' }}
                    onPress={() => onClickBtn('fineline')}
                />
            </View>

            <View style={styles.btnGroup}>
                <Button
                    title="Dotwork"
                    type="outline"
                    buttonStyle={styles.button}
                    titleStyle={{ color: '#C2A77D', fontSize: 17, fontWeight: 'bold' }}
                    onPress={() => onClickBtn('dotwork')}
                />
                <Button
                    title="Geometric"
                    type="outline"
                    buttonStyle={styles.button}
                    titleStyle={{ color: '#C2A77D', fontSize: 17, fontWeight: 'bold' }}
                    onPress={() => onClickBtn('geometric')}
                />
                <Button
                    title="Lettering"
                    type="outline"
                    buttonStyle={styles.selectedButton}
                    titleStyle={{ color: '#F1EFE5', fontSize: 17, fontWeight: 'bold' }}
                    onPress={() => onClickBtn('lettering')}
                />
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
        borderWidth: 1,
        padding: 8,
        width: 120
    },
    selectedButton: {
        backgroundColor: '#C2A77D',
        borderColor: '#454543',
        borderWidth: 1,
        padding: 8,
        width: 120
    },
    btnGroup: {
        marginTop: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
        saveTatoueurInfos: (infos) => dispatch({ type: 'saveTatoueurInfos', infos } )
    }
}
export default connect(null, mapDispatchToProps)(SearchScreen)