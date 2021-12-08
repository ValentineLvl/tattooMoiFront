import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet , Text, View, Image, ScrollView,SafeAreaViewBase} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {connect} from 'react-redux'
import HeaderComponent from './HeaderComponent';

function AppointmentScreen(props) {

    const [formsList, setFormsList] = useState([]);

    useEffect(() => {
        console.log("App is loaded");
        const findProjectForm = async () => {
          const dataProjectForm = await fetch(`http://172.17.1.32:3000/project-form?token=${props.token}`)
          const body = await dataProjectForm.json()
          console.log("body", body.user.formId)
props.saveForm(body.user.formId)
          setFormsList( body.user.formId)
    
         
        }
    
        findProjectForm()
      },[] )


      var deleteForm = async (_id) => {
    
        const deleteReq = await fetch('http://172.17.1.32:3000/project-form', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `formId=${_id}&token=${props.token}`,
    
        }) 
        const newForm = await deleteReq.json()
        console.log("newForm", newForm)
        setFormsList(newForm.newForm.formId)
        props.deleteForm(_id)
      }
    

var projectForm = props.formList.map((form, i) => {
    console.log("image", form.projectImg)
    return(
        
        <Card>
        <Card.Title>Projet </Card.Title>
        <Card.Divider/>
        {
          
            
              <View   >
                <Image
                 style={{ width: 200, height: 200 }}
                //   resizeMode="cover"
                  source={{ uri: form.projectImg} }
            
                />
                <Text >Style: {form.style}</Text>
                <Text >Zone à tatouer: {form.tattooZone}</Text>
                <Text > Taille:  {form.height} cm x {form.width} cm</Text>
                <Text > Description:  {form.description} </Text>
                <Text > Disponibilité:  {form.disponibility} </Text>
                <Button 
            title="Delete"
            type="solid"
            padding="30"
            color = '#424D41'
            
            onPress={() => deleteForm(form._id)}
     />
              </View>
            
          
        }
      </Card>
        
     
    
    
    )
})

    

    return (
        <View style={styles.container}>
        <HeaderComponent/>
        <ScrollView style={{flex:1,}} >
        <SafeAreaView style={{margin:40}}>
          
          {projectForm}
  
              



          </SafeAreaView> 
          </ScrollView>
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
    });


    function mapStateToProps(state){
        return { token:state.token, formList : state.formList}
      }

      function mapDispatchToProps(dispatch){
        return {
          deleteForm: function(_id){
            dispatch({type: 'deleteForm',
              _id: _id
            })
          },
          saveForm: function(dataSaveForm){
            dispatch({type: 'saveForm',
              dataSaveForm: dataSaveForm
            })
          }
        }
      }
      export default connect(
        mapStateToProps,
       mapDispatchToProps,
      )(AppointmentScreen);
      