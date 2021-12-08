import React from 'react';
import { StyleSheet , Text, View, SafeAreaView} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

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
            
            <SafeAreaView style={{margin: 40}}>

            <Button
  titleStyle= {{color:'#424D41'}}
  style= {{borderColor:'#424D41'}}
  type="outline"
  icon={
    <MaterialCommunityIcons
      name="calendar-blank-outline"
      size={20}
      color="#424D41"
    />
  }
  title="Mes rendez-vous / devis"
  onPress={() => props.navigation.navigate('Mes RDV') }
/>
<Button
titleStyle= {{color:'#424D41'}}
  type="outline"
  icon={
    <MaterialCommunityIcons
      name="heart-circle"
      size={20}
      color="#424D41"
    />
  }
  title="Mes favoris"

/>
<Button
titleStyle= {{color:'#424D41'}}
  type="outline"
  icon={
    <MaterialCommunityIcons
      name="information"
      size={20}
      color="#424D41"
    />
  }
  title="Mes informations personnelles"

/>
            <Button
            title="Déconnexion"
            titleStyle={{color:'#424D41'}}
            type="clear"
            onPress={() => handleLogOut()}
            />
            
        </SafeAreaView>
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
    paddingTop : 50,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    main: {
        flex:3,  
        flexDirection : 'row',
        alignItems : 'center',
       justifyContent :'space-evenly',
    },
    input: {
        
        flex:1,
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 2,
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