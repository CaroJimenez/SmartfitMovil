import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppBar from '../../components/common/AppBar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import colors from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomeCScreen({ props }) {
    const [emailCompare, setemailCompare] = useState([])

    const [dataAlumno, setdataAlumno] = useState({})


    const navigation = useNavigation();

    const handleMiInformacionPress = async () => {
        const miVariable = await AsyncStorage.getItem('userId');
        navigation.navigate('infoClientScreen', { miVariable: miVariable });
    };

    const handleRutinaPress = async () => {
        const miVariable = await AsyncStorage.getItem('userId');
        navigation.navigate('rotineScreen', { miVariable: miVariable });
    };

    const handleProgresoPress = async () => {
        const miVariable = await AsyncStorage.getItem('userId');
        navigation.navigate('progresoS', { miVariable: miVariable });
    };

    return (
        <>
            <AppBar />
            <SafeAreaProvider style={{ backgroundColor: colors.VERDE_CLARO }}>
                <View style={styles.container}>
                    <Image
                        style={styles.img}
                        source={require("../../../assets/circulo_verde.png")}
                    />

                    <Image
                        style={styles.img2}
                        source={require("../../../assets/franja_azul.png")}
                    />
                    <View style={styles.touchable}>
                        <TouchableOpacity style={[styles.button1]} onPress={handleMiInformacionPress}>
                            <Image source={require('../../../assets/imagenes/informacion.png')} style={styles.image} />
                            <Text style={{ color: '#fff', fontSize: 35, textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 }}>
                                MI INFORMACION
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.touchable}>
                        <TouchableOpacity style={[styles.button2, { alignItems: 'center' }]} onPress={handleRutinaPress}>
                            <Image source={require('../../../assets/imagenes/rutina.png')} style={styles.image} />
                            <Text style={{ color: '#fff', fontSize: 35, textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 }}>
                                RUTINA
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.touchable}>
                        <TouchableOpacity style={[styles.button3, { alignItems: 'center' }]} onPress={handleProgresoPress}>
                            <Image source={require('../../../assets/imagenes/progreso.png')} style={styles.image} />
                            <Text style={{ color: '#fff', fontSize: 35, textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 }}>
                                PROGRESO
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaProvider>
        </>

    )
}

const styles = StyleSheet.create({
    button1: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 335,
        height: 124,
        left: 12,
        top: 114,
        borderRadius: 16,
    },
    button2: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 335,
        height: 124,
        left: 12,
        top: 278,
        borderRadius: 16,
        backgroundColor: "#1E1E1E"
    },
    button3: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 335,
        height: 124,
        left: 12,
        top: 442,
        borderRadius: 16,
        backgroundColor: "#1E1E1E"
    },
    image: {
        position: 'absolute',
        width: 335,
        height: 122.76,
        borderRadius: 16
    },
    touchable: {
        position: 'absolute',
        width: 335,
        height: 124,
        left: 35,
        top: 40,
        borderRadius: 16,
    },
    img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        //mover hacia la izquierda
        marginLeft: -350,
        //mover hacia arriba
        marginTop: -30,
        position: 'absolute',
        zIndex: -1,
        top: -0,
    },
    img2: {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 400,
        position: 'absolute',
        top: 90,
        right: -250,
        zIndex: -1,
    }
})