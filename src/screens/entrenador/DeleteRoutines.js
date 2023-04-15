import { TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, FlatList } from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import colors from "../../utils/colors";
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';

export default function DeleteRoutines(props) {
    const { navigation, route} = props;
    const { alumnoId } = route.params;
    const [rutinas, setRutinas] = useState([]);
    const getRutinas = async () => {
        const response = await fetch(`http://192.168.49.163:8090/auth/user/${alumnoId}`)
        const data = await response.json();
        setRutinas(data);
     
    }
    useEffect(() => {
        getRutinas();
        deleteRoutine();
    }, []);

//funcion para eliminar una rutina
const deleteRoutine = async (nameRoutine) => {
 /*
        let response = await fetch(`http://192.168.137.84:8090/auth/user/${alumnoId}/${nameRoutine}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
              },
              body: null
        }).then(res => {
        return res.json()
      }) 
      .then(data => console.log(data))*/
    
    


  }
  



       /* */
    

    const formik = useFormik({
        initialValues: {
            nameRoutine: "",
        },
        validationSchema: yup.object({
            nameRoutine: yup.string().required("Nombre de la rutina obligatorio"),
        }),
        validateOnChange: false,
        //registra un usuario
        onSubmit: async (formValue, { setSubmitting }) => {
            const nameRoutine = formValue.nameRoutine;
            deleteRoutine(nameRoutine);
            
        }
    });

    return (
        
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                <Text style={styles.title}>Ingresa el nombre de la rutina que quieres eliminar</Text>
                <Input placeholder="Nombre de la rutina" 
                onChangeText={formik.handleChange("nameRoutine")}
                errorMessage={formik.errors.nameRoutine}
                style={styles.input}
                />
                <Button
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
                    icon={
                        <Icon
                            type='material-community'
                            name="trash-can-outline"
                            size={25}
                            color="white"
                        />}
                    buttonStyle={{ backgroundColor: "#DD4614", borderRadius: 30, width: 50, height: 40, marginTop: 20 }}
                />

                </View>
               

                <View style={styles.contenido}>
                <View style={styles.cabecera}>
                    <Text style={styles.textCabecera}>Nombre</Text>
                    <Text style={styles.textCabecera}>Descripcion</Text>
                </View>
                {rutinas.map((rutina, index) => (
                    <View key={index} style={styles.contExercise}>
                        <Text style={styles.name}>{rutina.name}</Text>
                        <Text style={styles.name}>{rutina.description}</Text>
                        <View style={styles.vline}></View>
                    </View>
                ))}


                </View>
               
               

            </View>
            
    );
}

const styles = StyleSheet.create({
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
        //alinear items a los lados
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    }
    ,
    name: {
        fontSize: 17,
        textAlign: "center",
        marginBottom: 5,
        marginLeft: 20,
    },
    cabecera:{
        //alinear uno a un lado de otro
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        marginTop: 20,
        marginBottom: 20,  
    },
    textCabecera:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.AZUL_OSUCRO,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 40,
    },
    contenido:{
        marginTop: 20,
        width:'100%',
        //alinear items a los lados
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 20,
    },
    vline: {
        borderLeftWidth: 1,
        borderLeftColor: 'black',
        height: '100%',
        position: 'absolute',
        left: '65%',
    },
    input: {
        height: 45,
        //poner bordes
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: '#EEEEEE',
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        //alinear items a los lados
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});