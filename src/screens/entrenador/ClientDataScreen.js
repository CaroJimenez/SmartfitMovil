import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import colors from '../../utils/colors';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';


export default function ClientDataScreen(props) {
    const { navigation, route } = props;
    const { id_alumno } = route.params;
    //mandar a traer el servicio de listar alumno mediante el id con fetch
    const [alumnos, setAlumnos] = useState([]);
    const getAlumnos = async () => {
        const response = await fetch(`http://192.168.0.7:8090/auth/alumno/${id_alumno}`)
        const data = await response.json();
        setAlumnos(data);
        
    }
    useEffect(() => {
        getAlumnos();
    }, []);
//obtener el imc
    const height = alumnos.height;
    const weight = alumnos.current_weight;
    const imc = weight / (height * height);
    //obtener la edad de la persona
    const birthday = alumnos.birthday;
    const edad = new Date().getFullYear() - new Date(birthday).getFullYear();


    const handleAlumnoPress = (alumnoId) => {
        navigation.navigate('routines', { alumnoId });
    };

    const deleteRoutines = (alumnoId) => {
        navigation.navigate('deleteRoutines', { alumnoId });
    };

    return (
        <SafeAreaProvider style={styles.container}>

            {/*
listar view de alumnos

*/}
   <View>
   <Image
                style={styles.img}
                source={require("../../../assets/circulo_verde.png")}
            />

<Image
                style={styles.img2}
                source={require("../../../assets/franja_azul.png")}
            />
      {/* mostrar datos de solo un alumno */}
        
            <View >
                <Text style={{fontSize:20, marginBottom:20, fontWeight:'bold'}}>{alumnos.name} {alumnos.last_name}  </Text>
                <Text style={{fontSize:20, marginBottom:20}}>{alumnos.email}</Text>
                
                <Text style={styles.text}>Genero: </Text>
                <Text style={styles.datos}>{alumnos.gender}</Text>
                <Text style={styles.text}>Altura: </Text>
                <Text style={styles.datos}>{alumnos.height}</Text>
                <Text style={styles.text}>Peso: </Text>
                <Text style={styles.datos}>{alumnos.current_weight}</Text>
                <Text style={styles.text}>IMC: </Text>
                <Text style={styles.datos}>{imc}</Text>
                <Text style={styles.text}>Edad: </Text>
                <Text style={styles.datos}>{edad}</Text>
                </View>
    </View>        

                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                    }}>Administrar rutinas</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>


                        <Button
                           onPress={() => handleAlumnoPress(alumnos.id)}
                            icon={
                                <Icon
                                    type='material-community'
                                    name="plus"
                                    size={25}
                                    color="white"
                                />}
                            buttonStyle={{ backgroundColor: colors.AZUL_OSUCRO, borderRadius: 30, width: 100, height: 40, marginTop: 20 }}
                        />
                        <Button
                            icon={
                                <Icon
                                    type='material-community'
                                    name="pencil"
                                    size={25}
                                    color="white"
                                />}
                            onPress={() => navigation.navigate('editRoutines')}
                            buttonStyle={{ backgroundColor: "#FFAF00", borderRadius: 30, width: 100, height: 40, marginTop: 20 }}
                        />
                        <Button
                           onPress={() => deleteRoutines(alumnos.id)}
                            icon={
                                <Icon
                                    type='material-community'
                                    name="trash-can-outline"
                                    size={25}
                                    color="white"
                                />}
                            buttonStyle={{ backgroundColor: "#DD4614", borderRadius: 30, width: 100, height: 40, marginTop: 20 }}
                        />

                    </View>







        </SafeAreaProvider>


    )
}

const styles = StyleSheet.create({
    datos: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        color: "black",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        //ajustar tamaño al contenido
        width: '100%',
        height: 40,
        backgroundColor: '#EBEBEB',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.VERDE_CLARO,
        height: 840,
        //centrar el contenido
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        //resaltar el texto
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 4,
        //mover el texto a la izquierda
        marginLeft: 10,
        //ajustar tamaño al contenido
        width: '70%',

    },
    img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 500,
        position: 'absolute',
        top: -800,
        left: -500,
        zIndex: -1,
    },

    img2:{
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 400,
        position: 'absolute',
        top: -10,
        right: -350,
        zIndex: -1,
    }
})