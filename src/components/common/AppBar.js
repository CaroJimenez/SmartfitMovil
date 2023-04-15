import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';

export default function AppBar() {
    //Aqui debe ir la opcion de redirigir al login
    const handleLogout = () => {
        console.log("presionaste salir")
    }
    return (
        <Appbar.Header style={styles.appBarStile}>
            <Image source={require('../../../assets/imagenes/SmartFitPB.png')} style={styles.imageStile} />
            <Appbar.Action icon="logout" onPress={handleLogout} iconColor="white" style={styles.icono} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    appBarStile: {
        width: 360,
        height: 60,
        backgroundColor: "#38997E"
    },
    imageStile: {
        position: 'absolute',
        width: 180,
        height: 45,
        left: 8,
        top: 4,
    },
    icono: {
        position: 'absolute',
        fontSize: 24,
        left: 280,
        top: 10,
    }
})