import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image, Text, ScrollView, Modal, TextInput } from "react-native";
import { Card, Button } from "react-native-elements";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import HeaderComponent from "./HeaderComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';


function SearchResultScreen(props) {
  const [overlayVisibleCoeur, setOverlayVisibleCoeur] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [userExists, setUserExists] = useState(false);
  //erreur envoyé par le back
  const [listErrorsSignin, setErrorsSignin] = useState([]);

  //console.log('STATE FROM STORE:', props.saveTatoueurInfos)

  var handleSubmitSignin = async () => {
    const data = await fetch("http://192.168.0.38:3000/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `userEmailFromFront=${signInEmail}&userPasswordFromFront=${signInPassword}`,
    });

    const body = await data.json();

    if (body.result == true) {
      props.addDataUser(body.user);
      //console.log('user connected', body)
      AsyncStorage.setItem("dataUserToken", body.token);
      setUserExists(true);

      if (!userExists) {
        return setOverlayVisibleCoeur(false);
      }
    } else {
      setErrorsSignin(body.error);
    }
  };

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return (
      <Text style={{ textAlign: "center", color: "#BF5F5F" }}>{error}</Text>
    );
  });

  var handlePressAddFavorite = async (tattooId) => {
    const response = await fetch("http://192.168.0.38:3000/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `IdFromFront=${tattooId}&token=${props.dataUser.token}`,
    });
    //console.log("recupérer dataUser.token", props.dataUser.token);
  };

  // var handlePressDeleteFavorite = async () => {
  // const response = await fetch(`http://192.168.0.38:3000/favorites/${name}`, {
  //   method: 'DELETE'
  // })
  // }

  const searchResults = props.saveTatoueurInfos.map((tatoueur, i) => {
    const [tattooLiked, setTattooLiked] = useState(false);

    return (
      <TouchableOpacity
        onPress={() => {
          props.selectedArtistInfos(tatoueur),
            props.navigation.navigate("TattooArtist");
        }}
      >
        <Card containerStyle={styles.cards}>
          <Card.Image source={{ uri: tatoueur.galleryPhoto[0] }}>
            {props.dataUser == null ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setOverlayVisibleCoeur(true);
                  }}
                >
                  <Text style={{ left: "87%", top: "5%" }}>
                    <AntDesign
                      name="heart"
                      size={30}
                      style={{ color: tattooLiked ? "#BF5F5F" : "#454543" }}
                    />
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    handlePressAddFavorite(tatoueur._id),
                      setTattooLiked(!tattooLiked);
                  }}
                >
                  <AntDesign
                    name="heart"
                    size={30}
                    style={{
                      color: tattooLiked ? "#BF5F5F" : "#454543",
                      left: "87%",
                      top: "5%",
                    }}
                  />
                </TouchableOpacity>
              </>
            )}
          </Card.Image>

          <View style={styles.cardDesc}>
            <View>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#454543" }}
              >
                {tatoueur.firstName}
              </Text>
              <Text
                style={{
                  marginBottom: 10,
                  fontWeight: "bold",
                  paddingTop: 5,
                  color: "#454543",
                }}
              >
                {tatoueur.tattooShopAddress[0].tattooShop}
              </Text>
              <Text
                style={{ fontStyle: "italic", color: "rgba(69, 69, 67, 0.8)" }}
              >
                {tatoueur.styleList.join(", ")}
              </Text>
            </View>
            <View>
              <Text style={{ color: "#454543" }}>
                Attente: {tatoueur.schedule}
              </Text>
              <Text style={{ paddingTop: 5, color: "#454543" }}>
                {tatoueur.tattooShopAddress[0].city}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    )
  })

  return (
    <View style={styles.container}>
      <HeaderComponent navigation={props.navigation} />

      <ScrollView style={{ width: "90%", flex: 2 }}>
       
        {searchResults}

        <Modal
          animationType="slide"
          transparent={true}
          visible={overlayVisibleCoeur}
          onRequestClose={() => {
            setOverlayVisibleCoeur(!overlayVisibleCoeur);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textOverlay}>Mettre en favoris</Text>
              <View style={styles.continuer}>
                <Button
                  title="Continuer sans s'inscrire"
                  titleStyle={{ fontSize: 14 }}
                  buttonStyle={styles.greenButton}
                  type="solid"
                  onPress={() => setOverlayVisibleCoeur(false)}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Adresse email"
                onChangeText={setSignInEmail}
                value={signInEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                onChangeText={setSignInPassword}
                value={signInPassword}
                secureTextEntry
              />
              {tabErrorsSignin}
              <Button
                title="Se connecter"
                titleStyle={{ fontSize: 14 }}
                buttonStyle={styles.greenButton}
                type="solid"
                onPress={() => handleSubmitSignin()}
              />
              <View style={styles.inscription}>
                <Button
                  title="S'inscrire"
                  titleStyle={{ fontSize: 14 }}
                  buttonStyle={styles.greenButton}
                  type="solid"
                  onPress={() => {
                    setOverlayVisibleCoeur(false),
                      props.navigation.navigate("Inscription");
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
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
  header: {
    flex: 2,
    maxHeight: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  cardDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 2,
  },
  greenButton: {
    backgroundColor: "#424D41",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
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
    shadowColor: "#424D41",
    shadowOffset: {
      width: 100,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 10,
  },
});

function mapStateToProps(state) {
  return {
    saveTatoueurInfos: state.saveTatoueurInfos,
    dataUser: state.dataUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectedArtistInfos: function (artistInfos) {
      dispatch({ type: "selectedArtistInfos", artistInfos });
    },
    addDataUser: function (dataUser) {
      dispatch({ type: "addDataUser", dataUser: dataUser });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen);
