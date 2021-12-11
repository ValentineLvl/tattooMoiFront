import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import HeaderComponent from '../screens/HeaderComponent';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AccountTatoueurScreen(props) {
    
    const handleLogOut = async () => {
        props.disconnectTattoo(null);
        //props.deconnectForms(formList);
        props.navigation.navigate('Search');
        AsyncStorage.removeItem("dataTattooToken");
    } 

    if (props.dataTattoo !== null) {
        return (
            <View style={styles.container}>
                <HeaderComponent navigation={props.navigation} />
            
                <View style={styles.deconnexion}>
                    <Button
                        title="Déconnexion"
                        titleStyle={{ color: '#424D41' , fontSize:14}}
                        type="clear"
                        onPress={() => handleLogOut()}
                    />
                </View>

            </View>    
        )
        } else {
            return (
            <View style={styles.container}>
                <HeaderComponent navigation={props.navigation} />
                <View style={{flex:3, justifyContent:'center', padding:40}}>
                <Text style={{color:'#BF5F5F', textAlign:'center', fontSize:14}}>Veuillez vous inscrire ou vous connecter pour accéder à cette page</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F1EFE5',
        //   alignItems: 'center',
        //   justifyContent: 'center',
    },
    titleStyle: {
        color: '#424D41',
        fontSize:14
    },
    buttonStyle: {
        borderColor: '#424D41', 
        marginBottom:20,
        justifyContent: 'flex-start',
        borderWidth: 1
    },
    deconnexion: {
        flex:4,
        justifyContent: 'flex-end',
        paddingBottom:20
    },
    
});

function mapStateToProps(state) {
    return { dataTattoo: state.dataTattoo}
}

function mapDispatchToProps(dispatch) {
    return {
        disconnectTattoo: function (dataTattoo) {
            dispatch({ type: 'disconnectTattoo', dataTattoo: dataTattoo })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (AccountTatoueurScreen)
