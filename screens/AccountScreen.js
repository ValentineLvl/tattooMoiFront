import React from 'react';
import { StyleSheet , Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import HeaderComponent from './HeaderComponent';
import {connect} from 'react-redux'

function AccountScreen(props) {

const handleLogOut = async () => {
    props.disconnectToken(null);
    props.navigation.navigate('Search');
}

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation}/>
            <Button
            title="Déconnexion"
            titleStyle={{color:'#424D41'}}
            type="clear"
            onPress={() => handleLogOut()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    paddingTop : 50,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });

    function mapDispatchToProps(dispatch){
        return {
            disconnectToken: function(token){
            dispatch({type: 'disconnectToken', token: token})
            }
        }
        }

    export default connect(
        null,
        mapDispatchToProps
        )(AccountScreen);