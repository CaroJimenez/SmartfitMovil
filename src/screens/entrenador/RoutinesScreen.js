import { TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon} from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import colors from "../../utils/colors";
import * as yup from 'yup';
import axios from 'axios';
import Toast from "react-native-toast-message";
import { useFormik } from 'formik';

import { useRoute } from '@react-navigation/native';

export default function RoutinesScreen(props) {
    const { navigation, route} = props;
    const { alumnoId } = route.params;
    const [exercise, setExercise] = useState('default');
    const [ejercicios, setEjercicios] = useState([]);
    //lista de ejercicios seleccionados
    const [selectedExercises, setSelectedExercises] = useState([]);

//funciones para guardar pickers
    const addPicker = () => {
        setSelectedExercises([...selectedExercises, '']);
    }
    const savePickers = () => {
        console.log("LISTOS PARA ENVIAR"+selectedExercises);
        console.log("TAMAÑO DE LA LISTA"+selectedExercises.length);
    }

    const handleSave = (value, index) => {
        const newExercises = [...selectedExercises];
        newExercises[index] = value;
        setSelectedExercises(newExercises);
    }

    //acceder al servicio de ejercicios con fetch
    const getEjercicios = async () => {
        const response = await fetch('http://192.168.0.7:8090/auth/listExercise');
        const data = await response.json();
        setEjercicios(data);
    }
    useEffect(() => {
        getEjercicios();
    }, []);

    const formik = useFormik({
        initialValues: {
            nameRoutine: "",
            description: "",
            // exercises: [],
            exercise: ""
        },
        validationSchema: yup.object({
            nameRoutine: yup.string().required("Nombre de la rutina obligatorio"),
            description: yup.string().required("Descripción obligatoria"),
        }),
        validateOnChange: false,




        //registra una rutina
        onSubmit: async (formValue, ejercicios, { setSubmitting }) => {
            //insertar rutina con fetch
            console.log(ejercicios);
           /* const response = await fetch('http://192.168.0.7:8090/auth/addRoutine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formValue.nameRoutine,
                    description: formValue.description,
                    userLR:{
                        id: alumnoId
                    } ,
                    exercise: {
                        id_exercises: formValue.exercise
                    }
                })
            });
            navigation.navigate("clientData", { alumnoId });
            //mandar toast de rutina creada
            Toast.show({
                type: 'success',
                text1: 'Rutina creada',
                text2: 'La rutina se ha creado correctamente',
            });
            setSubmitting(false);*/
        }
    }  );


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
                <View style={styles.contenedor}>
                <Text style={styles.title}>Crea una nueva rutina</Text>
                <View style={styles.inputName}>
                <Input placeholder="Nombre de la rutina" 
                onChangeText={formik.handleChange('nameRoutine')}
                errorMessage={formik.errors.nameRoutine}
                inputStyle={{fontSize: 15, textAlign: 'center', underlineColorAndroid: '#FFF'}}
                />
                </View>
                <View style={styles.inputName}>
                <Input placeholder="Descripción" 
                onChangeText={formik.handleChange('description')}
                errorMessage={formik.errors.description}
                inputStyle={{fontSize: 15, textAlign: 'center'}}
                />
                </View>







                {/*PICKERS */}
                <View style={[styles.contExercise, styles.inputs]}>
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
                marginLeft: 100,
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
            }}
            onPress={savePickers}
           // onPress={() => formik.handleSubmit([...selectedExercises, lastExercise])}
            //loading={formik.isSubmitting}
        />
    </View>
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
        color: colors.AZUL_CLARO,
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
        marginTop: 20,
        width: '70%',
    },
    inputs: {
        width: '70%',
    },
    contenedor: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: -100,
        position: 'absolute',
        top: 0,
        left: 250,
        zIndex: -1,
    },
    img2:{
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 500,
        position: 'absolute',
        top: 20,
        right: -200,
        zIndex: -1,
    },
    inputs: {
        width: '70%',
        //poner bordes
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: '#F2F2F2',
        marginBottom: 20,

    },
    inputName: {
        width: '70%',
        height: 40,
        marginBottom: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
      }
      
});