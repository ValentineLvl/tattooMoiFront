import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import HeaderComponent from './HeaderComponent';
import TattooCardComponent from './TattooCardComponent';

function SearchResultScreen(props) {

    const [tattooList, setTattooList] = useState([props.saveTatoueurInfos]);

    var handlePressAddFavorite = async (tattooId) => {

        const response = await fetch('http://192.168.1.101:3000/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `IdFromFront=${tattooId}&token=${props.dataUser.token}`
        })
        console.log('recupérer dataUser.token', props.dataUser.token);
    }

    // var handlePressDeleteFavorite = async () => {
    // const response = await fetch(`http://192.168.0.38:3000/favorites/${name}`, {
    //   method: 'DELETE'
    // })
    // }

    const searchResults = tattooList.map((tatoueur, i) => {

        return (
            <TouchableOpacity onPress={() => { props.selectedArtistInfos([props.saveTatoueurInfos[0][0][0]]), props.navigation.navigate('TattooArtist') }}>

                <TattooCardComponent key={i} firstname={tatoueur.firstName}/>

            </TouchableOpacity>
        );
    })

    return (

        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation} />

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
    return { saveTatoueurInfos: state.saveTatoueurInfos, dataUser: state.dataUser }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectedArtistInfos: (artistInfos) => dispatch({ type: 'selectedArtistInfos', artistInfos })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen);
