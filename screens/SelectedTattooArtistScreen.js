import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

export default function SelectedTattooArtistScreen(props) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/tattoo-moi_1.png')}
                    style={{ width: 200, height: 80, marginRight: 70 }} />
                <Button
                    title="Connexion"
                    buttonStyle={{ backgroundColor: '#F1EFE5', paddingRight: 5, paddingLeft: 5, marginRight: 10, marginTop: 20 }}
                    titleStyle={{ color: '#454543', marginBottom: 10, fontSize: 15, height: 30 }}
                    type="solid"
                />
            </View>

            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1482329033286-79a3d24413b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }}
                        style={styles.imgTatoueur}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#454543', marginTop: 10 }}>Marcus</Text>
                    <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: 'bold', color: '#454543' }}>Jungle Tattoo</Text>
                    <AntDesign
                        name="heart"
                        size={30}
                        color="#BF5F5F"
                        style={{
                            position: 'relative',
                            left: '19%',
                            top: '-16%',
                        }}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#454543' }}>5 rue Victor Hugo 75016 Paris</Text>
                        <Text style={{ fontSize: 18, paddingTop: 5, color: '#454543' }}>Temps d'attente: <Text style={{ fontWeight: 'bold' }}>2 mois</Text></Text>
                    </View>
                </View>

                <View style={styles.btnGroup}>
                    <Button
                        title="#tribal"
                        type="solid"
                        buttonStyle={styles.button}
                        titleStyle={{ color: '#C2A77D', fontSize: 14, fontWeight: 'bold' }}
                    />
                    <Button
                        title="#lettering"
                        type="solid"
                        buttonStyle={styles.button}
                        titleStyle={{ color: '#C2A77D', fontSize: 14, fontWeight: 'bold' }}
                    />
                    <Button
                        title="#oldschool"
                        type="solid"
                        buttonStyle={styles.button}
                        titleStyle={{ color: '#C2A77D', fontSize: 14, fontWeight: 'bold' }}
                    />
                </View>

                <View style={styles.ig}>
                    <AntDesign name="instagram" size={30} color="#454543" style={{ marginRight: 5 }} />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'left',
                        marginTop: 3,
                        color: '#454543'
                    }}>Instagram</Text>
                </View>
                <View style={{ width: '90%', margin: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Image
                        source={{ uri: 'https://i.pinimg.com/564x/f5/7d/69/f57d69fd2940ed2ec7095b096ee9d77c.jpg' }}
                        style={{ width: 80, height: 70 }}
                    />
                    <Image
                        source={{ uri: 'https://i.pinimg.com/750x/1a/b4/7f/1ab47ff65232f8a327c43543e9d9c79c.jpg' }}
                        style={{ width: 80, height: 70 }}
                    />
                    <Image
                        source={{ uri: 'https://i.pinimg.com/564x/c5/13/bc/c513bc25b1fd09aa35a2fc28494fb52d.jpg' }}
                        style={{ width: 80, height: 70 }}
                    />
                </View>
                <View style={{ width: '90%', margin: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Image
                        source={{ uri: 'https://i.pinimg.com/564x/f7/f0/50/f7f05015430a5f32026715d15f64ef33.jpg' }}
                        style={{ width: 80, height: 70 }}
                    />
                    <Image
                        source={{ uri: 'https://i.pinimg.com/564x/b4/d5/b5/b4d5b52c576e85d5d035929ef3863d72.jpg' }}
                        style={{ width: 80, height: 70 }}
                    />
                    <Image
                        source={{ uri: 'https://i.pinimg.com/736x/4b/41/e2/4b41e27bc15763bbfc594561f1b9b8fd.jpg' }}
                        style={{ width: 80, height: 70 }}
                    />
                </View>

                <Button
                    title="En voir plus"
                    buttonStyle={{ backgroundColor: '#F1EFE5', padding: 2, borderBottomWidth: 1, borderBottomColor: '#454543', marginBottom: 15 }}
                    titleStyle={{ color: '#454543' }}
                    type="solid"
                />

                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20 }}>
                    <AntDesign name="earth" size={20} color="#454543" style={{ marginRight: 10 }} />
                    <Text style={{ marginTop: 3, fontSize: 16 }}>www.jungletattoo.com</Text>
                </View>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                    <Feather name="phone" size={20} color="#454543" style={{ marginRight: 10 }} />
                    <Text style={{ marginTop: 3, fontSize: 16 }}>06 36 86 36 25</Text>
                </View>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                    <MaterialIcons name="alternate-email" size={20} color="#454543" style={{ marginRight: 10 }} />
                    <Text style={{ marginTop: 3, fontSize: 16 }}>marcus.tattoo@gmail.com</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign
                        name="facebook-square"
                        size={32}
                        color="#454543"
                        style={{ marginTop: 30, marginRight: 10 }} />
                    <AntDesign
                        name="instagram"
                        size={32}
                        color="#454543"
                        style={{ marginTop: 30 }} />
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                    <Button
                        title="Demande devis"
                        type="solid"
                        buttonStyle={{ backgroundColor: '#C2A77D', marginTop: 40, marginRight: 30, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                        onPress={() => props.navigation.navigate('Resultat')}
                    />
                    <Button
                        title="Demande RDV"
                        type="solid"
                        buttonStyle={{ backgroundColor: '#C2A77D', marginTop: 40, paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                        onPress={() => props.navigation.navigate('Resultat')}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
        backgroundColor: '#F1EFE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        maxHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    button: {
        backgroundColor: '#424D41',
        padding: 10,
        width: 100
    },
    btnGroup: {
        marginTop: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imgTatoueur: {
        marginTop: 10,
        width: 135,
        height: 135,
        borderRadius: 75,
    },
    ig: {
        flexDirection: 'row',
        marginTop: 30,
        width: '90%',
    }
});