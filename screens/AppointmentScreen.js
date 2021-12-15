import React, { useEffect, useState } from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaViewBase,
  TouchableOpacity,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import HeaderComponent from "./HeaderComponent";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AppointmentScreen(props) {
  const [formsList, setFormsList] = useState([]);
  const [tattooInfo, setTattooInfo] = useState([]);
  // const [userForms, setUserForms] = useState(false);
  const [address, setAddress] = useState([]);
 const [formId, setFormId] = useState([]);

  useEffect(() => {
    console.log("App is loaded");

    const findProjectForm = async () => {
      const dataProjectForm = await fetch(
        `http://172.17.1.128:3000/project-form?token=${props.dataUser.token}&tattooIdFromFront=${formId}`
      );
      const body = await dataProjectForm.json();

      props.saveForm(body.user.formId);
      setFormsList(body.user.formId);

      // setTattooInfo(body.project)
      // setAddress(body.address)
      //    console.log( "BOOOUHHH",formslist)
    };

    findProjectForm();

  }, []);

  var deleteForm = async (id) => {
    const deleteReq = await fetch("http://172.17.1.128:3000/project-form", {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `formId=${id}&token=${props.dataUser.token}`,
    });
    const newForm = await deleteReq.json();
    //console.log("newForm", newForm)
    setFormsList(newForm.newForm.formId);
    props.deleteForm(id);
  };

  var projectForm = props.formList.map((form, i) => {
    console.log("image", form.confirmationFormSchema[0].status);
    // {
    //   form.confirmationFormSchema[0].status == "Accepté" ? (
    //     <View>
    //       <Text style={styles.text}>
    //         Date proposée: {form.confirmationFormSchema[0].date}{" "}
    //       </Text>
    //       <Text style={styles.text}>
    //         Prix estimé: {form.confirmationFormSchema[0].price} euros
    //       </Text>
    //       <Text style={styles.text}>
    //         Commentaire du tatoueur: {form.confirmationFormSchema[0].comment}{" "}
    //       </Text>{" "}
    //     </View>
    //   ) : null;
    // }

    return (
      <Card key={i} containerStyle={styles.cards}>
        <View>
          <Card.Image source={{ uri: form.projectImg }}>
            <TouchableOpacity onPress={() => deleteForm(form._id)}>
              <Text style={{ left: "89%", top: "5%" }}>
                <MaterialCommunityIcons
                  name="trash-can"
                  size={30}
                  color="#F1EFE5"
                />
              </Text>
            </TouchableOpacity>
          </Card.Image>
          <View style={styles.cardDesc}>
            <Text
              style={{
                marginBottom: 10,
                fontWeight: "bold",
                paddingTop: 5,
                color: "#454543",
              }}
            >
              {" "}
              Projet : {form.request}
            </Text>

            <Text
              style={{ fontWeight: "bold", paddingTop: 5, color: "#454543" }}
            >
              {" "}
              Tatoueur: {form.tattooProjectId[0].firstName}{" "}
            </Text>
            <Text
              style={{ marginBottom: 10, fontWeight: "bold", color: "#454543" }}
            >
              {" "}
              Adresse : {
                form.tattooProjectId[0].tattooShopAddress[0].address
              }, {form.tattooProjectId[0].tattooShopAddress[0].postalCode},{" "}
              {form.tattooProjectId[0].tattooShopAddress[0].city}{" "}
            </Text>
            <Text style={styles.text}>Style: {form.style}</Text>
            <Text style={styles.text}>Zone à tatouer: {form.tattooZone}</Text>
            <Text style={styles.text}>
              Taille: {form.heigth} cm x {form.width} cm
            </Text>
            <Text style={styles.text}>Description: {form.description} </Text>
            <Text style={styles.text}>
              Disponibilité: {form.disponibility}{" "}
            </Text>

            <Text
              style={{
                marginBottom: 10,
                fontWeight: "bold",
                paddingTop: 5,
                color: "#454543",
              }}
            >
              Statut de la demande: {form.confirmationFormSchema[0].status}{" "}
            </Text>
            <Text>
              {form.confirmationFormSchema[0].status == "Accepté" ? (
                <>
                  <View>
                    <Text style={{ fontWeight: "bold", color: "#454543" }}>
                      Proposition du tatoueur:{" "}
                    </Text>
                    <Text style={styles.text}>
                      Date proposée: {form.confirmationFormSchema[0].date}{" "}
                    </Text>
                    <Text style={styles.text}>
                      Prix estimé: {form.confirmationFormSchema[0].price} euros
                    </Text>
                    <Text style={styles.text}>
                      Commentaire: {form.confirmationFormSchema[0].comment}{" "}
                    </Text>
                  </View>{" "}
                </>
              ) : null}{" "}
            </Text>
          </View>
        </View>
      </Card>
    );
  });
  console.log('PROPS FORMIST',props.formList);
  return (
    <View style={styles.container}>
      <HeaderComponent navigation={props.navigation} />
      
      {
      props.dataUser !== null && props.formList.length !== 0 ? (
      <ScrollView style={{ width: "90%", flex: 2 }}>{projectForm}</ScrollView>
      ) : (
      <View style={{flex:3, justifyContent:'center', padding:40}}>
                <Text style={{color:'#BF5F5F', textAlign:'center', fontSize:14}}>Veuillez vous inscrire ou vous connecter pour accéder à cette page</Text>
                </View>
                )}
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
  cardDesc: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: "#F1EFE5",
  },
  cards: {
    padding: 0,
    borderWidth: 0.1,
    borderColor: "#454543",
  },
  text: {
    color: "#454543",
  },
});

function mapStateToProps(state) {
  return { dataUser: state.dataUser, formList: state.formList };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteForm: function (_id) {
      dispatch({
        type: "deleteForm",
        _id: _id,
      });
    },
    saveForm: function (dataSaveForm) {
      dispatch({
        type: "saveForm",
        dataSaveForm: dataSaveForm,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScreen);
