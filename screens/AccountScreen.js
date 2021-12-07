import React from 'react';
import { StyleSheet , Text, View, SafeAreaView} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import HeaderComponent from './HeaderComponent';
import {connect} from 'react-redux'

function AccountScreen(props) {

const handleLogOut = async () => {
    props.disconnectToken(null);
    props.navigation.navigate('Search');
}

    return (
        <View style={styles.container}>
            <HeaderComponent/>
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
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1EFE5',
    paddingTop : 50,
    //   alignItems: 'center',
    //   justifyContent: 'center',
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