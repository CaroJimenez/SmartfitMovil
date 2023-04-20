import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import colors from "../../utils/colors";
import Toast from "react-native-toast-message";
import AppBarCoach from "../../components/common/AppBarCoach";

export default function ClientRoutines(props) {
    const { navigation, route } = props;
    const { alumnoId, name } = route.params;
    const url = `http://18.233.152.72:8080/auth/${name}/user/${alumnoId}`;
    const [exercises, setExercises] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    const addPicker = () => {
        setSelectedExercises([...selectedExercises, '']);
    }
    const savePickers = () => {
        const exerciseDescriptions = exercises.map(exercise => exercise.description);
        for(let i = 0; i < selectedExercises.length; i++){
            enviarDatos(name, exerciseDescriptions[0], alumnoId, selectedExercises[i]);
        }
        
    }

    //funcion para crear una rutina
    function enviarDatos(nombre, descripcion, idAlumno, idEjercicio) {
        fetch('http://18.233.152.72:8080/auth/addRoutine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": nombre,
                "description": descripcion,
                "userLR": {
                    id: idAlumno
                  },
                  "exercise": {
                    id_exercises: idEjercicio
                  }
            })})
            navigation.navigate("deleteRoutines", { alumnoId });
            Toast.show({
                type: "success",
                position: "top",
                text1: "Rutina actualizada",
                text2: "Se han añadido los ejercicios a la rutina",
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
    }

    const handleSave = (value, index) => {
        const newExercises = [...selectedExercises];
        newExercises[index] = value;
        setSelectedExercises(newExercises);
    }

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setExercises(data);

            })
            .catch(error => console.log(error));
    }, []);

    const getEjercicios = async () => {
        const response = await fetch('http://18.233.152.72:8080/auth/listExercise');
        const data = await response.json();
        setEjercicios(data);
    }
    useEffect(() => {
        getEjercicios();
    }, []);

    const eliminarEjercicio = (idEjercicio) => {
        Alert.alert(
            "Eliminar ejercicio",
            `¿Estás seguro que quieres eliminar este ejercicio de la rutina "${name}"?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        let response = await fetch(`http://18.233.152.72:8080/auth/${alumnoId}/${idEjercicio}/${name}`, {
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
                            navigation.navigate("deleteRoutines", { alumnoId });
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
        <ScrollView>
        <View style={styles.container}>
            
            <View style={styles.appBar}>
                <AppBarCoach />
            </View>
            <View style={styles.contenedor}>
                <Text style={styles.title}>Ejercicios</Text>
                {exercises.map((exercise, index) => (
                    <View key={index} style={styles.exerciseContainer}>
                        <Text style={styles.exerciseName}>{exercise.exercise.name}</Text>
                        <Text style={styles.exerciseCategory}>Categoría: {exercise.exercise.category}</Text>
                        <Text style={styles.exerciseRepeats}>Repeticiones: {exercise.exercise.repeats}</Text>
                        <View style={styles.botonEliminar}>
                            <Button
                                onPress={() => eliminarEjercicio(exercise.exercise.id_exercises)}
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
                ))}

                <View style={styles.pickers}>
                    {selectedExercises.map((exerciseId, index) => (
                        <Picker
                            key={index}
                            selectedValue={exerciseId}
                            onValueChange={(itemValue) => handleSave(itemValue, index)}
                        >
                            <Picker.Item label="Selecciona un ejercicio" value="" />
                            {ejercicios.map((ejercicio) => (
                                <Picker.Item key={ejercicio.id} label={ejercicio.name} value={ejercicio.id} />
                            ))}
                        </Picker>
                    ))}
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
                        marginLeft: 130,
                    }}
                />
                <Button
                    title="Guardar"
                    buttonStyle={{
                        backgroundColor: colors.AZUL_OSUCRO,
                        borderRadius: 30,
                        width: 100,
                        height: 40,
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 109,
                    }}
                    onPress={() => {
                        savePickers();
                    }}
                />
                
                </View>

                
            </View>
            
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.VERDE_CLARO,
        height: 1100,
    },
    exerciseContainer: {
        marginBottom: 20,
        marginRight: 35,
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    exerciseCategory: {
        fontSize: 16,
    },
    exerciseRepeats: {
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.AZUL_OSUCRO,
    }, appBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    }, contenedor: {
        //centrar
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        //ajustar al tamaño de los elementos
        width: '70%',
        position: 'absolute',
        top: '7%',
    }, pickers: {
        width: '100%',
        height: 100,
        marginBottom: 20,
        //centrar 
    }, botonEliminar: {
        position: 'absolute',
        right: -50,
        top: 0,
    }
});
