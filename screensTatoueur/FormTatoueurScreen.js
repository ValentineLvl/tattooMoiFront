import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Card, Button } from "react-native-elements";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import HeaderComponent from "../screens/HeaderComponent";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FormTatoueurScreen(props) {
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [overlayVisibleConfirm, setOverlayVisibleConfirm] = useState(false);
  const [overlayVisibleRefuse, setOverlayVisibleRefuse] = useState(false);
  const [status, setStatus] = useState(props.formId.confirmationFormSchema[0].status);

  var RDV = "Rendez-vous";

  const Confirm = () => {
    setOverlayVisibleConfirm(!overlayVisibleConfirm);
    setStatus("Accepté");
  };

  const Refuse = () => {
    setOverlayVisibleRefuse(!overlayVisibleRefuse);
    setStatus("refusé");
  };

  async function handleClickSendConfirm() {
    {
      console.log("activation de la fonction");
      // console.log("STATUS", status)
      console.log("ID", props.formId.confirmationFormSchema[0]._id);
      // console.log("ID", props.dataUser.firstName)

      const dataConfirm = await fetch('https://tattoomoibackend.herokuapp.com/send-confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `confirmId=${props.formId.confirmationFormSchema[0]._id}&statusFromFront=${status}&formId=${props.formId._id}&dateFromFront=${date}&priceFromFront=${price}&commentFromFront=${comment}`
            })
            const body = await dataConfirm.json()
            console.log("c la", body.formSaved)
                // saveFormId(body.formSaved)
                setOverlayVisibleConfirm(!overlayVisibleConfirm)
            // }
            // console.log(tempUrl);

                const dataForm = await fetch(`https://tattoomoibackend.herokuapp.com/appointment-tattoo?id=${props.dataTattoo._id}`)
                const body2 = await dataForm.json();
                
                props.saveForm(body2.form)
                setForm(body2.form)
    
            
            console.log("formList", props.formList)
  }       
        }
           

  async function handleClickSendRefuse() {
    {
      console.log("activation de la refus");
      // console.log("STATUS", status)
      console.log("ID", props.formList[0]._id);
      // console.log("ID", props.dataUser.firstName)

            const dataRefuse = await fetch('https://tattoomoibackend.herokuapp.com/send-confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `confirmId=${props.formList[0].confirmationFormSchema[0]._id}&statusFromFront=${status}&formId=${props.formList[0]._id}`
            })
            const body = await dataRefuse.json()
               
                setOverlayVisibleRefuse(!overlayVisibleRefuse)
            
                const dataForm = await fetch(`https://tattoomoibackend.herokuapp.com/appointment-tattoo?id=${props.dataTattoo._id}`)
                const body2 = await dataForm.json();
                
                props.saveForm(body2.form)
                setForm(body2.form)
      
            console.log("formList", props.formList)
          
        }
    }


  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView style={{ width: "90%", flex: 2 }}>
        <Card containerStyle={styles.cardDesc}>
          <Text style={styles.titlePage}>Demande: {props.formId.request} </Text>
          <Text style={styles.titre}>
            Par : {props.formId.gender} {props.formId.firstName}{" "}
            {props.formId.lastName}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 40 }}>
              <Text style={styles.titre}>Zone à tatouer:</Text>
              <Text style={styles.Info}>{props.formId.tattooZone}</Text>
            </View>
            <View>
              <Text style={styles.titre}>Style:</Text>
              <Text style={styles.Info}>{props.formId.style}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 93 }}>
              <Text style={styles.titre}>Hauteur:</Text>
              <Text style={styles.Info}>{props.formId.heigth} cm</Text>
            </View>
            <View>
              <Text style={styles.titre}>Longueur:</Text>
              <Text style={styles.Info}>{props.formId.width} cm</Text>
            </View>
          </View>
          <Text style={styles.titre}>Description du projet:</Text>
          <Text style={styles.Info}>{props.formId.description}</Text>
          <Text style={styles.titre}>Disponibilité:</Text>
          <Text style={styles.Info}>{props.formId.disponibility}</Text>
          <Text style={styles.titre}>Idée du projet:</Text>
          <Card.Image source={{ uri: props.formId.projectImg }} />
          {status == "En attente" ? 
            
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => Confirm()}
                >
                  <Text>
                    <Entypo name="check" size={27} color="#008000" />
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
        
        : (status == "Accepté")?<Text style={{textAlign :"center", color:"#008000"}}> {status} </Text>:<Text style={{textAlign :"center", color:"#FF0000"}}> {status} </Text>
 } 
        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={overlayVisibleConfirm}
                        onRequestClose={() => {
                        console.log(status)
                        setOverlayVisibleConfirm(!overlayVisibleConfirm);
                        }}
                        
                    >
                         <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.textOverlay}>Proposition de {props.formId.type}</Text>
                    <View style={styles.continuer}>
           
{props.formId.type == RDV ? (<>
        <TextInput
                                style={styles.input}
                                onChangeText={setDate}
                                value={date}
                                placeholder="Date proposée"
                            /> 
                            </>) : null}

        <TextInput
                                style={styles.input}
                                onChangeText={setPrice}
                                value={price}
                                placeholder="Tarif estimé"
                            />
      
        <TextInput
                                style={styles.commentInput}
                                onChangeText={setComment}
                                value={comment}
                                multiline
                                numberOfLines={5}
                                maxLength={300}
                                placeholder="Commentaire"
                            />

                  <Button
                    title="Envoyer confirmation"
                    titleStyle={{ fontSize: 14 }}
                    buttonStyle={styles.greenButton}
                    type="solid"
                    onPress={() => handleClickSendConfirm()}
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
                    <Text style={styles.textOverlay}>Refus de {props.formId.type}</Text>
                    <View style={styles.continuer}>
                    <Text style={styles.text}> Veuillez cliquer sur le bouton ci-dessous pour confirmer le refus</Text>
                    <Button
                    title="Envoyer le refus"
                    titleStyle={{ fontSize: 14 }}
                    buttonStyle={styles.greenButton}
                    type="solid"
                    onPress={() => handleClickSendRefuse()}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F1EFE5",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 3,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 30,
    borderColor: "#454543",
  },
  titre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#454543",
  },
  titlePage: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "#454543",
    marginBottom: 20,
  },
  Info: {
    fontSize: 16,
    color: "#C2A77D",
    marginBottom: 10,
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#424D41",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  continuer: {
    marginTop: 10,
    marginBottom: 10,
  },
  inscription: {
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 15,
  },
  greenButton: {
    backgroundColor: "#424D41",
    borderRadius: 2,
    alignSelf: "center",
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
    backgroundColor: "#F1EFE5",
    borderWidth: 1,
    borderColor: "#454543",
    marginTop: 30,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#424D41",
    textAlign: "center",
  },
  hiddenInput: {
    width: 0,
    height: 0,
  },
  commentInput: {
    textAlignVertical: 'top',
    height: 90,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
    width: 300
},
});


function mapStateToProps(state){
    return {dataTattoo:state.dataTattoo, formList: state.formList, formId : state.formId}
  }

  function mapDispatchToProps(dispatch) {
    return {
  saveForm: function (dataSaveForm) {
    dispatch({
      type: "saveForm",
      dataSaveForm: dataSaveForm,
    });
  },

 }
  }

  export default connect (
    mapStateToProps,
    mapDispatchToProps
  ) (FormTatoueurScreen);
