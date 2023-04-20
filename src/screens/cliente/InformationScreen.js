import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppBarCliente from '../../components/common/AppBarClient';
import axios from 'axios';
import colors from '../../utils/colors';
import { Icon, Button } from 'react-native-elements';

export default function InformationScreen(props) {
    const { navigation, route } = props;
    const { miVariable } = route.params;
    const [values, setValues] = useState([]);

    const [alumnos, setAlumnos] = useState([]);
    const getAlumnos = async () => {
        const response = await fetch(`http://18.233.152.72:8080/auth/alumno/${miVariable}`)
        const data = await response.json();
        setAlumnos(data);

    }
    useEffect(() => {
        getAlumnos();
    }, []);

    const handleEditPress = () => {
        navigation.navigate('editInfoClientScreen', { values });
    };
    //obtener el imc
    const height = alumnos.height;
    const weight = alumnos.current_weight;
    const imc = weight / (height * height);
    //quitar decimales
    const imc2 = imc.toFixed(2);
    //obtener la edad de la persona
    const birthday = alumnos.birthday;
    const edad = new Date().getFullYear() - new Date(birthday).getFullYear();

    return (
        <View style={styles.container}>
           
           <Image
                style={styles.img}
                source={require("../../../assets/circulo_verde.png")}
            />
            <Image
                style={styles.img2}
                source={require("../../../assets/franja_azul.png")}
            />
            <View style={styles.appBar}>
                <AppBarCliente />
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>Mi información:</Text>
                <Text style={styles.name}>Nombre:</Text>
                <Text style={styles.input}>{alumnos.name}</Text>
                <Text style={styles.name}>Apellidos:</Text>
                <Text style={styles.input}>{alumnos.last_name}</Text>
                <Text style={styles.name}>Correo:</Text>
                <Text style={styles.input}>{alumnos.email}</Text>
                <Text style={styles.name}>Peso:</Text>
                <Text style={styles.input}>{alumnos.current_weight}<Text> kg</Text></Text>
                <Text style={styles.name}>Altura:</Text>
                <Text style={styles.input}>{alumnos.height}<Text> cm</Text></Text>
                <Text style={styles.name}>Fecha de nacimiento:</Text>
                <Text style={styles.input}>{alumnos.birthday}</Text>
                <Text style={styles.name}>IMC:</Text>
                <Text style={styles.input}>{imc2}</Text>
                {/*boton de editar */}
                <Button
                    icon={
                        <Icon
                            type='material-community'
                            name="pencil"
                            size={25}
                            color="white"
                        />}
                    onPress={() => navigation.navigate('editClient',{alumnos})}
                    buttonStyle={{ backgroundColor: "#FFAF00", borderRadius: 30, width: 70, height: 40, marginTop: 20, marginLeft: 100 }}
                />

            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: colors.VERDE_CLARO,
    },
    input: {
        width: 267,
        height: 32,
        borderWidth: 1,
        borderRadius: 32,
        paddingHorizontal: 10,
    },
    botonDerecho: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 159.57,
        height: 47.75,
        bottom: 5,
        borderRadius: 15,
        backgroundColor: 'red',
    }, appBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        backgroundColor: '#fff',
        width: 300,
        height: 530,
        borderRadius: 15,
        padding: 10,
        marginTop: 20,
    }, name: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    }, img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 400,
        position: 'absolute',
        top: 350,
        right: -210,
        zIndex: -1,
    },
    img2: {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 400,
        position: 'absolute',
        top: -530,
        right: 10,
        zIndex: -1,
    }
})