import React, { useState } from 'react';

import { connect } from 'react-redux';

import { StyleSheet, View, Image, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

import HeaderComponent from './HeaderComponent';


function SelectedTattooArtistScreen(props) {

    const [tattooLiked, setTattooLiked] = useState(false);

    var colorHeart;
    if(tattooLiked){
         colorHeart = {color: '#BF5F5F'}
      } else {
         colorHeart = {color: '#454543'}
      }
      //console.log('tattooLiked 2', tattooLiked);

    const selectedArtistInfos = props.selectedArtistInfos.map((info, i) => {

        return (

            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                
                <View style={{ alignItems: 'center' }}>
                
                    <Image
                        source={{ uri: info.profilePicture }}
                        style={styles.imgTatoueur}
                    />
                    
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#454543', marginTop: 10 }}>{info.firstName}</Text>
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
                                <Text style={{ fontSize: 18, color: '#454543' }}>{address.address} {address.postalCode} {address.city}</Text>
                            )
                        })}
                        <Text style={{ fontSize: 18, paddingTop: 5, color: '#454543' }}>Temps d'attente: <Text style={{ fontWeight: 'bold' }}>{info.schedule}</Text></Text>
                    </View>
                </View>

                <View style={styles.btnGroup}>
                    {info.styleList.map((style) => {
                        return (
                            <Button
                                title={`#${style}`}
                                type="solid"
                                buttonStyle={styles.button}
                                titleStyle={{ color: '#C2A77D', fontSize: 14, fontWeight: 'bold' }}
                            />
                        )
                    })}
                </View>

                <View style={styles.ig}>
                    <AntDesign name="instagram" size={30} color="#454543" style={{ marginRight: 5 }} />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'left',
                        marginTop: 3,
                        color: '#454543'
                    }}>Instagram</Text>
                </View>
                <View style={{ width: '90%', margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    {info.galleryPhoto.map((photo) => {
                        return (
                            <Image
                                source={{ uri: photo }}
                                style={{ width: 80, height: 70, margin: 10 }}
                            />
                        )
                    })}
                </View>

                <Button
                    title="En voir plus"
                    onPress={() => Linking.openURL(`instagram://user?username=${info.instagram}`)}
                    buttonStyle={{ backgroundColor: '#F1EFE5', padding: 2, borderBottomWidth: 1, borderBottomColor: '#454543', marginBottom: 15 }}
                    titleStyle={{ color: '#454543' }}
                    type="solid"
                />

                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20 }}>
                    <AntDesign
                        onPress={() => Linking.openURL(`http://${info.website}`)}
                        name="earth" size={20} color="#454543" style={{ marginRight: 10 }} />
                    <Text
                        onPress={() => Linking.openURL(`http://${info.website}`)}
                        style={{ marginTop: 3, fontSize: 16 }}>{info.website}</Text>
                </View>

                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                    <Feather
                        onPress={() => Linking.openURL(`tel:${info.phoneNumber}`)}
                        name="phone" size={20} color="#454543" style={{ marginRight: 10 }} />
                    <Text
                        onPress={() => Linking.openURL(`tel:${info.phoneNumber}`)}
                        style={{ marginTop: 3, fontSize: 16 }}>{info.phoneNumber}</Text>
                </View>

                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                    <MaterialIcons
                        onPress={() => Linking.openURL(`mailto:${info.email}`)}
                        name="alternate-email" size={20} color="#454543" style={{ marginRight: 10 }} />
                    <Text
                        onPress={() => Linking.openURL(`mailto:${info.email}`)}
                        style={{ marginTop: 3, fontSize: 16 }}>{info.email}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign
                        name="facebook-square"
                        onPress={() => Linking.openURL('fb://')}
                        size={32}
                        color="#454543"
                        style={{ marginTop: 30, marginRight: 10 }} />
                    <AntDesign
                        name="instagram"
                        onPress={() => Linking.openURL(`instagram://user?username=${info.instagram}`)}
                        size={32}
                        color="#454543"
                        style={{ marginTop: 30 }} />
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                    <Button
                        title="Demande devis"
                        type="solid"
                        buttonStyle={{ backgroundColor: '#C2A77D', marginTop: 40, marginRight: 30, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                        onPress={() => props.navigation.navigate('Formulaire')}
                    />
                    <Button
                        title="Demande RDV"
                        type="solid"
                        buttonStyle={{ backgroundColor: '#C2A77D', marginTop: 40, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                        onPress={() => props.navigation.navigate('Formulaire')}
                    />
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
    }
});

function mapStateToProps(state) {
    return { selectedArtistInfos: state.selectedArtistInfos }
}

export default connect(mapStateToProps, null)(SelectedTattooArtistScreen);
