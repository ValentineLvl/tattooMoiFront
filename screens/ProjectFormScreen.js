import React, {useState} from 'react';
import { StyleSheet , Text, View, Button, ScrollView,  SafeAreaView, TextInput, Image} from 'react-native';
import { Input } from 'react-native-elements'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';

const title = [
    { label: 'Mr.', value: '1' },
    { label: 'Mme.', value: '2' },
    { label: 'NC', value: '3' },
 
  ];

const style =[
    { label: 'Old School', value: '1' },
    { label: 'New School', value: '2' },
    { label: 'Realism', value: '3' },
    { label: 'Japonais', value: '4' },
    { label: 'Tribal', value: '5' },
    { label: 'Fineline', value: '6' },
    { label: 'Dotwork', value: '7' },
    { label: 'Geometric', value: '8' },
    { label: 'Lettering', value: '9' },
]

const schedule = [
    { label: 'En soirée', value: '1' },
    { label: 'En journée', value: '2' },
    { label: 'Les weekends', value: '3' },
    { label: 'Peu importe', value: '4' },
 
  ];
function ProjectFormScreen(props) {
    
        const [text, onChangeText] = React.useState("");
        const [lastName, onChangeLastName] = React.useState("");
        const [firstName, onChangeFirstName] = React.useState("");
        const [email, onChangeEmail] = React.useState("");
        const [phone, onChangePhone] = React.useState("");
        const [postalCode, onChangePostalCode] = React.useState("");
        const [city, onChangeCity] = React.useState("");
        const [tattooZone, onChangeTattooZone] = React.useState("");
        const [width, onChangeWidth] = React.useState("");
        const [height, onChangeHeight] = React.useState("");
        const [description, onChangeDescription] = React.useState("");
        const [address, onChangeAddress] = React.useState("");
        


        const [titleValue, setTitleValue] = useState(null);
        const [isFocus, setIsFocus] = useState(false);
        const [styleValue, setStyleValue] = useState(null);
        const [scheduleValue, setScheduleValue] = useState(null);
      
    
      
    return (
        <View style={styles.container}>
        <View style = {styles.header}>
                <Image 
                source = {require('../assets/tattoo-moi_1.png')}
                style={{ width: 200, height: 80, marginRight: 70 }} />
            <Button
            title="Connexion"
            buttonStyle = {{backgroundColor:'#424D41', padding:1, paddingRight:5, paddingLeft:5, borderRadius:5}}
            type="solid"
            onPress={() => props.navigation.navigate('Connexion')}
            />
            </View>
        <ScrollView style={{flex:1,}} >
        <SafeAreaView style={{margin:40}}>
         <View style={styles.inlign}   >

        <Dropdown
         style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={title}
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
        onChangeText={onChangeLastName}
        value={lastName}
        placeholder="Nom"
      />
     
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeFirstName}
        value={firstName}
        placeholder="Prénom"
      
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Adresse email"
      
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePhone}
        value={phone}
        placeholder="Numéro de téléphone"
      
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeAddress}
        value={address}
        placeholder="Adresse postale"
      
      />
       <View style={styles.inlign}   >
      <TextInput
        style={styles.input}
        onChangeText={onChangePostalCode}
        value={postalCode}
        placeholder="Code postal"
      
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeCity}
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
        onChangeText={onChangeTattooZone}
        value={tattooZone}
        placeholder="Zone à tatouer "
      
      />
      </View>
      <View style={styles.inlign}   >
       <TextInput
        style={styles.input}
        onChangeText={onChangeWidth}
        value={width}
        placeholder="Largeur (cm) "
      
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeHeight}
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
        onChangeText={onChangeDescription}
        value={description}
        placeholder="Description du projet"
      
      />
      <View style={{ flex:1, flexdirection:"row",alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
     
       <Text   >   <MaterialIcons
                  name="save-alt"
                  size={20}
                  color="#C2A77D"/>
         Télécharger une image </Text>
       </View>
       
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center', marginTop: 10}} >
            <Button 
            title="Valider"
            type="solid"
            padding="30"
            color = '#424D41'
            
            onPress={() => props.navigation.navigate('Selectionner Artist')}
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
      backgroundColor: '#F1EFE5',
        paddingTop : 50,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    
    },
    input: {
        flex:1,
        
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 2,
      },
    inlign : {
        flex: 1,
        flexDirection: "row"
    },
    header: {
        flex:2,  
        maxHeight : 80,
        flexDirection : 'row',
        alignItems : 'center',
       justifyContent :'space-evenly',
    },
    main: {
        flex:3,
        flexDirection : 'column',  
        alignItems : 'center',
        justifyContent: 'center',
    },
    dropdown: {
        flex:1,
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 2,
        backgroundColor: '#F1EFE5',
      },
    //   label: {
    //     position: 'absolute',
        
    //     left: 22,
    //     top: 8,
    //     zIndex: 999,
    //     paddingHorizontal: 8,
    //     fontSize: 14,
    //   },
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
    
