import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import HeaderComponent from '../screens/HeaderComponent';

function CalendarScreen(props) {

    const [userToken, setUserToken] = useState(false);

    useEffect(() => {

    //A l'initialisation de calendarScreen, si le user était connecté on remet ses infos dans le store avec une route get
        AsyncStorage.getItem("dataTattooToken", function (error, data) {

            if (data) {
                const findUser = async () => {
                    const reqFind = await fetch(`http://192.168.1.101:3000/tattoo-data?token=${data}`)
                    const resultFind = await reqFind.json()

                    props.addDataTattoo(resultFind.tatoueur)
                }
                findUser();
                setUserToken(true);
            }
        });

    }, []);

    return (
        <View>
            <Text>Calendar</Text>
        </View>
    )
}

function mapDispatchToProps(dispatch){
    return {
      addDataTattoo: function(dataTattoo){
        dispatch({type: 'addDataTattoo', dataTattoo: dataTattoo})
        },
    }
    }
  
  export default connect(
  null,
  mapDispatchToProps
  ) (CalendarScreen)