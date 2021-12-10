import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { AntDesign, FontAwesome} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import HeaderComponent from './HeaderComponent';

function SearchResultScreen(props) {

    // console.log('STATE FROM STORE:', props.saveTatoueurInfos)

    const searchResults = props.saveTatoueurInfos.map((style, i) => {
        return (

            style.map((info, i) => {

                return (
                    <TouchableOpacity key={i} onPress={() => { props.selectedArtistInfos([info]), props.navigation.navigate('TattooArtist') }}>
                        <Card key={2} containerStyle={styles.cards} >
                            <Card.Image source={{ uri: info.galleryPhoto[0] }}>
                                {/* <AntDesign
                                    name="heart"
                                    size={30}
                                    color="#FFF"
                                    style={{
                                        position: 'absolute',
                                        left: '87%',
                                        top: '5%'
                                    }}
                                /> */}
                                <TouchableOpacity key={i}  onPress={() => deleteForm(form._id)}>
                        <Text style={{ left: '89%',top: '5%'}}>
                        <FontAwesome
                                    name="trash"
                                    size={30}
                                    color="#FFF"
                                    
                                />
                                </Text>
                                </TouchableOpacity>
                            </Card.Image>
                            <View style={styles.cardDesc}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#454543' }}>{info.firstName}</Text>
                                    {info.tattooShopAddress.map((name) => {
                                        return (
                                            <Text style={{ marginBottom: 10, fontWeight: 'bold', paddingTop: 5, color: '#454543' }}>
                                                {name.tattooShop}
                                            </Text>
                                        )
                                    })}
                                    <Text style={{ fontStyle: 'italic', color: 'rgba(69, 69, 67, 0.8)' }}>{info.styleList.join(' ')}</Text>
                                </View>
                                <View>
                                    <Text style={{ color: '#454543' }}>Attente: {info.schedule}</Text>
                                    {info.tattooShopAddress.map((address) => {
                                        return (
                                            <Text style={{ paddingTop: 5, color: '#454543' }}>{address.city}</Text>
                                        )
                                    })}
                                </View>
                            </View>
                        </Card>
                      </TouchableOpacity> 
                );
            })
        )
    });


    return (

        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation} />

            {/* <View style={styles.header}>
                        <Image
                            source={require('../assets/tattoo-moi_1.png')}
                            style={styles.logo} />
                        <Button
                            title="Connexion"
                            buttonStyle={styles.connexionBtn}
                            titleStyle={styles.titleBtn}
                            type="solid"
                        />
                    </View> */}

            <ScrollView style={{ width: '90%', flex: 2 }}>

                {searchResults}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F1EFE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // main: {
    //     flex: 3,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-evenly',
    // },
    main: {
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
        marginBottom: 10
    },
    logo: {
        width: 200,
        height: 80,
        marginRight: 70
    },
    connexionBtn: {
        backgroundColor: '#F1EFE5',
        paddingRight: 5,
        paddingLeft: 5,
        marginRight: 10,
        marginTop: 20
    },
    titleBtn: {
        color: '#424D41',
        marginBottom: 10,
        fontSize: 15
    },
    cardDesc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#F1EFE5',
    },
    cards: {
        padding: 0,
        borderWidth: 0.1,
        borderColor: '#454543'
    }
});

function mapStateToProps(state) {
    return { saveTatoueurInfos: state.saveTatoueurInfos }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectedArtistInfos: (artistInfos) => dispatch({ type: 'selectedArtistInfos', artistInfos })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen);
