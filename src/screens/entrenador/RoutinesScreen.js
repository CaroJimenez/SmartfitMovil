import { TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
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
    

    //acceder al servicio de ejercicios con fetch
    const getEjercicios = async () => {
        const response = await fetch('http://192.168.49.163:8090/auth/listExercise');
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
        //registra un usuario
        onSubmit: async (formValue, { setSubmitting }) => {
            //insertar rutina con fetch
            const response = await fetch('http://192.168.137.150:8090/auth/addRoutine', {
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
            setSubmitting(false);
        }
    });


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
                <Text style={styles.title}>Llena los campos para crear una rutina</Text>
                <Input placeholder="Nombre de la rutina" 
                onChangeText={formik.handleChange('nameRoutine')}
                errorMessage={formik.errors.nameRoutine}
                />
                <Input placeholder="Descripción" 
                onChangeText={formik.handleChange('description')}
                errorMessage={formik.errors.description}
                />
                <View style={[styles.contExercise, styles.inputs]}>
                    <Picker
                        selectedValue={exercise}
                        onValueChange={(itemValue) => {
                            setExercise(itemValue);
                            formik.setFieldValue('exercise', itemValue);
                        }}>
                        <Picker.Item label="Selecciona un ejercicio" value="" />
                        {ejercicios.map((ejercicio, index) => (
                            <Picker.Item
                                key={ejercicio.id}
                                label={ejercicio.name}
                                value={ejercicio.id}
                            />
                        ))}
                    </Picker>
                </View>
               

                <Button
                    title="Guardar rutina"
                    buttonStyle={{ backgroundColor: colors.AZUL_OSUCRO, borderRadius: 30, width: 200, height: 40, marginTop: 20, marginBottom: 20 }}
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
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
    }
});