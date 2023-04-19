import React, { useState, useEffect } from "react";
import { StyleSheet, Alert} from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import colors from "../../utils/colors";
import Toast from "react-native-toast-message";
import AppBarCoach from "../../components/common/AppBarCoach";

export default function ClientRoutines(props) {
    const { navigation, route } = props;
    const { alumnoId, name } = route.params;
    const url = `http://192.168.0.4:8090/auth/${name}/user/${alumnoId}`;
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setExercises(data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
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
                </View>
            ))}
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.VERDE_CLARO,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    exerciseContainer: {
        marginBottom: 20,
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
      },appBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },contenedor:{
        //centrar
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        //ajustar al tamaño de los elementos
        width: '70%',
        position: 'absolute',
        top: '20%',
        left: '20%',
    }
});
