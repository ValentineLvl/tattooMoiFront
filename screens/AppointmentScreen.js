import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, SafeAreaViewBase, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import HeaderComponent from './HeaderComponent';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

function AppointmentScreen(props) {

    const [formsList, setFormsList] = useState([]);
    const [tattooInfo, setTattooInfo] = useState([[]]);

    useEffect(() => {
        console.log("App is loaded");
        // ASYNC STORAGE
        // console.log("formList", props.formList[0]._id)
        const findProjectForm = async () => {
            const dataProjectForm = await fetch(`http://192.168.1.15:3000/project-form?token=${props.dataUser.token}`)
            const body = await dataProjectForm.json()
            console.log("C BON????", body.project[0].tattooShopAddress[0].address)
            //console.log("body", body.user.formId)
            props.saveForm(body.user.formId)
            setFormsList(body.user.formId)
            setTattooInfo(body.project.tattooShopAddress)
           

        }
        findProjectForm()
    }, [])


    var deleteForm = async (_id) => {

        const deleteReq = await fetch('http://192.168.1.15:3000/project-form', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `formId=${_id}&token=${props.dataUser.token}`,

        })
        const newForm = await deleteReq.json()
        //console.log("newForm", newForm)
        setFormsList(newForm.newForm.formId)
        props.deleteForm(_id)
    }


    var projectForm = props.formList.map((form, i) => {
        //console.log("image", form.projectImg)
        return (

            <Card key={i} containerStyle={styles.cards}>
                
                
                    <View  >
                        <Card.Image source={{ uri: form.projectImg }} >
                        <TouchableOpacity onPress={() => deleteForm(form._id)}>
                        <Text style={{ left: '89%',top: '5%'}}>
                        <MaterialCommunityIcons
                                    name="trash-can"
                                    size={30}
                                    color="#F1EFE5"  
                                />
                                </Text>
                        </TouchableOpacity>
                        </Card.Image>
                        <View  style={styles.cardDesc}  >
                        <Text style={{ marginBottom: 10, fontWeight: 'bold', paddingTop: 5, color: '#454543' }}> Projet : {form.request}</Text>
                        {tattooInfo.map((tattoo, i) => ( <>
                          <Text style={{  fontWeight: 'bold', paddingTop: 5, color: '#454543' }}> tatoueur: {tattoo.address} </Text> 
                        <Text style={{ marginBottom: 10, fontWeight: 'bold',  color: '#454543' }}> Adresse : {tattoo.address}, {tattoo.address}, {tattoo.address} </Text> 
                        </>))}
        
    
                        
                        <Text style={styles.text} >Style: {form.style}</Text>
                        <Text style={styles.text} >Zone à tatouer: {form.tattooZone}</Text>
                        <Text style={styles.text}>Taille:  {form.heigth} cm x {form.width} cm</Text>
                        <Text style={styles.text} >Description:  {form.description} </Text>
                        <Text style={styles.text} >Disponibilité:  {form.disponibility} </Text>
                        {/* <Button
                            title="Delete"
                            type="solid"
                            padding="30"
                            color='#424D41'

                            onPress={() => deleteForm(form._id)}
                        /> */}
                        </View>
                    </View>


                
            </Card>




        )
    })



    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation} />
            <ScrollView style={{ width: '90%', flex: 2 }} >
                    {projectForm}
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F1EFE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardDesc: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#F1EFE5',
    },
    cards: {
        padding: 0,
        borderWidth: 0.1,
        borderColor: '#454543'
    },
    text: {
       color: '#454543',
    }

});


function mapStateToProps(state) {
    return { dataUser: state.dataUser, formList: state.formList }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteForm: function (_id) {
            dispatch({
                type: 'deleteForm',
                _id: _id
            })
        },
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
    mapDispatchToProps,
)(AppointmentScreen);