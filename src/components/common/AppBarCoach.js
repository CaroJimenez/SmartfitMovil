import { StyleSheet, Text, View, Image } from 'react-native'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

export default function AppBarCoach() {
    const navigation = useNavigation();
    const handleLogout = () => {
        navigation.navigate('clientData');
        console.log("presionaste ir a inicio");
    }
    return (
        <Appbar.Header style={styles.appBarStile}>
            <Image source={require('../../../assets/imagenes/SmartFitPB.png')} style={styles.imageStile} />
            <Appbar.Action icon="home" onPress={handleLogout} iconColor="white" style={styles.icono} />
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