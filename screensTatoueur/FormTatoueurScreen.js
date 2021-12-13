import React, {useState} from 'react'
import {  StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, TouchableOpacity, Modal } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import HeaderComponent from '../screens/HeaderComponent';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';



function FormTatoueurScreen(props) {
    const [comment, setComment] = useState("")
    const [price, setPrice] = useState("")
    const [date, setDate] = useState("")
    const [overlayVisibleConfirm, setOverlayVisibleConfirm] = useState(false);
    const [overlayVisibleRefuse, setOverlayVisibleRefuse] = useState(false);

    const Confirm = () => {
        setOverlayVisibleConfirm(!overlayVisibleConfirm);
      };
    
    const Refuse = () => {
        setOverlayVisibleRefuse(!overlayVisibleRefuse);
      };

    return (
        
    <View style={styles.container}>
    <HeaderComponent navigation={props.navigation}/>
    <ScrollView style={{ width: '90%', flex: 2 }} >
    {props.formList.map((form, i) =>(
    <Card  containerStyle={styles.cardDesc}>
    <Text style={styles.titlePage}>Demande: {form.request} </Text>
    <Text style={styles.titre}>Par : {form.gender} {form.firstName} {form.lastName}</Text>
        <View style={{ flexDirection: "row"}}>
        <View style={{marginRight:40}}>
        <Text style={styles.titre}>Zone à tatouer:</Text>
            <Text style={styles.Info}>{form.tattooZone}</Text>
        </View>
        <View>
        <Text style={styles.titre}>Style:</Text>
            <Text style={styles.Info}>{form.style}</Text>
        </View>
        </View>
        <View style={{ flexDirection: "row"}}>
        <View style={{marginRight:93}}> 
        <Text style={styles.titre}>Hauteur:</Text>
            <Text style={styles.Info}>{form.heigth} cm</Text>
        </View>
        <View>
        <Text style={styles.titre}>Longueur:</Text>
            <Text style={styles.Info}>{form.width} cm</Text>
        </View>
        </View>
        <Text style={styles.titre}>Description du projet:</Text>
            <Text style={styles.Info}>{form.description}</Text>
        <Text style={styles.titre}>Disponibilité:</Text>
            <Text style={styles.Info}>{form.disponibility}</Text>
        <Text style={styles.titre}>Idée du projet:</Text>
        <Card.Image source={{ uri: form.projectImg }} />
        
        <View style={{flexDirection: "row", alignSelf: "center"}}>
        <TouchableOpacity style={{marginRight: 20}} onPress={() => Confirm()}>
                        <Text >
                        <Entypo
                                    name="check"
                                    size={27}
                                    color="#008000"  
                                />
                                </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => Refuse()}>
                        <Text >
                        <Entypo
                                    name="cross"
                                    size={30}
                                    color="#FF0000"  
                                />
                                </Text>
                                </TouchableOpacity>
        </View>
        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={overlayVisibleConfirm}
                        onRequestClose={() => {
                        setOverlayVisibleConfirm(!overlayVisibleConfirm);
                        }}
                    >
                         <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.textOverlay}>Proposition de rendez-vous</Text>
                    <View style={styles.continuer}>
      
        <TextInput
                                style={styles.input}
                                onChangeText={setDate}
                                value={date}
                                placeholder="Date proposée"
                            />
        <TextInput
                                style={styles.input}
                                onChangeText={setPrice}
                                value={price}
                                placeholder="Tarif estimé"
                            />
      
        <TextInput
                                style={styles.input}
                                onChangeText={setComment}
                                value={comment}
                                placeholder="Commentaire"
                            />

<Button
                    title="Envoyer confirmation"
                    titleStyle={{fontSize:14}}
                    buttonStyle={styles.greenButton}
                    type="solid"
                    onPress={() => Confirm()}
                />
                              </View>
                        </View>
                </View>
        </Modal>

        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={overlayVisibleRefuse}
                        onRequestClose={() => {
                        setOverlayVisibleRefuse(!overlayVisibleRefuse);
                        }}
                    >
                         <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.textOverlay}>Refus de rendez-vous</Text>
                    <View style={styles.continuer}>
                    <Text style={styles.text}> Veuillez cliquer sur le bouton ci-dessous pour confirmer le refus</Text>
                    <Button
                    title="Confirmer le refus"
                    titleStyle={{fontSize:14}}
                    buttonStyle={styles.greenButton}
                    type="solid"
                    onPress={() => Confirm()}
                />
                   
                    </View>
                        </View>
                </View>
            
        </Modal>
 </Card>
    ))}
 </ScrollView>
</View>
)
}

const styles = StyleSheet.create({
container: {
  flex: 1,
paddingTop : 50,
  backgroundColor: '#F1EFE5',
  alignItems: 'center',
  justifyContent: 'center',
},
main: {
    flex:3,  
    flexDirection : 'column',
    alignItems : 'flex-start',
    justifyContent :'flex-start',
    marginTop:30,
    borderColor :'#454543'
},
titre :{
    fontSize:16,
    fontWeight: 'bold',
    color: '#454543',
    
    
},
titlePage :{
    fontSize:22,
    textAlign : "center",
    fontWeight: 'bold',
    color: '#454543',
    marginBottom : 20
    
},
Info: {
    fontSize:16,
    color: '#C2A77D',
    marginBottom:10,
},
input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 2,
},
textOverlay: {
    fontSize:14,
    fontWeight:'bold',
    color:'#424D41',
    textAlign: 'center',
    textDecorationLine:'underline',
},
continuer: {
    marginTop:10,
    marginBottom:10,
},
inscription: {
    marginTop:20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F1EFE5",
    borderRadius: 2,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
shadowOffset: {
  width: 100,
  height: 20
},
shadowOpacity: 0.5,
shadowRadius: 4,
elevation: 15
},
greenButton: {
    backgroundColor: '#424D41',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
},
cardDesc: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingTop: 5,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 10,
    backgroundColor: '#F1EFE5',
    borderWidth: 1,
    borderColor :'#454543',
    marginTop: 30
},
text: {
    fontSize:14,
    fontWeight:'bold',
    color:'#424D41',
    textAlign: 'center',
 }

});


function mapStateToProps(state){
    return {dataUser:state.dataUser, formList: state.formList}
  }

  

  export default connect (
    mapStateToProps,
    null
  ) (FormTatoueurScreen);
