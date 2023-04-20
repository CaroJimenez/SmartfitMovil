import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from "../utils/colors";
import { Input, Button, Icon } from "react-native-elements";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegistrationForm() {
    const navigation = useNavigation()
    const [password, setPassword] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [genero, setGenero] = useState('default');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        formik.setFieldValue("birthDate", selectedDate)
    };

    const showDatepicker = () => {
        setShow(true);
    };

    //valores de formik
    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            middleName: "",
            birthDate: "",
            weight: "",
            height: "",
            gender: "",
            email: "",
            password: "",
            repeatPassword: "",
        },
        //validaciones del formulario
        validationSchema: yup.object({
            email: yup.string().email("Email invalido").matches(/utez\.edu\.mx$/, "El correo debe tener terminación utez.edu.mx").required("Requerido"),
            password: yup.string().min(7, "Muy corto!").required("Requerido"),
            repeatPassword: yup.string()
                .required("Contraseña obligatoria")
                .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
            name: yup.string().matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ]+$/,"Solo se permiten letras")
            .min(3, "Muy corto!")
            .max(18, "Demasido largo!")
            .required("Requerido"),
            lastName: yup.string().matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ]+$/, "Solo se admiten letras")
            .min(2, "Muy corto!")
            .max(10, "Demasido largo!")
            .required("Requerido"),
            birthDate: yup.string().required("La fecha de nacimiento es requerida")
            .max(
              new Date(Date.now() - 18 * 31556952000), // Calcula la fecha actual menos 18 años en milisegundos
              "Debes ser mayor de edad"
            ),
            gender: yup.string().required("Por favor selecciona un género"),
            weight: yup.string().required("Ingresa tu peso, si no lo sabes puedes poner uno aproximado"),
            height: yup.string().required("Ingresa tu altura, si no la conoces puedes poner una aproximada"),
              }),
        validateOnChange: false,
        //registra un usuario
        onSubmit: async (formValue, { setSubmitting }) => {
            
            //datos del formulario obtenidos
            const formData = {
                name: formValue['name'],
                last_name: formValue['lastName'],
                middle_name: formValue['middleName'],
                birthday: formValue['birthDate'],
                current_weight: formValue['weight'],
                height: formValue['height'],
                gender: formValue['gender'],
                email: formValue['email'],
                password: formValue['password']
            };
            //convertir a JSON
            const jsonData = JSON.stringify(formData);
            //enviar datos al servidor
            fetch('http://18.233.152.72:8080/auth/nuevoUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
                navigation.navigate("index");
            Toast.show({
                type: "success",
                position: "top",
                text1: "Registro exitoso",
                text2: "Espera a que el administrador active tu cuenta",
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });

            setSubmitting(false);
        }


    });
    //ocultar y mostrar contraseña
    const showPass = () => {
        setPassword(!password);
    };
    const showRepeatPass = () => {
        setRepeatPassword(!repeatPassword);
    };


    return (
        <ScrollView>
            <View style={styles.container}>

                <Input
                    placeholder="Nombre"
                    containerStyle={styles.inputs}
                    rightIcon={
                        <Icon type="material-community" name="account" iconStyle={styles.icon} />
                    }
                    onChangeText={(text) => formik.setFieldValue("name", text)}
                    errorMessage={formik.errors.name}
                />

                <Input
                    placeholder="Apellido"
                    containerStyle={styles.inputs}
                    rightIcon={
                        <Icon type="material-community" name="account" iconStyle={styles.icon} />
                    }
                    onChangeText={(text) => formik.setFieldValue("lastName", text)}
                    errorMessage={formik.errors.lastName}
                />
                
                <View style={styles.inputs}>
                    <Button onPress={showDatepicker} title="Selecciona tu fecha de nacimiento 🗓"
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        titleStyle={{ color: 'gray' }}

                    />

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
                <Input
                    placeholder="Peso"
                    keyboardType="numeric"
                    containerStyle={styles.inputs}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="weight-kilogram"
                            iconStyle={styles.icon}
                        />
                    }
                    onChangeText={(text) => {
                        if (/^\d+$/.test(text)) {
                            formik.setFieldValue("weight", text);
                        }
                    }}
                    errorMessage={formik.errors.weight}
                />

                <Input
                    placeholder="Altura"
                    keyboardType="numeric"
                    containerStyle={styles.inputs}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="human-male-height"
                            iconStyle={styles.icon}
                        />
                    }
                    onChangeText={(text) => formik.setFieldValue("height", text)}
                    errorMessage={formik.errors.height}
                />
                <View style={[styles.contGender, styles.inputs]}>
                    <Picker
                        selectedValue={genero}
                        onValueChange={(itemValue) => {
                            setGenero(itemValue);
                            formik.setFieldValue('gender', itemValue);
                        }}>
                        <Picker.Item label="Selecciona tu género" value="" />
                        <Picker.Item label="Mujer" value="Mujer" />
                        <Picker.Item label="Hombre" value="Hombre" />
                        <Picker.Item label="No específico" value="Otro" />
                    </Picker>
                </View>


                <Input
                    placeholder="Correo de UTEZ"
                    containerStyle={styles.inputs}
                    rightIcon={
                        <Icon type="material-community" name="at" iconStyle={styles.icon} />
                    }
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    errorMessage={formik.errors.email}
                />

                <Input
                    placeholder="Contraseña"
                    secureTextEntry={password ? false : true}
                    containerStyle={styles.inputs}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name={password ? "eye-off-outline" : "eye-outline"}
                            iconStyle={styles.icon}
                            onPress={showPass}
                        />
                    }
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    errorMessage={formik.errors.password}
                />
                <Input
                    placeholder="Repetir contraseña"
                    secureTextEntry={repeatPassword ? false : true}
                    containerStyle={styles.inputs}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name={repeatPassword ? "eye-off-outline" : "eye-outline"}
                            iconStyle={styles.icon}
                            onPress={showRepeatPass}
                        />
                    }
                    onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                    errorMessage={formik.errors.repeatPassword}
                />

             

                <Button
                    title="Registrarse"
                    buttonStyle={{ backgroundColor: colors.AZUL_OSUCRO, borderRadius: 30, width: 200, height: 40, marginTop: 20 }}
                    titleStyle={styles.textBtn}
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
                />

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    inputs: {
        width: '70%',
        height: 50,
        //poner bordes
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: '#EEEEEE',
        marginBottom: 20,

    },
    contGender: {
        marginTop: 20,
        width: '70%',
    },
    text: {
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
    },
    textBtn: {
        color: 'white',

    },
});