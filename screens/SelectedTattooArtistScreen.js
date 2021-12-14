import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  TextInput,
  Modal
} from "react-native";
import { Button } from "react-native-elements";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

import HeaderComponent from "./HeaderComponent";

function SelectedTattooArtistScreen(props) {

  //etats du coeur favoris
  const [tattooLiked, setTattooLiked] = useState(false);
  const [tattooInFavorites, setTattooInFavorites] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  //etats des modals
  const [overlayVisibleDevis, setOverlayVisibleDevis] = useState(false);
  const [overlayVisibleRDV, setOverlayVisibleRDV] = useState(false);
  const [overlayVisibleCoeur, setOverlayVisibleCoeur] = useState(false);
  //etats de connexion
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [userExists, setUserExists] = useState(false);
  //erreur envoyé par le back
  const [listErrorsSignin, setErrorsSignin] = useState([]);

  useEffect(() => {
    console.log("Favoris is loaded");
    const findFavorites = async () => {
      const dataFavorites = await fetch(
        `http://192.168.0.38:3000/favorites?token=${props.dataUser.token}`
      );
      const body = await dataFavorites.json();
      //console.log("récupérer le favoris body", body.user.tattooId)
      //props.saveForm(body.user.formId)
      setFavoritesList(body.user.tattooId);
      setTattooInFavorites(true);
    };
    findFavorites();
  }, []);

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

  var colorHeart;
  if (tattooLiked) {
    colorHeart = { color: "#BF5F5F" };
  } else {
    colorHeart = { color: "#454543" };
  }

  if (tattooInFavorites) {
    colorHeart = { color: "#BF5F5F" };
  } else {
    colorHeart = { color: "#454543" };
  }

  //console.log('tattooLiked 2', tattooLiked);

  var handlePressAddFavorite = async (tattooId) => {
    setTattooLiked(!tattooLiked);

    const response = await fetch("http://192.168.0.38:3000/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `IdFromFront=${tattooId}&token=${props.dataUser.token}`,
    });
    //console.log("recupérer dataUser.token", props.dataUser.token);
  };

  const handlePressDevis = () => {
    setOverlayVisibleDevis(!overlayVisibleDevis);
  };

  const handlePressRDV = () => {
    setOverlayVisibleRDV(!overlayVisibleRDV);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent navigation={props.navigation} />
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View key={1} style={{ alignItems: "center" }}>
          <Image
            key={2}
            source={{ uri: props.selectedArtistInfos.profilePicture }}
            style={styles.imgTatoueur}
          />

          <Text
            key={3}
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#454543",
              marginTop: 10,
            }}
          >
            {props.selectedArtistInfos.firstName}
          </Text>
          {props.selectedArtistInfos.tattooShopAddress.map((address) => {
            return (
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 10,
                  fontWeight: "bold",
                  color: "#454543",
                }}
              >
                {address.tattooShop}
              </Text>
            );
          })}
          {props.dataUser == null ? (
            <TouchableOpacity
              onPress={() => setOverlayVisibleCoeur(true)}
              style={{ marginTop: -60, marginLeft: 180 }}
            >
              <Text>
                <AntDesign name="heart" size={30} style={colorHeart} />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                handlePressAddFavorite(props.selectedArtistInfos._id)
              }
              style={{ marginTop: -60, marginLeft: 180 }}
            >
              <Text>
                <AntDesign name="heart" size={30} style={colorHeart} />
              </Text>
            </TouchableOpacity>
          )}

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

          <View style={{ alignItems: "center" }}>
            {props.selectedArtistInfos.tattooShopAddress.map((address) => {
              return (
                <Text
                  key={30}
                  style={{ fontSize: 18, color: "#454543", marginTop: 20 }}
                >
                  {address.address} {address.postalCode} {address.city}
                </Text>
              );
            })}
            <Text
              key={5}
              style={{ fontSize: 18, paddingTop: 5, color: "#454543" }}
            >
              Temps d'attente:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {props.selectedArtistInfos.schedule}
              </Text>
            </Text>
          </View>
        </View>

        <View key={6} style={styles.btnGroup}>
          {props.selectedArtistInfos.styleList.map((style) => {
            return (
              <Button
                title={`#${style}`}
                type="solid"
                buttonStyle={styles.button}
                titleStyle={{
                  color: "#C2A77D",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              />
            );
          })}
        </View>

        <View key={7} style={styles.ig}>
          <AntDesign
            name="instagram"
            size={30}
            color="#454543"
            style={{ marginRight: 5, marginTop: 6 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "left",
              marginTop: 3,
              color: "#454543",
            }}
          >
            Instagram
          </Text>
        </View>
        <View
          key={8}
          style={{
            width: "90%",
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {props.selectedArtistInfos.galleryPhoto.map((photo) => {
            return (
              <Image
                source={{ uri: photo }}
                style={{ width: 80, height: 70, margin: 10 }}
              />
            );
          })}
        </View>

        <Button
          key={9}
          title="En voir plus"
          onPress={() =>
            Linking.openURL(
              `instagram://user?username=${props.selectedArtistInfos.instagram}`
            )
          }
          buttonStyle={{
            backgroundColor: "#F1EFE5",
            padding: 2,
            borderBottomWidth: 1,
            borderBottomColor: "#454543",
            marginBottom: 15,
          }}
          titleStyle={{ color: "#454543" }}
          type="solid"
        />

        <View
          key={10}
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 20,
          }}
        >
          <AntDesign
            onPress={() =>
              Linking.openURL(`http://${props.selectedArtistInfos.website}`)
            }
            name="earth"
            size={20}
            color="#454543"
            style={{ marginRight: 10, marginTop: 10 }}
          />
          <Text
            onPress={() =>
              Linking.openURL(`http://${props.selectedArtistInfos.website}`)
            }
            style={{ marginTop: 3, fontSize: 16 }}
          >
            {props.selectedArtistInfos.website}
          </Text>
        </View>

        <View
          key={11}
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 10,
          }}
        >
          <Feather
            key={111}
            onPress={() =>
              Linking.openURL(`tel:${props.selectedArtistInfos.phoneNumber}`)
            }
            name="phone"
            size={20}
            color="#454543"
            style={{ marginRight: 10, marginTop: 8 }}
          />
          <Text
            key={12}
            onPress={() =>
              Linking.openURL(`tel:${props.selectedArtistInfos.phoneNumber}`)
            }
            style={{ marginTop: 3, fontSize: 16 }}
          >
            {props.selectedArtistInfos.phoneNumber}
          </Text>
        </View>

        <View
          key={13}
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 10,
          }}
        >
          <MaterialIcons
            key={14}
            onPress={() =>
              Linking.openURL(`mailto:${props.selectedArtistInfos.email}`)
            }
            name="alternate-email"
            size={20}
            color="#454543"
            style={{ marginRight: 10, marginTop: 10 }}
          />
          <Text
            key={15}
            onPress={() =>
              Linking.openURL(`mailto:${props.selectedArtistInfos.email}`)
            }
            style={{ marginTop: 3, fontSize: 16 }}
          >
            {props.selectedArtistInfos.email}
          </Text>
        </View>
        <View key={16} style={{ flexDirection: "row" }}>
          <AntDesign
            key={17}
            name="facebook-square"
            onPress={() => Linking.openURL("fb://page/")}
            size={32}
            color="#454543"
            style={{ marginTop: 30, marginRight: 10 }}
          />
          <AntDesign
            key={18}
            name="instagram"
            onPress={() =>
              Linking.openURL(
                `instagram://user?username=${props.selectedArtistInfos.instagram}`
              )
            }
            size={32}
            color="#454543"
            style={{ marginTop: 30 }}
          />
        </View>

        <View key={19} style={{ flexDirection: "row", marginBottom: 40 }}>
          {props.dataUser == null ? (
            <>
              <Button
                title="Demande devis"
                type="solid"
                buttonStyle={{
                  backgroundColor: "#C2A77D",
                  marginTop: 40,
                  marginRight: 30,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                onPress={() => handlePressDevis()}
              />
            </>
          ) : (
            <Button
              title="Demande devis"
              type="solid"
              buttonStyle={{
                backgroundColor: "#C2A77D",
                marginTop: 40,
                marginRight: 30,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onPress={() => props.navigation.navigate("Formulaire")}
            />
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={overlayVisibleDevis}
            onRequestClose={() => {
              setOverlayVisibleDevis(!overlayVisibleDevis);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textOverlay}>Prendre un RDV</Text>
                <View style={styles.continuer}>
                  <Button
                    title="Continuer sans s'inscrire"
                    titleStyle={{ fontSize: 14 }}
                    buttonStyle={styles.greenButton}
                    type="solid"
                    onPress={() => {
                      handlePressRDV(), props.navigation.navigate("Formulaire");
                    }}
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
                      setOverlayVisibleDevis(false),
                        props.navigation.navigate("Inscription");
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          {props.dataUser == null ? (
            <Button
              title="Demande RDV"
              type="solid"
              buttonStyle={{
                backgroundColor: "#C2A77D",
                marginTop: 40,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onPress={() => handlePressRDV()}
            />
          ) : (
            <Button
              title="Demande RDV"
              type="solid"
              buttonStyle={{
                backgroundColor: "#C2A77D",
                marginTop: 40,
                marginRight: 30,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onPress={() => props.navigation.navigate("Formulaire")}
            />
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={overlayVisibleRDV}
            onRequestClose={() => {
              setOverlayVisibleRDV(!overlayVisibleRDV);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textOverlay}>Prendre un RDV</Text>
                <View style={styles.continuer}>
                  <Button
                    title="Continuer sans s'inscrire"
                    titleStyle={{ fontSize: 14 }}
                    buttonStyle={styles.greenButton}
                    type="solid"
                    onPress={() => {
                      handlePressRDV(), props.navigation.navigate("Formulaire");
                    }}
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
                      setOverlayVisibleRDV(false),
                        props.navigation.navigate("Inscription");
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 50,
    backgroundColor: "#F1EFE5",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    maxHeight: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#424D41",
    padding: 10,
    //width: 100,
  },
  btnGroup: {
    marginTop: 20,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  greenButton: {
    backgroundColor: "#424D41",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  imgTatoueur: {
    marginTop: 10,
    width: 135,
    height: 135,
    borderRadius: 75,
  },
  ig: {
    flexDirection: "row",
    marginTop: 30,
    width: "90%",
  },
  input: {
    height: 40,
    margin: 12,
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
});

function mapStateToProps(state) {
  return {
    selectedArtistInfos: state.selectedArtistInfos,
    dataUser: state.dataUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDataUser: function (dataUser) {
      dispatch({ type: "addDataUser", dataUser: dataUser });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedTattooArtistScreen);
