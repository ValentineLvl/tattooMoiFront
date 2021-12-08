import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

import HeaderComponent from './HeaderComponent';

function SearchScreen(props) {
   
const [userToken, setUserToken] = useState(false)

//A l'initialisation de searchScreen, si le user était connecté on remet ses infos dans le store avec une route get
    useEffect(() => {

        AsyncStorage.getItem("dataUserToken", function (error, data) {
            
            if (data) {
                const findUser = async() => {
                    const reqFind = await fetch(`http://172.17.1.128:3000/client-data?token=${data}`)
                    const resultFind = await reqFind.json()
        
                    props.addDataUser(resultFind.client)
                  }
                  findUser();
            setUserToken(true);
          }
        });

      }, []);

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation}/>
            
<View style = {styles.main}>
            <Button 
            title="Rechercher"
            type="solid"
            buttonStyle = {{backgroundColor : '#424D41'}}
            onPress={() => props.navigation.navigate('Resultat')}
     />
     </View>
     <Button
            title="Vous êtes pro ? Cliquez ici"
            titleStyle={{color:'#424D41'}}
            type="clear"
            onPress={() => props.navigation.navigate('Connexion Tatoueur')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection : 'column',
      paddingTop : 50,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        flex:2,  
        maxHeight : 80,
        flexDirection : 'row',
        alignItems : 'center',
       justifyContent :'space-evenly',
    },
    main: {
        flex:3,
        flexDirection : 'column',  
        alignItems : 'center',
        justifyContent: 'center',
    },
    });
    
    function mapStateToProps(state){
        return {dataUser:state.dataUser}
      }
    
      function mapDispatchToProps(dispatch){
        return {
            addDataUser: function(dataUser){
            dispatch({type: 'addDataUser', dataUser: dataUser})
            }
        }
        }

      export default connect (
        mapStateToProps,
        mapDispatchToProps
      )(SearchScreen);