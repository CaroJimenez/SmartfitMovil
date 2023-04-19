import { Alert,ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground } from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import colors from "../../utils/colors";
import Toast from "react-native-toast-message";
import AppBarCoach from '../../components/common/AppBarCoach';

export default function EditRoutines(props) {
    const { navigation, route } = props;
    const { id_alumno } = route.params;
    const [ejercicios, setEjercicios] = useState([]);
    const [rutinas, setRutinas] = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    //obtener ejercicios generales
    const [ejerciciosGenerales, setEjerciciosGenerales] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    const handleSave = (value, index) => {
        const newExercises = [...selectedExercises];
        newExercises[index] = value;
        setSelectedExercises(newExercises);
    }
    const addPicker = () => {
        setSelectedExercises([...selectedExercises, '']);
    }
    function enviarDatos(datos) {
        fetch('http://192.168.0.4:8090/auth/addRoutine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }
    const savePickers = () => {
        //ver si los ejercicios están vacíos
        if (selectedExercises.length === 0 || selectedExercises === null) {
            Alert.alert(
                "Error",
                "No se han seleccionado ejercicios",
                [
                    {
                        text: "OK",
                       
                        style: "cancel"
                    }
                ],)}else{
                    for (let i = 0; i < selectedExercises.length; i++) {
                        const datos = {
                            name: selectedRoutine,
                            description: ejercicios[0].description,
                            userLR: {
                                id: id_alumno
                            },
                            exercise: {
                                id_exercises: selectedExercises[i]
                            }
                        };
                        enviarDatos(datos);
                    }
                    Toast.show({
                        type: "success",
                        position: "top",
                        text1: "Rutina actualizada correctamente",
                        visibilityTime: 3000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                    });
                    navigation.navigate("clientData", { id_alumno });
                }
      
        
    }

    const getRutinas = async () => {
        try {
            const response = await fetch(`http://192.168.0.4:8090/auth/user/${id_alumno}`);
            const data = await response.json();
            const uniqueRutinas = data
  .filter((rutina, index, self) => index === self.findIndex((r) => r.name === rutina.name))
  .map((rutina) => rutina.name);setRutinas(uniqueRutinas);
            
        } catch (error) {
            console.log("An error occurred while fetching the data:", error);
        }
    }

    const obtenerEjercicios = async (name) => {
        try {
            const response = await fetch(`http://192.168.0.4:8090/auth/${name}/user/${id_alumno}`);
            const data = await response.json();
            setEjercicios(data);
        } catch (error) {
            console.log("An error occurred while fetching the data:", error);
        }
    }

    useEffect(() => {
        getRutinas();
    }, []);

   

    const getEjercicios = async () => {
        const response = await fetch('http://192.168.0.4:8090/auth/listExercise');
        const data = await response.json();
        setEjerciciosGenerales(data);

    }
    useEffect(() => {
        getEjercicios();
    }, []);
    const eliminarEjercicio = (idEjercicio, nameRoutine) => {

        Alert.alert(
            "Eliminar ejercicio",
            `¿Estás seguro que quieres eliminar este ejercicio de la rutina "${nameRoutine}"?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        let response = await fetch(`http://192.168.0.4:8080/auth/${id_alumno}/${idEjercicio}/${nameRoutine}`, {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: {}
                        })
                            .catch(error => {
                                console.log("Error occurred while making the request:", error);
                            });
                        if (response.ok) {
                            navigation.navigate("clientData", { id_alumno });
                            Toast.show({
                               type: 'success',
                               text1: 'Ejercicio eliminado',
                               text2: 'El ejercicio se ha eliminado correctamente',
                             });
                        } else {
                            console.log(`Error al eliminar la rutina: ${response.status} - ${response.statusText}`);
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    }




    return (
        <View style={styles.container}>
             <View style={styles.appBar}>
                <AppBarCoach />
            </View>
            <Image
                style={styles.img}
                source={require("../../../assets/circulo_verde.png")}
            />
            <Image
                style={styles.img2}
                source={require("../../../assets/franja_azul.png")}
            />


            <View style={[styles.contExercise]}>
                <Text style={styles.title}>Editar Rutinas</Text>
                <Picker
                    selectedValue={selectedRoutine}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedRoutine(itemValue);
                        obtenerEjercicios(itemValue); // aquí llamas a la segunda función
                    }}
                    style={{ width: 250, marginBottom: 10 }}
                >
                    <Picker.Item label="Selecciona una rutina" value={null} />
                    {rutinas.map((rutinaName) => (
                        <Picker.Item key={rutinaName} label={rutinaName} value={rutinaName} />
                    ))}
                </Picker>
                <View style={[styles.listaEjercicios]}>
                    {ejercicios.map((exercise, index) => (
                        
                        <View key={index} style={styles.exerciseContainer}>
                            <Text style={styles.exerciseName}>{exercise.exercise.name}</Text>
                            <Text style={styles.exerciseCategory}>Categoría: {exercise.exercise.category}</Text>
                            <Text style={styles.exerciseRepeats}>Repeticiones: {exercise.exercise.repeats}</Text>
                            <View style={styles.boton}>
                                <Button
                                    onPress={() => eliminarEjercicio(exercise.exercise.id_exercises, selectedRoutine)}
                                    icon={
                                        <Icon
                                            type='material-community'
                                            name="trash-can-outline"
                                            size={15}
                                            color="white"
                                        />}
                                    buttonStyle={{ backgroundColor: "#DD4614", borderRadius: 30, width: 30, height: 30, marginTop: 20 }}
                                />
                            </View>

                        </View>
                        
                    ))
                    }

                </View>
                <View style={{
                    marginTop: 20,
                    width: '85%',
                }}>

                    {selectedExercises.map((exerciseId, index) => (
                        <Picker
                            key={index}
                            selectedValue={exerciseId}
                            onValueChange={(itemValue) => handleSave(itemValue, index)}
                        >
                            <Picker.Item label="Selecciona un ejercicio" value="" />
                            {ejerciciosGenerales.map((ejercicio) => (
                                <Picker.Item key={ejercicio.id} label={ejercicio.name} value={ejercicio.id} />
                            ))}
                        </Picker>
                    ))}
                </View>



                <Button
                    icon={<Icon type="material-community" name="plus" size={20} color="white" />}
                    onPress={addPicker}
                    buttonStyle={{
                        backgroundColor: colors.VERDE_OSCURO,
                        borderRadius: 30,
                        width: 40,
                        height: 40,
                        marginTop: 10,
                        marginBottom: 20,
                        marginLeft: 10,
                    }} />

                <Button
                    title="Agregar ejercicios nuevos"
                    buttonStyle={{
                        backgroundColor: colors.AZUL_OSUCRO,
                        borderRadius: 30,
                        width: 215,
                        height: 40,
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 10,
                    }}
                    onPress={() => {
                        savePickers();
                    }}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.AZUL_OSUCRO,
        marginTop: 20,
        marginBottom: 20,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.VERDE_CLARO,
        height: '100%',
    },
    contExercise: {
        marginTop: 10,
        width: '70%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
    }
    ,
    name: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.AZUL_OSUCRO,
        marginBottom: 5,
    },
    listaEjercicios: {

    },
    nameEjercicios: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: -18,
    },
    img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: -50,
        position: 'absolute',
        top: 0,
        left: -350,
        zIndex: -1,
    },
    img2: {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 500,
        position: 'absolute',
        top: 29,
        right: -200,
        zIndex: -1,
    }, exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    exerciseCategory: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'gray',
        marginBottom: 5,
    },
    exerciseRepeats: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'gray',
        marginBottom: 7.5,
    },
    boton: {
        position: 'absolute',
        right: -50,
        top: 0,

    },appBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
});