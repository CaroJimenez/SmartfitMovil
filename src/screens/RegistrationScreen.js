import React, { useState } from "react";
import RegistrationForm from "../forms/RegistrationForm";
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import colors from "../utils/colors";
export default function RegistrationScreen() {
    return (
        <ScrollView style={{backgroundColor: colors.VERDE_CLARO}}>
            <View style={styles.title}>
                    <Text style={{fontSize: 23, color:'white'}}>Completa la información</Text>
                </View>
            <View style={styles.container}>

             <RegistrationForm/>
             <Image source={require('../../assets/SmartFitPalabra.png')} style={styles.contenedor} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.VERDE_OSCURO,
        height: 70,
    },
    contenedor: {
        width: 200,
        height: 50,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 114,
    },
});