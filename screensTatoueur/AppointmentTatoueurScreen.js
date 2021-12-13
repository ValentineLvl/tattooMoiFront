import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HeaderComponent from '../screens/HeaderComponent';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';



function AppointmentTatoueurScreen(props) {
    if (props.dataTattoo !== null) {
        return (
            <View style={styles.container}>
                <HeaderComponent navigation={props.navigation} />

                <SafeAreaView style={styles.safeArea} >
                   
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
                            <Text> Rendez-vous John Doe </Text>
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
                        title="  Rendez-vous John Doe"
                        onPress={() => props.navigation.navigate('Mes forms')}

                      
                        />
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
        //   alignItems: 'center',
        //   justifyContent: 'center',
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
        marginRight:120, 
        marginLeft: 5
    },
    buttonStyle: {
        borderColor: '#424D41', 
        marginBottom:20,
        justifyContent: 'flex-start',
        borderWidth: 1
    },
    
    
});

// function mapStateToProps(state) {
//     return { dataUser: state.dataUser, formList: state.formList}
// }

export default AppointmentTatoueurScreen
