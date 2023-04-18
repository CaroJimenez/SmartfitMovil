import { StyleSheet, Text, View, Image } from 'react-native'
import { Appbar } from 'react-native-paper';
import React from 'react'
import { useNavigation } from '@react-navigation/native';


export default function AppBar() {
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'index' }],
        });
    };

    return (
        <Appbar.Header style={styles.appBarStile}>
            <Image source={require('../../../assets/imagenes/SmartFitPB.png')} style={styles.imageStile} />
            <Appbar.Action icon="logout" onPress={handleLogout} iconColor="white" style={styles.icono} />
        </Appbar.Header>
    )
};


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
        width: 60,
        height: 60,
        left: 280,
    }
})