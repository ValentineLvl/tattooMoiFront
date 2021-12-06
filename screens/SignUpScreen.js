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

const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);

const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={styles.label}>
        </Text>
      );
    }
    return null;
  };

    return (
        <View style={styles.container}>
        <View style = {styles.header}>
            <Image 
            source = {require('../assets/tattoo-moi_1.png')}
            style={{ width: 200, height: 80, marginRight: 70 }} />
            <Button
            title="Connexion"
            buttonStyle = {{backgroundColor:'#424D41', padding:1, paddingRight:5, paddingLeft:5, borderRadius:2}}
            type="solid"
            onPress={() => props.navigation.navigate('Connexion')}
            />
        </View>
        
        <ScrollView style = {styles.form}>
        <View style={styles.smallForm}>
        {renderLabel()}
        <Dropdown
         style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          //dropdownPosition='top'
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder='Civilité' 
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
            //onChangeText={onChangeText}
            //value={text}
        />
        </View>
        <TextInput
            style={styles.input}
            placeholder="Prénom"
            //onChangeText={onChangeText}
            //value={text}
        />
        <TextInput
            style={styles.input}
            placeholder="Adresse email"
            //onChangeText={onChangeText}
            //value={text}
        />
        <TextInput
            style={styles.input}
            placeholder="Numéro de téléphone"
            //onChangeText={onChangeText}
            //value={text}
        />
        <TextInput
            style={styles.input}
            placeholder="Adresse postale"
            //onChangeText={onChangeText}
            //value={text}
        />
        <View style={styles.smallForm}>
        <TextInput
            style={styles.smallInput}
            placeholder="Code postal"
            //onChangeText={onChangeText}
            //value={text}
        />
        <TextInput
            style={styles.smallInput}
            placeholder="Ville"
            //onChangeText={onChangeText}
            //value={text}
        />
        </View>
        <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            //onChangeText={onChangeText}
            //value={text}
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
            //onPress={() => props.navigation.navigate('Connexion')}
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
    flex:2,  
    maxHeight : 80,
    flexDirection : 'row',
    alignItems : 'center',
   justifyContent :'space-evenly',
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