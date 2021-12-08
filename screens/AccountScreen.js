import React from 'react';
import { StyleSheet , Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import HeaderComponent from './HeaderComponent';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AccountScreen(props) {

const handleLogOut = async () => {
    props.disconnectUser(null);
    props.navigation.navigate('Search');
    AsyncStorage.removeItem("dataUserToken");
}

if (props.dataUser !== null) {
    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation}/>
            
            <View style={styles.main}>
            <Button 
            title="Mes infos"
            type="solid"
            color = '#424D41'
            onPress={() => props.navigation.navigate('Mes infos')}
     />
     </View>

            <Button
            title="Déconnexion"
            titleStyle={{color:'#424D41'}}
            type="clear"
            onPress={() => handleLogOut()}
            />
        </View>
    )
} else {
    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation}/>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    paddingTop : 50,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
        flex:3,  
        flexDirection : 'row',
        alignItems : 'center',
       justifyContent :'space-evenly',
    },
    });

    function mapStateToProps(state){
        return {dataUser:state.dataUser}
      }

    function mapDispatchToProps(dispatch){
        return {
            disconnectUser: function(dataUser){
            dispatch({type: 'disconnectUser', dataUser: dataUser})
            }
        }
        }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(AccountScreen);