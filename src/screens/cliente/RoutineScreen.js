import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppBarCliente from '../../components/common/AppBarClient'

export default function RoutineScreen() {
    const navigation = useNavigation();

    const [rutinas, setRutinas] = useState([
        {
            nombre: 'Rutina Pierna',
            ejercicios: [
                {
                    nombre: 'Sentadillas',
                    repeticiones: '4X20 ',
                    link: 'https://www.youtube.com/watch?v=BjixzWEw4EY&pp=ygUKc2VudGFkaWxhcw%3D%3D'
                },
                {
                    nombre: 'Zancadas',
                    repeticiones: '4X15 ',
                    link: 'https://www.youtube.com/watch?v=DMczLFo3FOg&pp=ygUIemFuY2FkYXM%3D'
                },
                {
                    nombre: 'Puente de cadera',
                    repeticiones: '4X15 ',
                    link: 'https://www.youtube.com/watch?v=TZBUBUrmA9g&pp=ygUQcHVlbnRlIGRlIGNhZGVyYQ%3D%3D'
                }
            ]
        },
        {
            nombre: 'Rutina Brazo',
            ejercicios: [
                {
                    nombre: 'Flexiones',
                    repeticiones: '5x15 ',
                    link: 'https://www.youtube.com/watch?v=24whjX_tS78&pp=ygUJZmxleGlvbmVz'
                },
                {
                    nombre: 'Curl de biceps',
                    repeticiones: '4x20',
                    link: 'https://www.youtube.com/watch?v=PY9QylAMtyE&pp=ygUOY3VybCBkZSBiaWNlcHM%3D'
                },
                {
                    nombre: 'Remo Inclinado',
                    repeticiones: '5x20',
                    link: 'https://www.youtube.com/watch?v=KgEZTNLBMMQ&pp=ygUOcmVtbyBpbmNsaW5hZG8%3D'
                }
            ]
        },
        {
            nombre: 'Rutina Pecho',
            ejercicios: [
                {
                    nombre: 'Lagartijas',
                    repeticiones: '5x15',
                    link: 'https://www.youtube.com/watch?v=yvM3cJmSnsE&pp=ygUKbGFnYXJ0aWphcw%3D%3D'
                },
                {
                    nombre: 'Abdominales',
                    repeticiones: '5x10',
                    link: 'https://www.youtube.com/watch?v=mMieHCr-H0c&pp=ygULYWJkb21pbmFsZXM%3D'
                },
                {
                    nombre: 'Lagartijas',
                    repeticiones: '5x15 ',
                    link: 'https://www.youtube.com/watch?v=yvM3cJmSnsE&pp=ygUKbGFnYXJ0aWphcw%3D%3D'
                }
            ]
        }
    ]);

    //En esta constante se renderiza cada rutina solo el nombre
    const renderRutina = ({ item }) => {
        return (
            <TouchableOpacity style={styles.rutinaButton} onPress={() => verEjercicios(item)}>
                <Text style={styles.rutinaText}>{item.nombre}</Text>
            </TouchableOpacity>
        );
    };

    //Manda los ejercicios de la rutina seleccionada a la pantalla de ejercicios
    const verEjercicios = (rutina) => {
        navigation.navigate('exerciseScreen', { ejercicios: rutina.ejercicios });
    };

    return (
        <View style={styles.container}>
            <AppBarCliente />
            <Text style={styles.title}>Rutinas</Text>
            <FlatList
                data={rutinas}
                renderItem={renderRutina}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    rutinaButton: {
        backgroundColor: '#083464',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 20,
    },
    rutinaText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
})