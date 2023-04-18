import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import ClientsScreen from './ClientsScreen';


export default function HomeIScreen(props) {
    const { navigation } = props;
    const clientes = () => {
        navigation.navigate("clients")
    }
    const rutinas = () => {
        navigation.navigate("routines")
    }
    return (
        <>
               <ClientsScreen/>
        </>
           
        
    )
}

const styles = StyleSheet.create({
   
})