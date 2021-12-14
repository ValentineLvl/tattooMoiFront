import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HeaderComponent from '../screens/HeaderComponent';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';



function AppointmentTatoueurScreen(props) {

    const [form, setForm]= useState([])

    useEffect(() => {
        console.log("Appoint loaded");
        const findFormTattoo = async () => {
            const dataForm = await fetch(`http://192.168.1.15:3000/appointment-tattoo?id=${props.dataTattoo._id}`)
            const body = await dataForm.json();
            
            props.saveForm(body.form)
            setForm(body.form)

        }
        findFormTattoo()
    }, [])

    // console.log("FORM", form[0].confirmationFormSchema[0].status)

    var appointment = form.map((form, i) => {
        console.log("image", form.projectImg)
        return (
            <Button
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            
            type="outline"
            icon={<>
                <MaterialCommunityIcons
                    name="calendar-blank-outline"
                    size={20}
                    color="#424D41"
                />
                <View style={styles.titleStyle}>
                <Text> Rendez-vous {form.firstName} {form.lastName} ({form.confirmationFormSchema[0].status}) </Text>
                </View>
                <MaterialCommunityIcons
                iconRight
                    name="arrow-right-circle-outline"
                    size={20}
                    color="#424D41"
                    alignSelf= 'right'
                    alignItem='right'
                />
                </>
            }
            
            onPress={() => props.navigation.navigate('Mes forms')}

          
            />)})


    // console.log(props.dataTattoo._id)
    if (props.dataTattoo !== null) {
        return (
            <View style={styles.container}>
                <HeaderComponent navigation={props.navigation} />

                <SafeAreaView style={styles.safeArea} >
                   {appointment}
                  
                    <Button
                        titleStyle={styles.titleStyle}
                        buttonStyle={styles.buttonStyle}
                        type="outline"
                        icon={<>
                            <MaterialCommunityIcons
                                name="form-select"
                                size={20}
                                color="#424D41"
                            />
                             <View style={styles.titleStyle}>
                             <Text> Devis Jane Test </Text>
                            </View>
                            <MaterialCommunityIcons
                            padding = {10}
                                name="arrow-right-circle-outline"
                                size={20}
                                color="#424D41"
                                marginLeft={20}
                            />
                            </>
                        }
                        
                        onPress={() => props.navigation.navigate('Mes favoris')}
                   
                   
                //    icon={
                //             <MaterialCommunityIcons
                //                 name="arrow-right-circle-outline"
                //                 size={20}
                //                 color="#424D41"
                //             />
                //         }
                        />
               
                </SafeAreaView>
     
            </View>
        )
    } 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F1EFE5',
        
    },
    safeArea:{
        marginLeft:30,
        marginRight:30,
        marginBottom:30,
        marginTop:90
    },
    titleStyle: {
        color: '#424D41',
        fontSize:14,
        marginRight:50, 
        marginLeft: 5
    },
    buttonStyle: {
        borderColor: '#424D41', 
        marginBottom:20,
        justifyContent: 'flex-start',
        borderWidth: 1
    },
    
    
});

function mapStateToProps(state) {
    return { dataTattoo: state.dataTattoo}
}

function mapDispatchToProps(dispatch) {
    return {
        
        saveForm: function (dataSaveForm) {
            dispatch({
                type: 'saveForm',
                dataSaveForm: dataSaveForm
            })
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppointmentTatoueurScreen)

