import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message";
import axios from 'axios';

//Intento de consumir servicio
// const updateWeight = async (weight, token) => {
//     //Pocible solucion al mandar a traer el servicio
//     //Mandamos a traer la api
//     try {
//         const response = await axios.put(`http://your-api-endpoint/${token}`, {
//             weight,
//             //Aqui deberia de mandar la fecha actual
//             date: new Date(),
//         }, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// }

export default function ChangePeso(props) {
    //Aqui la variable peso la estoy utilizando para que el peso lo lleve a la pantalla de progreso
    const { close, onReload, peso, onUpdateWeight } = props;
    const formik = useFormik({
        initialValues: {
            displayPeso: peso.toString(),
        },
        validationSchema: Yup.object({
            displayPeso: Yup.number("Solo se permite ingresar numeros enteros o decimales").required("El peso es requerido")
        }),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser;
                const { uidToken } = currentUser.toJSON();
                await updateWeight(parseFloat(formValue.displayPeso), uidToken, onUpdateWeight);
                onReload();
                close();
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar peso"
                })
            }
        },
    });
    return (
        <View style={styles.viewForm}>
            <Input
                containerStyle={styles.input}
                onChangeText={(text) => formik.setFieldValue("displayPeso", text)}
                errorMessage={formik.errors.displayPeso}
            />
            <Button
                title="Actualizar Peso"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewForm: {
        alignItems: "center",
        paddingVertical: 10,
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 15,
        width: "95%",
    },
    btnStyle: {
        backgroundColor: "#0d5bd7",
    },
});