import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppBar from '../../components/common/AppBar';
import { useNavigation } from '@react-navigation/native';

export default function HomeCScreen() {
    const navigation = useNavigation();

    const handleMiInformacionPress = () => {
        navigation.navigate('infoClientScreen');
        console.log("presionaste el boton de mi informacion")
    };

    const handleRutinaPress = () => {
        navigation.navigate('rotineScreen');
        console.log("presionaste el boton de rutina")
    };

    const handleProgresoPress = () => {
        // navigation.navigate('ProgresoScreen');
        console.log("presionaste el boton de progreso")
    };

    return (
        <>
            <SafeAreaProvider>
                <View>
                    {/* Asi se implementa el appbar */}
                    <AppBar/>
                    <Text>Pantalla Index Cliente</Text>
                    <TouchableOpacity style={styles.button1} onPress={handleMiInformacionPress}>
                        <Image source={require('../../../assets/imagenes/informacion.png')} style={styles.image} />
                        <Text style={{ color: '#fff', fontSize: 35, textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 }}>
                            MI INFORMACION
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={handleRutinaPress}>
                        <Image source={require('../../../assets/imagenes/rutina.png')} style={styles.image} />
                        <Text style={{ color: '#fff', fontSize: 35, textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 }}>
                            RUTINA
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button3} onPress={handleProgresoPress}>
                        <Image source={require('../../../assets/imagenes/progreso.png')} style={styles.image} />
                        <Text style={{ color: '#fff', fontSize: 35, textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 }}>
                            PROGRESO
                        </Text>
                    </TouchableOpacity>
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
})