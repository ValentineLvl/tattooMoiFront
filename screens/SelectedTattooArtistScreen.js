import React, { useState } from 'react';

import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, Image, Text, ScrollView, Linking, TouchableOpacity, TextInput } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

import HeaderComponent from './HeaderComponent';


function SelectedTattooArtistScreen(props) {
        //etats du coeur favoris
    const [tattooLiked, setTattooLiked] = useState(false);
        //etats des overlay
    const [overlayVisibleDevis, setOverlayVisibleDevis] = useState(false);
    const [overlayVisibleRDV, setOverlayVisibleRDV] = useState(false);
        //etats de connexion
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const [userExists, setUserExists] = useState(false);
        //erreur envoyé par le back
    const [listErrorsSignin, setErrorsSignin] = useState([]);

    var handleSubmitSignin = async () => {

        const data = await fetch('http://192.168.0.38:3000/sign-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `userEmailFromFront=${signInEmail}&userPasswordFromFront=${signInPassword}`
        })

        const body = await data.json()

        if (body.result == true) {
            props.addDataUser(body.user)
            //console.log('user connected', body)
            AsyncStorage.setItem("dataUserToken", body.token);
            setUserExists(true);

            if (!userExists) {
                return (props.navigation.navigate('Formulaire'))
            }

        } else {
            setErrorsSignin(body.error)
        }
      }
    
      var tabErrorsSignin = listErrorsSignin.map((error,i) => {
        return(<Text style={{textAlign:'center', color:'#BF5F5F'}}>{error}</Text>)
      })


    var colorHeart;
    if(tattooLiked){
         colorHeart = {color: '#BF5F5F'}
      } else {
         colorHeart = {color: '#454543'}
      }
      //console.log('tattooLiked 2', tattooLiked);

      const handlePressDevis = () => {
        setOverlayVisibleDevis(!overlayVisibleDevis);
      };

      const handlePressRDV = () => {
        setOverlayVisibleRDV(!overlayVisibleRDV);
      };

    const selectedArtistInfos = props.selectedArtistInfos.map((info, i) => {

        return (

            <ScrollView key={info._id} contentContainerStyle={{ alignItems: 'center' }}>
                <View key={1} style={{ alignItems: 'center' }}>
                    <Image key={2}
                        source={{ uri: info.profilePicture }}
                        style={styles.imgTatoueur}
                    />
                    <Text key={3} style={{ fontSize: 20, fontWeight: 'bold', color: '#454543', marginTop: 10 }}>{info.firstName}</Text>
                    {info.tattooShopAddress.map((address) => {
                        return (
                            <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: 'bold', color: '#454543' }}>{address.tattooShop}</Text>
                        )
                    })}
                    <TouchableOpacity onPress={() => setTattooLiked(!tattooLiked)}>
                                <Text style={{ left: '20%', top: '-160%'}}>
                            <AntDesign
                                    name="heart"
                                    size={30}
                                    style={colorHeart}
                                />
                                </Text>
                        </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        {info.tattooShopAddress.map((address) => {
                            return (
                                <Text key={30} style={{ fontSize: 18, color: '#454543' }}>{address.address} {address.postalCode} {address.city}</Text>
                            )
                        })}
                        <Text key={5} style={{ fontSize: 18, paddingTop: 5, color: '#454543' }}>Temps d'attente: <Text style={{ fontWeight: 'bold' }}>{info.schedule}</Text></Text>
                    </View>
                </View>

                <View key={6} style={styles.btnGroup}>
                    {info.styleList.map((style) => {
                        return (
                            <Button key={i}
                                title={`#${style}`}
                                type="solid"
                                buttonStyle={styles.button}
                                titleStyle={{ color: '#C2A77D', fontSize: 14, fontWeight: 'bold' }}
                            />
                        )
                    })}
                </View>

                <View key={7} style={styles.ig}>
                    <AntDesign name="instagram" size={30} color="#454543" style={{ marginRight: 5 }} />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'left',
                        marginTop: 3,
                        color: '#454543'
                    }}>Instagram</Text>
                </View>
                <View key={8} style={{ width: '90%', margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    {info.galleryPhoto.map((photo) => {
                        return (
                            <Image
                                source={{ uri: photo }}
                                style={{ width: 80, height: 70, margin: 10 }}
                            />
                        )
                    })}
                </View>

                <Button key={9}
                    title="En voir plus"
                    onPress={() => Linking.openURL(`instagram://user?username=${info.instagram}`)}
                    buttonStyle={{ backgroundColor: '#F1EFE5', padding: 2, borderBottomWidth: 1, borderBottomColor: '#454543', marginBottom: 15 }}
                    titleStyle={{ color: '#454543' }}
                    type="solid"
                />

                <View key={10} style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20 }}>
                    <AntDesign
                        onPress={() => Linking.openURL(`http://${info.website}`)}
                        name="earth" size={20} color="#454543" style={{ marginRight: 10 }} />
                    <Text
                        onPress={() => Linking.openURL(`http://${info.website}`)}
                        style={{ marginTop: 3, fontSize: 16 }}>{info.website}</Text>
                </View>

                <View key={11} style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                    <Feather key={111}
                        onPress={() => Linking.openURL(`tel:${info.phoneNumber}`)}
                        name="phone" size={20} color="#454543" style={{ marginRight: 10 }} />
                    <Text key={12}
                        onPress={() => Linking.openURL(`tel:${info.phoneNumber}`)}
                        style={{ marginTop: 3, fontSize: 16 }}>{info.phoneNumber}</Text>
                </View>

                <View key={13} style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                    <MaterialIcons key={14}
                        onPress={() => Linking.openURL(`mailto:${info.email}`)}
                        name="alternate-email" size={20} color="#454543" style={{ marginRight: 10 }} />
                    <Text key={15}
                        onPress={() => Linking.openURL(`mailto:${info.email}`)}
                        style={{ marginTop: 3, fontSize: 16 }}>{info.email}</Text>
                </View>
                <View key={16} style={{ flexDirection: 'row' }}>
                    <AntDesign key={17}
                        name="facebook-square"
                        onPress={() => Linking.openURL('fb://')}
                        size={32}
                        color="#454543"
                        style={{ marginTop: 30, marginRight: 10 }} />
                    <AntDesign key={18}
                        name="instagram"
                        onPress={() => Linking.openURL(`instagram://user?username=${info.instagram}`)}
                        size={32}
                        color="#454543"
                        style={{ marginTop: 30 }} />
                </View>

                <View key={19} style={{ flexDirection: 'row', marginBottom: 40}}>
                {(props.dataUser == null) ? <>
                    <Button 
                        title="Demande devis"
                        type="solid"
                        buttonStyle={{ backgroundColor: '#C2A77D', marginTop: 40, marginRight: 30, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                        onPress={() => handlePressDevis()}
                    />
                     </>
                    : <Button 
                    title="Demande devis"
                    type="solid"
                    buttonStyle={{ backgroundColor: '#C2A77D', marginTop: 40, marginRight: 30, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                    onPress={() => props.navigation.navigate('Formulaire')}
                /> 
                    }
                    <Overlay isVisible={overlayVisibleDevis} overlayStyle={{backgroundColor:'#F1EFE5'}}>
                        <Text style={styles.textOverlay}>Demander un devis</Text>
                        <Button
                        title="Continuer sans s'inscrire"
                        buttonStyle={styles.greenButton}
                        type="solid"
                        onPress={() => {handlePressDevis(), props.navigation.navigate('Formulaire')}}
                    />
                        <TextInput
                    style={styles.input}
                    placeholder="Adresse email"
                    onChangeText={setSignInEmail}
                    value={signInEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    onChangeText={setSignInPassword}
                    value={signInPassword}
                    secureTextEntry
                />
                {tabErrorsSignin}
                <Button
                    title="Se connecter"
                    buttonStyle={styles.greenButton}
                    type="solid"
                    onPress={() => handleSubmitSignin()}
                />
                    </Overlay>
                    {(props.dataUser == null) ? 
                    <Button 
                        title="Demande RDV"
                        type="solid"
                        buttonStyle={{ backgroundColor: '#C2A77D', marginTop: 40, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                        onPress={() => handlePressRDV()}
                    />
                    
                    : <Button 
                    title="Demande RDV"
                    type="solid"
                    buttonStyle={{ backgroundColor: '#C2A77D', marginTop: 40, marginRight: 30, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                    onPress={() => props.navigation.navigate('Formulaire')}
                /> 
                    }
                    <Overlay isVisible={overlayVisibleRDV} overlayStyle={{backgroundColor:'#F1EFE5'}}>
                    <Text style={styles.textOverlay}>Prendre un RDV</Text>
                        <Button
                        title="Continuer sans s'inscrire"
                        buttonStyle={styles.greenButton}
                        type="solid"
                        onPress={() => {handlePressRDV(), props.navigation.navigate('Formulaire')}}
                    />
                        <TextInput
                    style={styles.input}
                    placeholder="Adresse email"
                    onChangeText={setSignInEmail}
                    value={signInEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    onChangeText={setSignInPassword}
                    value={signInPassword}
                    secureTextEntry
                />
                {tabErrorsSignin}
                <Button
                    title="Se connecter"
                    buttonStyle={styles.greenButton}
                    type="solid"
                    onPress={() => handleSubmitSignin()}
                />
                    </Overlay>
                </View>
            </ScrollView>
        )

    })

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
            <HeaderComponent navigation={props.navigation}/>
            </View>

            {selectedArtistInfos}

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
        maxHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    button: {
        backgroundColor: '#424D41',
        padding: 10,
        width: 100
    },
    btnGroup: {
        marginTop: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    greenButton: {
        backgroundColor: '#424D41',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    imgTatoueur: {
        marginTop: 10,
        width: 135,
        height: 135,
        borderRadius: 75,
    },
    ig: {
        flexDirection: 'row',
        marginTop: 30,
        width: '90%',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderRadius: 2,
    },
    textOverlay: {
        fontSize:14,
        fontWeight:'bold',
        color:'#424D41',
        textAlign: 'center',
        marginTop:10,
    },
});

function mapStateToProps(state) {
    return { selectedArtistInfos: state.selectedArtistInfos, dataUser: state.dataUser }
}

function mapDispatchToProps(dispatch) {
    return {
        addDataUser: function (dataUser) {
            dispatch({ type: 'addDataUser', dataUser: dataUser })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedTattooArtistScreen);
