import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet , Text, View, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {connect} from 'react-redux'

function AppointmentScreen(props) {

    const [formsList, setFormsList] = useState([]);

    useEffect(() => {
        const findProjectForm = async () => {
          const dataProjectForm = await fetch('http://172.17.1.32:3000/project-form')
          const body = await dataProjectForm.json()
          console.log("body", body)
          setFormsList(body.projectForm)
    
         
        }
    
        findProjectForm()
      },[])

var projectForm = formsList.map((form, i) => {
    return(
        
        <Card>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider/>
        {
          
            
              <View key={i} >
                <Image
                  
                  resizeMode="cover"
                  source={{ uri: form.projectImg }}
                />
                <Text >{form.lastName}</Text>
              </View>
            
          
        }
      </Card>
        
     
    
    
    )
})

    

    return (
        <View style={styles.container}>
          
          
          {projectForm}
  
              



           
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });


    function mapStateToProps(state){
        return { token:state.token}
      }

      function mapDispatchToProps(dispatch){
        return {
          deleteToWishList: function(articleTitle){
            dispatch({type: 'deleteArticle',
              title: articleTitle
            })
          },
          saveForm: function(forms){
            dispatch({type: 'saveForms',
              forms: forms
            })
          }
        }
      }
      export default connect(
        mapStateToProps,
       null,
      )(AppointmentScreen);
      