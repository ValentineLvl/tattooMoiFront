import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const users = [
    {
        name: 'brynn',
        avatar: 'https://scontent-cdg2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/263618378_1099879774149801_2580156930129033794_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=109&_nc_ohc=52-VlmrwR3YAX8B4MkF&edm=AABBvjUBAAAA&ccb=7-4&oh=c9a0a4659885b3594f3dd178757d05ab&oe=61B46BC6&_nc_sid=83d603'
    }
]

function SearchScreen(props) {

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <Image
                    source={require('../assets/tattoo-moi_1.png')}
                    style={styles.logo} />
                <Button
                    title="Connexion"
                    buttonStyle={styles.connexionBtn}
                    titleStyle={styles.titleBtn}
                    type="solid"
                />
            </View>

            <ScrollView style={{ width: '90%', flex: 2 }}>
                <Card containerStyle={styles.cards}>
                    <Card.Image
                        source={{ uri: 'https://i.pinimg.com/564x/f1/1a/c2/f11ac2d3650b2d71817dc2a533c60031.jpg' }}>
                        <AntDesign
                            name="heart"
                            size={30}
                            color="#BF5F5F"
                            style={{
                                position: 'absolute',
                                left: '87%',
                                top: '5%'
                            }}
                        />
                    </Card.Image>
                    <View style={styles.cardDesc}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#454543' }}>Marcus</Text>
                            <Text style={{ marginBottom: 10, fontWeight: 'bold', paddingTop: 5, color: '#454543' }}>Jungle Tattoo</Text>
                            <Text style={{ fontStyle: 'italic', color: 'rgba(69, 69, 67, 0.8)' }}>Tribal, Lettering, Realism</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#454543' }}>Attente: 2 Mois</Text>
                            <Text style={{ paddingTop: 5, color: '#454543' }}>Paris 16</Text>
                        </View>
                    </View>
                </Card>
                <Card containerStyle={styles.cards}>
                    <Card.Image
                        source={{ uri: 'https://i.pinimg.com/564x/c8/a3/c9/c8a3c92b6b1b2d74ed0aef3583dd2fc7.jpg' }}>
                        <AntDesign
                            name="heart"
                            size={30}
                            color="#F1EFE5"
                            style={{
                                position: 'absolute',
                                left: '87%',
                                top: '5%'
                            }}
                        />
                    </Card.Image>
                    <View style={styles.cardDesc}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#454543' }}>Marcus</Text>
                            <Text style={{ marginBottom: 10, fontWeight: 'bold', paddingTop: 5, color: '#454543' }}>Jungle Tattoo</Text>
                            <Text style={{ fontStyle: 'italic', color: 'rgba(69, 69, 67, 0.8)' }}>Tribal, Lettering, Realism</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#454543' }}>Attente: 2 Mois</Text>
                            <Text style={{ paddingTop: 5, color: '#454543' }}>Paris 16</Text>
                        </View>
                    </View>
                </Card>
                <Card containerStyle={styles.cards}>
                    <Card.Image
                        source={{ uri: 'https://i.pinimg.com/564x/9f/8e/7a/9f8e7ac059e49b08e6f7f7d751eae4ed.jpg' }}>
                        <AntDesign
                            name="heart"
                            size={30}
                            color="#F1EFE5"
                            style={{
                                position: 'absolute',
                                left: '87%',
                                top: '5%'
                            }}
                        />
                    </Card.Image>
                    <View style={styles.cardDesc}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#454543' }}>Marcus</Text>
                            <Text style={{ marginBottom: 10, fontWeight: 'bold', paddingTop: 5, color: '#454543' }}>Jungle Tattoo</Text>
                            <Text style={{ fontStyle: 'italic', color: 'rgba(69, 69, 67, 0.8)' }}>Tribal, Lettering, Realism</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#454543' }}>Attente: 2 Mois</Text>
                            <Text style={{ paddingTop: 5, color: '#454543' }}>Paris 16</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </View>
    )
}

export default SearchScreen;

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
        flex: 2,
        maxHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    logo: {
        width: 200,
        height: 80,
        marginRight: 70
    },
    connexionBtn: {
        backgroundColor: '#F1EFE5',
        paddingRight: 5,
        paddingLeft: 5,
        marginRight: 10,
        marginTop: 20
    },
    titleBtn: {
        color: '#424D41',
        marginBottom: 10,
        fontSize: 15
    },
    cardDesc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#F1EFE5',
    },
    cards: {
        padding: 0,
        borderWidth: 0.1,
        borderColor: '#454543'
    }
});