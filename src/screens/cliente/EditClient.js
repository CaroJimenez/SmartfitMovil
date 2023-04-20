import React, { useState, useEffect } from "react";
import AppBarCliente from '../../components/common/AppBarClient';
import Toast from "react-native-toast-message";
import { StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { Input, Button, Icon } from "react-native-elements";
import colors from "../../utils/colors";

export default function EditClient(props) {
    const { navigation, route } = props;
    const { alumnos } = route.params;
    const [alumno, setAlumno] = useState({
        name: '',
        last_name: '',
        birthday: '',
        current_weight: '',
        height: '',
        gender: '',
        email: '',
        password: ''
    });
    useEffect(() => {
        setAlumno(alumnos)

    }, []);

    const handleConfirmation = () => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro que quieres guardar los cambios?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Aceptar',
                    onPress: () => handleSubmit()
                }
            ]
        );
    }

    const handleSubmit = () => {
        fetch(`http://18.233.152.72:8080/auth/updateAlumno/${alumnos.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alumno)
        })
            .then(response => response.json())
            .then(data => {
                navigation.navigate('infoClientScreen', { miVariable: alumnos.id });
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Cliente editado',
                    text2: 'El cliente se ha editado correctamente',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
            })
            .catch(error => {
                // Lógica de error
            });
    };



    return (

        <ScrollView >
            <AppBarCliente />
            <View style={styles.container}>
            <Image
                style={styles.img}
                source={require("../../../assets/circulo_verde.png")}
            />
            <Image
                style={styles.img2}
                source={require("../../../assets/franja_azul.png")}
            />
                <View style={styles.info}>

                    <Text style={styles.title}>Editar mis datos</Text>
                    <Text style={styles.nombre}>Nombre:</Text>
                    <Input
                        style={styles.input}
                        value={alumno.name}
                        onChangeText={text => setAlumno({ ...alumno, name: text })}
                    />
                    <Text style={styles.nombre}>Apellido:</Text>
                    <Input
                        style={styles.input}
                        value={alumno.last_name}
                        onChangeText={text => setAlumno({ ...alumno, last_name: text })}
                    />
                    <Text style={styles.nombre}>Fecha de nacimiento:</Text>
                    <Input
                        style={styles.input}
                        value={alumno.birthday.toString()}
                        keyboardType='numeric'
                        onChangeText={text => setAlumno({ ...alumno, birthday: parseInt(text) })}
                    />
                    <Text style={styles.nombre}>Peso actual:</Text>
                    <Input
                        style={styles.input}
                        value={alumno.current_weight.toString()}
                        keyboardType='numeric'
                        onChangeText={text => setAlumno({ ...alumno, current_weight: parseFloat(text) })}
                    />

                    <Text style={styles.nombre}>Altura:</Text>
                    <Input
                        style={styles.input}
                        value={alumno.height}
                        onChangeText={text => setAlumno({ ...alumno, height: text })}
                    />
                    <Text style={styles.nombre}>Genero:</Text>
                    <Input
                        style={styles.input}
                        value={alumno.gender}
                        onChangeText={text => setAlumno({ ...alumno, gender: text })}
                    />
                    <Text style={styles.nombre}>Email:</Text>
                    <Input
                        style={styles.input}
                        value={alumno.email}
                        onChangeText={text => setAlumno({ ...alumno, email: text })}
                    />
                    <Text style={styles.nombre}>Contraseña:</Text>
                    <Input
                        style={styles.input}
                        value={alumno.password}
                        onChangeText={text => setAlumno({ ...alumno, password: text })}
                    />
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={handleConfirmation}>
                        <Text style={{ color: 'white', fontSize: 17 }}>Guardar cambios</Text>
                    </TouchableOpacity>

                </View>

            </View>


        </ScrollView>

    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 14
    },
    data: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20

    }, boton: {
        backgroundColor: colors.VERDE_OSCURO,
        marginLeft: 57,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 170,
    },
    info: {
        backgroundColor: '#fff',
        width: 300,
        borderRadius: 15,
        padding: 10,
        marginTop: 20,
    }, container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: colors.VERDE_CLARO,
        height: 805.7
    },
    nombre: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 1.7,
        marginLeft: 14,
        marginTop: -14
    },
    input: {
        borderWidth: 1,
        borderRadius: 32,
        paddingHorizontal: 10,
        fontSize: 14.5,
    },img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 400,
        position: 'absolute',
        top: 90,
        right: -300,
        zIndex: -1,
    },
    img2: {
        width: 500,
        height: 500,
        marginTop: 509,
        position: 'absolute',
        top: -525,
        right: 10,
        zIndex: -1,
    }
})