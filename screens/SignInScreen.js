import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function SignInScreen(props) {

    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

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
            
        <View style = {styles.button}>
            <Button
                title="Continuer sans s'inscrire"
                buttonStyle = {{backgroundColor:'#424D41', borderRadius:2}}
                type="solid"
                //onPress={() => props.navigation.navigate('Connexion')}
            />
            </View>
            <View style = {styles.connexion}>
            <TextInput
                style={styles.input}
                placeholder="Adresse email"
                //onChangeText={onChangeText}
                //value={text}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                //onChangeText={onChangeText}
                //value={text}
            />
            <Button
                title="Se connecter"
                buttonStyle = {{backgroundColor:'#424D41', borderRadius:2, marginBottom: 10}}
                type="solid"
                //onPress={() => props.navigation.navigate('Connexion')}
            />
            <Button
                title=" Se connecter avec Google"
                buttonStyle = {{backgroundColor:'#C2A77D', borderRadius:2, marginBottom: 10, marginTop: 30}}
                type="solid"
                icon={<Ionicons
                    name='logo-google'
                    size={30}
                    color='#F1EFE5'
                />}
                //onPress={() => props.navigation.navigate('Connexion')}
            />
            <Button
                title=" Se connecter avec Facebook"
                buttonStyle = {{backgroundColor:'#C2A77D', borderRadius:2}}
                type="solid"
                icon={<FontAwesome
                    name='facebook'
                    size={30}
                    color='#F1EFE5'
                />}
                //onPress={() => props.navigation.navigate('Connexion')}
            />
            </View>
            <View style = {styles.inscription}>
            <Button
                title="S'inscrire"
                buttonStyle = {{backgroundColor:'#424D41', borderRadius:2}}
                type="solid"
                onPress={() => props.navigation.navigate('Inscription')}
            />
        </View>
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
    button: {
        flex:3,
        flexDirection : 'column',  
        alignItems : 'center',
        justifyContent: 'center',
    },
    connexion: {
        flex:4,
        flexDirection : 'column',  
        alignItems : 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderRadius: 2,
      },
    inscription: {
        flex:5,
        flexDirection : 'column',  
        alignItems : 'center',
        justifyContent: 'center',
    },
    
    });
