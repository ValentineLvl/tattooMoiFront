import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const data = [
    { label: 'M.', value: '1' },
    { label: 'Mme', value: '2' },
    { label: 'NC', value: '3' },
    ];

export default function SignUpScreen() {

  //Const pour le dropdown
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [signUpLastName, setSignUpLastName] = useState('');
  const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhoneNumber, setSignUpPhoneNumber] = useState('');
  const [signUpAddress, setSignUpAddress] = useState('');
  const [signUpPostalCode, setSignUpPostalCode] = useState('');
  const [signUpCity, setSignUpCity] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignup, setErrorsSignup] = useState([]);

// const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={styles.label}>
//         </Text>
//       );
//     }
//     return null;
//   };

var handleSubmitSignup = async () => {
    
  const data = await fetch('http://172.17.1.128:3000/sign-up', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `userGenderFromFront=${value}&userLastNameFromFront=${signUpLastName}&userFirstNameFromFront=${signUpFirstName}&userEmailFromFront=${signUpEmail}&userPhoneNumberFromFront=${signUpPhoneNumber}&userAddressFromFront=${signUpAddress}&userPostalCodeFromFront=${signUpPostalCode}&userCityFromFront=${signUpCity}&userPasswordFromFront=${signUpPassword}`})

  const body = await data.json()

  if(body.result == true){
   // props.addToken(body.token)
   console.log('user creater');
    setUserExists(true)
    
  } else {
    setErrorsSignup(body.error)
  }
}

  var tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<p>{error}</p>)
  })

    return (
        <View style={styles.container}>
        <View style = {styles.header}>
            <Image 
            source = {require('../assets/tattoo-moi_1.png')}
            style={{ width: 200, height: 80 }} />
        </View>
        
        <ScrollView style = {styles.form}>
        <View style={styles.smallForm}>
        {/* {renderLabel()} */}
        <Dropdown
         style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          dropdownPosition={'bottom'}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder='Civilité' 
          containerStyle={{backgroundColor:'#F1EFE5', marginTop: -30}}
          activeColor={'#C2A77D'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}

        />
        <TextInput
            style={styles.smallInput}
            placeholder="Nom"
            onChangeText={setSignUpLastName}
            value={signUpLastName}
        />
        </View>
        <TextInput
            style={styles.input}
            placeholder="Prénom"
            onChangeText={setSignUpFirstName}
            value={signUpFirstName}
        />
        <TextInput
            style={styles.input}
            placeholder="Adresse email"
            onChangeText={setSignUpEmail}
            value={signUpEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Numéro de téléphone"
            onChangeText={setSignUpPhoneNumber}
            value={signUpPhoneNumber}
        />
        <TextInput
            style={styles.input}
            placeholder="Adresse postale"
            onChangeText={setSignUpAddress}
            value={signUpAddress}
        />
        <View style={styles.smallForm}>
        <TextInput
            style={styles.smallInput}
            placeholder="Code postal"
            onChangeText={setSignUpPostalCode}
            value={signUpPostalCode}
        />
        <TextInput
            style={styles.smallInput}
            placeholder="Ville"
            onChangeText={setSignUpCity}
            value={signUpCity}
        />
        </View>
        <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            onChangeText={setSignUpPassword}
            value={signUpPassword}
        />
        <TextInput
            style={styles.input}
            placeholder="Confirmation mot de passe"
            //onChangeText={onChangeText}
            //value={text}
        />
       
     <View style = {{ flex:4}}>

     <Button
            title="S'inscrire"
            buttonStyle = {{backgroundColor:'#424D41', borderRadius:2, marginTop: 30, alignSelf:'center'}}
            type="solid"
            onPress={() => handleSubmitSignup()}
        />

        <Button
            title=" S'inscrire avec Google"
            buttonStyle = {{backgroundColor:'#C2A77D', borderRadius:2, marginBottom: 10, marginTop: 50, alignSelf:'center'}}
            type="solid"
            icon={<Ionicons
                name='logo-google'
                size={30}
                color='#F1EFE5'
            />}
            //onPress={() => props.navigation.navigate('Connexion')}
        />
        <Button
            title=" S'inscrire avec Facebook"
            buttonStyle = {{backgroundColor:'#C2A77D', borderRadius:2, alignSelf:'center'}}
            type="solid"
            icon={<FontAwesome
                name='facebook'
                size={30}
                color='#F1EFE5'
            />}
            //onPress={() => props.navigation.navigate('Connexion')}
        />
        </View>
        </ScrollView>
    </View>
)
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection : 'column',
  paddingTop : 50,
  backgroundColor: '#F1EFE5',
  alignItems: 'center',
  justifyContent: 'center',
},
header: {
  maxHeight : 80,
},
form: {
    flex:3,
    marginTop: 20,
},
smallForm: {
    flexDirection : 'row',  
    alignItems : 'center',
    justifyContent: 'flex-start',
},
input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 2,
  },
  smallInput: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: 145,
    borderRadius: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  dropdown: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: 145,
    borderRadius: 2,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#F1EFE5',
    fontSize: 14,
  },
// inscriptionRS: {
//     flex:4,
//     flexDirection : 'column',  
//     alignItems : 'center',
//     justifyContent: 'center',
//     //marginTop : 270,
// },

});