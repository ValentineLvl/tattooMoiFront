import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Image, Button } from 'react-native-elements';
import {connect} from 'react-redux';

function HeaderComponent(props) {
    
const [isLoggedIn, setIsLoggedIn] = useState(false)

    if (props.token != null) {
        //setIsLoggedIn(true);
        return (
            <View style = {styles.headerConnected}>
            <Image 
            source = {require('../assets/tattoo-moi_1.png')}
            style={{ width: 200, height: 80 }} />
        </View>
        )
    }
else if (props.token == null) {
return (
        <View style = {styles.header}>
            <Image 
            source = {require('../assets/tattoo-moi_1.png')}
            style={{ width: 200, height: 80, marginRight: 70 }} />
            <Button
            title="Connexion"
            titleStyle={{color:'#424D41'}}
            type="clear"
            onPress={() => props.navigation.navigate('Connexion')}
            />
        </View>
    )
}
}

const styles = StyleSheet.create({
headerConnected: {
    maxHeight : 80,
  },
  header: {
    flex:2,  
    maxHeight : 80,
    flexDirection : 'row',
    alignItems : 'center',
   justifyContent :'space-evenly',
},
});

function mapStateToProps(state){
    return {token:state.token}
  }

  export default connect(
    mapStateToProps,
    null
  )(HeaderComponent);
  