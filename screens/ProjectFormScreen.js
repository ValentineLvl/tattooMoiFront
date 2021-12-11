import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import HeaderComponent from './HeaderComponent';
import { connect } from 'react-redux'


const title = [
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Mme.', value: 'Mme.' },
    { label: 'NC', value: 'NC' },
];

const style = [
    { label: 'Old School', value: 'Old School' },
    { label: 'New School', value: 'New School' },
    { label: 'Realism', value: 'Realism' },
    { label: 'Japonais', value: 'Japonais' },
    { label: 'Tribal', value: 'Tribal' },
    { label: 'Fineline', value: 'Fineline' },
    { label: 'Dotwork', value: 'Dotwork' },
    { label: 'Geometric', value: 'Geometric' },
    { label: 'Lettering', value: 'Lettering' },
]

const schedule = [
    { label: 'En soirée', value: 'En soirée' },
    { label: 'En journée', value: 'En journée' },
    { label: 'Les weekends', value: 'Les weekends' },
    { label: 'Peu importe', value: 'Peu importe' },

];


function ProjectFormScreen(props) {

    const [form, setForm] = useState({});

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [tattooZone, setTattooZone] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [titleValue, setTitleValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [styleValue, setStyleValue] = useState(null);
    const [scheduleValue, setScheduleValue] = useState(null);
    const [tempUrl, setTempUrl] = useState("");
    const [request, setRequest] = useState("");

    //Etat de l'overlay
    const [visible, setVisible] = useState(false);

    let openImagePickerAsync = async () => {
        setVisible(!visible)
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        //console.log(pickerResult);
        var data = new FormData();
        data.append('avatar', {
            uri: pickerResult.uri,
            type: 'image/jpeg',
            name: 'avatar.jpg',
        });
        var rawResponse = await fetch('http://192.168.0.38:3000/upload', {
            method: 'POST',
            body: data
        });
        var response = await rawResponse.json();
        //   props.onSnap(response.url);
        setTempUrl(response.url);
        //console.log("response", response)
        if (response) {
        setVisible(false)}
    }

    async function handleClickAddForm() {
        {
            console.log("activation de la fonction")

            const data = await fetch('http://192.168.0.38:3000/project-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `tattooIdFromFront=${props.saveTatoueurInfos[0][0][0]._id}&token=${props.dataUser.token}&userProjectImgFromFront=${tempUrl}&userStyleFromFront=${styleValue}&userDisponibilityFromFront=${scheduleValue}&userGenderFromFront=${titleValue}&userLastNameFromFront=${lastName}&userFirstNameFromFront=${firstName}&userEmailFromFront=${email}&userPhoneNumberFromFront=${phone}&userAddressFromFront=${address}&userPostalCodeFromFront=${postalCode}&userCityFromFront=${city}&usertattooZoneFromFront=${tattooZone}&userWidthFromFront=${width}&userHeightFromFront=${height}&userDescriptionFromFront=${description}&userRequestFromFront=${request}`
            })

            const body = await data.json()
            console.log("c la", props.saveTatoueurInfos[0][0][0]._id)
            if (body.result == true) {
                props.addForm(body.projectFormSave)
                props.navigation.navigate('Mes demandes')
            }
            console.log(tempUrl);
            setTempUrl("")
        }
    };


    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation} />
            <ScrollView style={styles.form}>
                <SafeAreaView >
                    {(props.dataUser == null) ? <>
                        <View style={styles.smallForm} >
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={title}
                                containerStyle={{ backgroundColor: '#F1EFE5', marginTop: -30 }}
                                activeColor={'#C2A77D'}
                                maxHeight={100}
                                labelField="label"
                                valueField="value"
                                placeholder='Civilité'
                                value={titleValue}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setTitleValue(item.value);
                                    setIsFocus(false);
                                }}
                            />

                            <TextInput
                                style={styles.smallInput}
                                onChangeText={setLastName}
                                value={lastName}
                                placeholder="Nom"
                            />
                        </View>

                        <TextInput
                            style={styles.input}
                            onChangeText={setFirstName}
                            value={firstName}
                            placeholder="Prénom"

                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Adresse email"

                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPhone}
                            value={phone}
                            placeholder="Numéro de téléphone"

                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setAddress}
                            value={address}
                            placeholder="Adresse postale"

                        />

                        <View style={styles.smallForm}>
                            <TextInput
                                style={styles.smallInput}
                                onChangeText={setPostalCode}
                                value={postalCode}
                                placeholder="Code postal"

                            />
                            <TextInput
                                style={styles.smallInput}
                                onChangeText={setCity}
                                value={city}
                                placeholder="Ville"

                            />
                        </View>
                    </>
                        : null}

                    <TextInput
                        style={styles.input}
                        onChangeText={setRequest}
                        value={request}
                        placeholder="Objet de la demande"

                    />
                    <View style={styles.smallForm}   >
                        <Dropdown
                            style={styles.smallInput}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={style}
                            containerStyle={{ backgroundColor: '#F1EFE5', marginTop: -30 }}
                            activeColor={'#C2A77D'}
                            search
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder='Style'
                            searchPlaceholder="Chercher..."
                            value={styleValue}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setStyleValue(item.value);
                                setIsFocus(false);
                            }}

                        />

                        <TextInput
                            style={styles.smallInput}
                            onChangeText={setTattooZone}
                            value={tattooZone}
                            placeholder="Zone à tatouer "

                        />
                    </View>
                    <View style={styles.smallForm}   >
                        <TextInput
                            style={styles.smallInput}
                            onChangeText={setWidth}
                            value={width}
                            placeholder="Largeur (cm) "

                        />
                        <TextInput
                            style={styles.smallInput}
                            onChangeText={setHeight}
                            value={height}
                            placeholder="Longueur (cm)"

                        />
                    </View>
                    <Dropdown
                        style={styles.input}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={schedule}
                        containerStyle={{ backgroundColor: '#F1EFE5', marginBottom: 40, marginTop: -30 }}
                        activeColor={'#C2A77D'}
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder='Disponibilité'
                        value={scheduleValue}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setScheduleValue(item.value);
                            setIsFocus(false);
                        }}

                    />


                    <TextInput
                        style={styles.descriptionInput}
                        onChangeText={setDescription}
                        value={description}
                        placeholder="Description du projet"
                        multiline
                        numberOfLines={5}
                        maxLength={300}

                    />
                    <View style={{ flex: 1, flexdirection: "row", alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <TouchableOpacity onPress={openImagePickerAsync} >
                            <Text > <MaterialIcons
                                name="save-alt"
                                size={20}
                                color="#C2A77D" />
                                Télécharger une image </Text>
                        </TouchableOpacity>
                    </View>

                    <Overlay isVisible={visible} overlayStyle={{backgroundColor:'#F1EFE5'}}>
                        <Text>Chargement...</Text>
                    </Overlay>

                    <View style={{ flex: 1, alignSelf: 'center', marginTop: 20 }} >
                        <Button
                            title="Valider"
                            type="solid"
                            padding="30"
                            color='#424D41'

                            onPress={() => handleClickAddForm()}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>

        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 40,
        backgroundColor: '#F1EFE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        flex: 3,
        marginTop: 20,
    },
    smallForm: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    smallInput: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        width: 145,
        borderRadius: 2,
    },
    input: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderRadius: 2,
    },
    descriptionInput: {
        textAlignVertical: 'top',
        height: 90,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 2,
        width: 300
    },
    dropdown: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        width: 145,
        borderRadius: 2,
        paddingHorizontal: 8,
        backgroundColor: '#F1EFE5',
    },
    label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,

    },
    selectedTextStyle: {
        fontSize: 16,

    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,

    },
});



function mapStateToProps(state) {
    return { dataUser: state.dataUser, saveTatoueurInfos: state.saveTatoueurInfos }
}

function mapDispatchToProps(dispatch) {
    return {
        addForm: function (dataForm) {
            dispatch({ type: 'addForm', dataForm: dataForm })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectFormScreen);
