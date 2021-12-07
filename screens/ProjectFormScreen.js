import React, {useState} from 'react';
import { StyleSheet , Text, View, Button, ScrollView,  SafeAreaView, TextInput, Image, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import HeaderComponent from './HeaderComponent';

const title = [
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Mme.', value: 'Mme.' },
    { label: 'NC', value: 'NC' },
  ];

const style =[
    { label: 'Old School', value: 'Old School' },
    { label: 'New School', value: 'New School' },
    { label: 'Realism', value: 'Realism' },
    { label: 'Japonais', value: 'Japonais' },
    { label: 'Tribal', value: 'Tribal' },
    { label: 'Fineline', value: 'Fineline' },
    { label: 'Dotwork', value: 'Dotwork' },
    { label: 'Geometric', value: 'Geometric' },
    { label: 'Lettering', value: 'Lettering'},
]

const schedule = [
    { label: 'En soirée', value: 'En soirée' },
    { label: 'En journée', value: 'En journée' },
    { label: 'Les weekends', value: 'Les weekends' },
    { label: 'Peu importe', value: 'Peu importe' },
 
  ];
function ProjectFormScreen(props) {
    
        
        const [lastName, setLastName] = useState("");
        const [firstName, setFirstName] = useState("");
        const [email, setEmail] = useState("");
        const [phone, setPhone] = useState("");
        const [postalCode, setPostalCode] = useState("");
        const [city, setCity] = useState("");
        const [tattooZone, setTattooZone] = useState("");
        const [width, setWidth] = useState("");
        const [height, setHeight] = useState("");
        const [description, setDescription] = useState("");
        const [address, setAddress] = useState("");
        const [titleValue, setTitleValue] = useState(null);
        const [isFocus, setIsFocus] = useState(false);
        const [styleValue, setStyleValue] = useState(null);
        const [scheduleValue, setScheduleValue] = useState(null);
        const [tempUrl, setTempUrl] = useState("")
      
        
        let openImagePickerAsync = async () => {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
            if (permissionResult.granted === false) {
              alert('Permission to access camera roll is required!');
              return;
            }
        
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            console.log(pickerResult);
            var data = new FormData();
            data.append('avatar', {
            uri: pickerResult.uri,
            type: 'image/jpeg',
            name: 'avatar.jpg',
          });
          var rawResponse = await fetch('http://172.17.1.128:3000/upload', {
            method: 'POST',
            body: data
          });
          var response = await rawResponse.json();
        //   props.onSnap(response.url);
          setTempUrl(response.url);
          console.log("response", response)
            }


        async function handleClickAddForm () { {
            console.log("activation de la fonction")
         await fetch('http://172.17.1.128:3000/project-form', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `userProjectImgFromFront=${tempUrl}userStyleFromFront=${styleValue}&userDisponibilityFromFront=${scheduleValue}&userGenderFromFront=${titleValue}&userLastNameFromFront=${lastName}&userFirstNameFromFront=${firstName}&userEmailFromFront=${email}&userPhoneNumberFromFront=${phone}&userAddressFromFront=${address}&userPostalCodeFromFront=${postalCode}&userCityFromFront=${city}&usertattooZoneFromFront=${tattooZone}&userWidthFromFront=${width}&userHeightFromFront=${height}`
        })
        
      setTempUrl("")
    
        
        }}
      
      

    return (
        <View style={styles.container}>
        <HeaderComponent navigation={props.navigation}/>
        <ScrollView style={{flex:1,}} >
        <SafeAreaView style={{margin:40}}>
         <View style={styles.inlign}   >

        <Dropdown
         style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={title}
          containerStyle={{backgroundColor:'#F1EFE5', marginTop:-42}}
          activeColor={'#C2A77D'}
          maxHeight={100}
          labelField="label"
          valueField="value"
          placeholder='Civilité' 
          value={titleValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setTitleValue(item.value);
            setIsFocus(false);
          }}
        />
      
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Nom"
      />
     
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Prénom"
      
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Adresse email"
      
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        placeholder="Numéro de téléphone"
      
      />
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Adresse postale"
      
      />
       <View style={styles.inlign}   >
      <TextInput
        style={styles.input}
        onChangeText={setPostalCode}
        value={postalCode}
        placeholder="Code postal"
      
      />
      <TextInput
        style={styles.input}
        onChangeText={setCity}
        value={city}
        placeholder="Ville"
      
      />
      </View>

      <View style={styles.inlign}   >

      <Dropdown
         style={styles.input}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={style}
          containerStyle={{backgroundColor:'#F1EFE5', marginTop:-42}}
          activeColor={'#C2A77D'}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder='Style'
          searchPlaceholder="Chercher..."
          value={styleValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setStyleValue(item.value);
            setIsFocus(false);
          }}
         
        />
     
      <TextInput
        style={styles.input}
        onChangeText={setTattooZone}
        value={tattooZone}
        placeholder="Zone à tatouer "
      
      />
      </View>
      <View style={styles.inlign}   >
       <TextInput
        style={styles.input}
        onChangeText={setWidth}
        value={width}
        placeholder="Largeur (cm) "
      
      />
      <TextInput
        style={styles.input}
        onChangeText={setHeight}
        value={height}
        placeholder="Longueur (cm)"
      
      />
      </View>
      <Dropdown
         style={styles.input}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={schedule}
          containerStyle={{backgroundColor:'#F1EFE5', marginTop:10}}
          activeColor={'#C2A77D'}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder='Disponibilité'
          value={scheduleValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setScheduleValue(item.value);
            setIsFocus(false);
          }}
         
        />
      
     
      <TextInput
        style={{ flex:1,height: 80,margin: 5,borderWidth: 1, padding: 10,borderRadius:2}}
        onChangeText={setDescription}
        value={description}
        placeholder="Description du projet"
      
      />
      <View style={{ flex:1, flexdirection:"row",alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
      <TouchableOpacity onPress={openImagePickerAsync} >
        <Text > <MaterialIcons
                  name="save-alt"
                  size={20}
                  color="#C2A77D"/>
         Télécharger une image </Text>
      </TouchableOpacity>
       </View>
       
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center', marginTop: 10}} >
            <Button 
            title="Valider"
            type="solid"
            padding="30"
            color = '#424D41'
            
            onPress={() => handleClickAddForm()}
     />
     </View>
     
    </SafeAreaView>


     </ScrollView>
     
        </View>
    )
    
}


export default ProjectFormScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
      flexDirection : 'column',
      paddingTop : 50,
      backgroundColor: '#F1EFE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      margin: 5,
      borderWidth: 1,
      padding: 10,
      width: 300,
      borderRadius: 2,
      },
    inlign : {
      flexDirection : 'row',  
      alignItems : 'center',
      justifyContent: 'flex-start',
    },
    main: {
        flex:3,
        flexDirection : 'column',  
        alignItems : 'center',
        justifyContent: 'center',
    },
    dropdown: {
      height: 40,
      margin: 5,
      borderWidth: 1,
      padding: 10,
      width: 145,
      borderRadius: 2,
      paddingHorizontal: 8,
        backgroundColor: '#F1EFE5',
      },
      label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
        
      },
      selectedTextStyle: {
        fontSize: 16,
        
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        
      },
    });
    
  
    
     