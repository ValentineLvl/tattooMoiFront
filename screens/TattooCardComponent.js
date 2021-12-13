import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';


function TattooCardComponent(props) {

    const [tattooLiked, setTattooLiked] = useState(false);

    return (
            <Card containerStyle={styles.cards}>
                <Card.Image source={{ uri: props.saveTatoueurInfos[0][0][0].galleryPhoto[0] }}>
                    <TouchableOpacity onPress={() => { setTattooLiked(!tattooLiked) }}>
                        <AntDesign
                            name="heart"
                            size={30}
                            style={{ color: tattooLiked ? '#BF5F5F' : '#454543', left: '87%', top: '5%' }}

                        />
                    </TouchableOpacity >
                </Card.Image>
                <View style={styles.cardDesc}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#454543' }}>{props.saveTatoueurInfos[0][0][0].firstName}</Text>
                                <Text style={{ marginBottom: 10, fontWeight: 'bold', paddingTop: 5, color: '#454543' }}>
                                    {props.saveTatoueurInfos[0][0][0].tattooShopAddress[0].tattooShop}
                                </Text>
                        <Text style={{ fontStyle: 'italic', color: 'rgba(69, 69, 67, 0.8)' }}>{props.saveTatoueurInfos[0][0][0].styleList.join(' ')}</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#454543' }}>Attente: {props.saveTatoueurInfos[0][0][0].schedule}</Text>
                                <Text style={{ paddingTop: 5, color: '#454543' }}>{props.saveTatoueurInfos[0][0][0].tattooShopAddress[0].city}</Text>
                    </View>
                </View>
            </Card>
    )}

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
        return { saveTatoueurInfos: state.saveTatoueurInfos, dataUser: state.dataUser }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            selectedArtistInfos: (artistInfos) => dispatch({ type: 'selectedArtistInfos', artistInfos })
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(TattooCardComponent);