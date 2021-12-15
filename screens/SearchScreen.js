import React, { useState, useEffect } from 'react';
import { Button, Overlay } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';

import HeaderComponent from './HeaderComponent';

import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
import LottieView from 'lottie-react-native';

import * as Location from 'expo-location';

const data = [
    { label: 'Noir', value: 'black&grey' },
    { label: 'Couleur', value: 'color' },
];

const tattooStyles = ['old school', 'new school', 'realism', 'japanese', 'tribal', 'fineline', 'dotwork', 'geometric', 'lettering'];

function SearchScreen(props) {

    const [userToken, setUserToken] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [selected, setSelected] = useState([]);
    const [tattooshopName, setTattooshopName] = useState('');
    const [tatoueurName, setTatoueurName] = useState('');
    const [tatoueurCity, setTatoueurCity] = useState('');

    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const [visible, setVisible] = useState(false);

    //A l'initialisation de searchScreen, si le user était connecté on remet ses infos dans le store avec une route get
    useEffect(() => {

        CheckIfLocationEnabled();
        // GetCurrentLocation();

        setDisplayCurrentAddress('Chercher autour de moi')

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

    const CheckIfLocationEnabled = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
    }


    // Position du l'utilisateur
    const GetCurrentLocation = async () => {

        setDisplayCurrentAddress('Chercher autour de moi', setVisible(true))

        let { coords } = await Location.getCurrentPositionAsync();

        props.saveUserPosition({ latitude: coords.latitude, longitude: coords.longitude })

        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            })

            setDisplayCurrentAddress(setVisible(false))

            response.map((item) => {

                let userAddress = `${item.street}, ${item.postalCode} ${item.city}`;

                setDisplayCurrentAddress(userAddress);

                setTatoueurCity(item.city)
            })
        }
        setSelected([])
    };


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
            body: JSON.stringify({ styleList: selected, firstName: tatoueurName, city: tatoueurCity, tattooShop: tattooshopName })
        });

        let response = await rawResponse.json()

        props.saveTatoueurInfos(response.searchResult)

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
        setTattooshopName('')

        if(tatoueurName.length === 0 && tattooshopName.length === 0 && selected.length === 0 && tatoueurCity !== 0){
            props.navigation.navigate('MapScreen')
            setDisplayCurrentAddress('Chercher autour de moi')
        } else {
            props.navigation.navigate('Resultat')
            setTatoueurCity('')
        }

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
                placeholder="Tatoueur"
            />
            <TextInput
                onChangeText={(value) => setTattooshopName(value)}
                value={tattooshopName}
                style={[styles.input, {marginTop: 10}]}
                placeholder="TattooShop"
            />
            <Overlay
                isVisible={visible}
                overlayStyle={{ backgroundColor: 'rgba(255, 255, 255, 0)', borderRadius: 100, width: 160, height: 160, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    style={{ width: 150 }}
                    source={require('../assets/loading-square.json')} autoPlay loop
                    imageAssetsFolder
                />
            </Overlay>

            <View style={styles.btnGroup}>

                {tattooStyleBtn}

            </View>

            {/* <Dropdown
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
            /> */}

            <View style={[styles.main, { marginTop: 20}]}>
                <TouchableOpacity
                    onPress={() => GetCurrentLocation()}
                    style={[styles.button, { backgroundColor: '#F1EFE5', width: 'auto', paddingRight: 20, paddingLeft: 20 }]}>
                    <Text style={{ color: '#424D41', fontSize: 15, textAlign: 'center' }}>
                        {displayCurrentAddress}
                    </Text>
                </TouchableOpacity>
            </View>

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
        height: 50,
        width: '80%',
        marginTop: 60,
        borderWidth: 0.5,
        padding: 10,
        textAlign: 'center',
        borderRadius: 50,
        fontSize: 17
    },
    // inputLocalisation: {
    //     height: 40,
    //     width: '100%',
    //     margin: 12,
    //     marginBottom: 30,
    //     borderWidth: 0.5,
    //     padding: 10,
    // },
    button: {
        backgroundColor: '#F1EFE5',
        borderColor: '#454543',
        borderWidth: 0.5,
        borderRadius: 100,
        padding: 10,
        marginBottom: 8,
        width: 110
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
        color: '#F1EFE5',
        fontSize: 17,
        fontWeight: 'bold'
    },
    selectedTextButton: {
        color: '#F1EFE5',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnGroup: {
        marginTop: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        flexWrap: 'wrap'
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
        addDataUser: (dataUser) => dispatch({ type: 'addDataUser', dataUser: dataUser }),
        saveUserPosition: (position) => dispatch({ type: 'saveUserPosition', position })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)