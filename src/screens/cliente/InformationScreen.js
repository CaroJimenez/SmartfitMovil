import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import AppBarCliente from '../../components/common/AppBarClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InformationScreen() {
    const [values, setValues] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`${baseUrl}/auth/alumno`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener la información del usuario');
                }

                const data = await response.json();

                //Obtener los valores para que estos se envien a modificar
                setValues({
                    name: data.nombre,
                    lastName: data.last_name,
                    email: data.email,
                    weight: data.peso.toString(),
                    height: data.altura.toString(),
                    birthdate: data.fecha_nacimiento,
                });
            } catch (error) {
                console.error(error);
            }
        }

        fetchUserInfo();
    }, []);

    const handleEditPress = () => {
        navigation.navigate('editInfoScreen', { values });
    };

    const handleChangePress = () => {
        //navigation.navigate('cambiarContra');
        console.log('cambiar contraseña');
    };

    // // Si no hay valores, no se ha cargado la información del usuario
    // if (!values) {
    //     // Agrega un componente de carga mientras se carga la información del usuario
    //     return (
    //         <View style={styles.container}>
    //             <AppBarCliente />
    //             <Text>Cargando...</Text>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            <AppBarCliente />
            <Text>Mi información:</Text>
            <Text>Nombre:</Text>
            <Text style={styles.input}>{values.nombre}</Text>
            <Text>Apellidos:</Text>
            <Text style={styles.input}>{values.lastName}</Text>
            <Text>Correo:</Text>
            <Text style={styles.input}>{values.email}</Text>
            <Text>Peso:</Text>
            <Text style={styles.input}>{values.weight}<Text>kg</Text></Text>
            <Text>Altura:</Text>
            <Text style={styles.input}>{values.height}<Text>cm</Text></Text>
            <Text>Fecha de nacimiento:</Text>
            <Text style={styles.input}>{values.birthdate}</Text>
            <TouchableOpacity style={styles.botonIzquierdo} onPress={handleChangePress}>
                <Text style={{ color: '#fff', fontSize: 14 }}>Cambiar contraseña   <Icon name="lock" size={20} color="white" /></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonDerecho} onPress={handleEditPress}>
                <Text style={{ color: '#fff', fontSize: 14 }}>Editar Información   <Icon name="pencil" size={20} color="white" /> </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 267,
        height: 32,
        borderWidth: 1,
        borderRadius: 32,
        paddingHorizontal: 10,
    },
    botonIzquierdo: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 15,
        backgroundColor: 'blue',
        position: 'absolute',
        width: 159.57,
        height: 47.75,
        left: 11,
        top: 569,
    },
    botonDerecho: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 159.57,
        height: 47.75,
        left: 188,
        top: 568,
        borderRadius: 15,
        backgroundColor: 'red',
    },
})