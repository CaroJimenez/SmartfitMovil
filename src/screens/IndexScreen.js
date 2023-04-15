import React, { useState } from "react";
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { View, Text, StatusBar, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import colors from "../utils/colors";
import { useFormik } from "formik";
import { Input, Button, Icon } from "react-native-elements";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import * as yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexScreen(props) {
    const { navigation } = props;
    const [password, setPassword] = useState(false);
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.49.163:8090/auth/login', {
                email: formik.values.email,
                password: formik.values.password,
            });
            const token = response.data.token; // token de autenticación
            await AsyncStorage.setItem('token', token); // guardar token en el dispositivo
            if(response.data.authorities[0].authority == "ROLE_INSTRUCTOR"){
                navigation.navigate('clients'); // redirigir a pantalla de inicio de sesión exitoso
            }else if(response.data.authorities[0].authority == "ROLE_CLIENT"){
                navigation.navigate('homeClient'); // redirigir a pantalla de inicio de sesión exitoso
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Usuario o contraseña incorrectos',
            });
        }
    };

    //valores de formik
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string()
                .email("Formato de correo no válido")
                .required("Email obligatorio"),
            password: yup.string().required("Contraseña obligatoria"),
        }),
        validateOnChange: false,
        //registra un usuario
        onSubmit: async (formValue, { setSubmitting }) => {
            const email = formValue.email;
            const password = formValue.password;
            handleLogin(); 
            setSubmitting(false);
        }
    });

    const showPass = () => {
        setPassword(!password);
    };

    return (
        <ScrollView>
            <>
                <StatusBar barStyle={'light-content'} />

                {/* 
        Contenedor de la franja azul y el logo
            */}
                <SafeAreaView style={styles.container}>

                    <View style={{ alignItems: "center" }}>
                        <View >
                            <Image
                                style={styles.img}
                                source={require("../../assets/putoMIKE.png")} />
                        </View>
                        <View style={styles.backgroundImageContainer3}>
                            <Image source={require('../../assets/franja_azul.png')} style={styles.backgroundImage3} />
                        </View>
                    </View>

                    {       /* 
        Contenedor del circulo verde y el formulario
            */}
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.Text}>Bienvenido a SmartFit</Text>


                            <Input style={styles.inputs}
                                placeholder="usuario@utez.edu.mx"
                                rightIcon={
                                    <Icon type="material-community" name="at" iconStyle={styles.icon} />
                                } onChangeText={(text) => formik.setFieldValue("email", text)}
                                errorMessage={formik.errors.email}
                            />

                            <Input style={styles.inputs}
                                placeholder="****"
                                secureTextEntry={password ? false : true}
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


                            <StatusBar style="auto" />
                            <View style={styles.btnContainer}>

                                <Button
                                    title="Iniciar sesión"
                                    buttonStyle={styles.btn}
                                    titleStyle={{ color: 'black' }}
                                    onPress={formik.handleSubmit}
                                    loading={formik.isSubmitting}
                                />
                            </View>


                            <TouchableOpacity
                                style={{ marginTop: 20 }}
                                title="Registrate aquí" onPress={() => navigation.navigate("password")}>
                                <Text style={{ textDecorationLine: 'underline' }}>¿Olvidaste tu contraseña?</Text>
                            </TouchableOpacity>

                            <Text style={{ marginTop: 20 }}>¿No tienes cuenta?</Text>
                            <StatusBar style="auto" />
                            <TouchableOpacity title="Registrate aquí" onPress={() => navigation.navigate("register")}>
                                <Text style={{ textDecorationLine: 'underline' }}>Registrate aquí</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.backgroundImageContainer2}>
                            <Image source={require('../../assets/circulo_verde.png')} style={styles.backgroundImage2} />
                        </View>
                        <Image source={require('../../assets/pesa.png')} style={styles.contenedor} />
                    </View>

                </SafeAreaView>

            </>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.VERDE_CLARO,
        height:880
    },
    img:
    {
        width: 130,
        height: 130,
        marginBottom: 10,
        marginTop: 50,
    },
    Text: {
        fontSize: 30,
        marginBottom: 15,
        margin:15,
    },
    inputs:
    {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        color: "black",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        width: '70%',
        height: 50,
    },
      backgroundImageContainer2: {
        position: 'absolute',
        top: 0,
        left: 250,
        zIndex: -1,
      },
      backgroundImage2: {
        flex: 1,
        height: 430,
        width: 430,
        resizeMode: 'cover',
      },
      backgroundImageContainer3: {
        position: 'absolute',
        left: -150,
        top: -150,
        zIndex: -1,
      },
      backgroundImage3: {
        flex: 1,
        height: 480,
        width: 480,
        resizeMode: 'cover',
      },
      btnContainer:{
        borderRadius:3,
        width:160,
        alignItems:'center',
      },
      btn: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 160,
        //poner sombra al boton
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        }
      },
      contenedor: {
        width: 130,
        height: 130,
         marginLeft: 250,
         //girar la imagen
            transform: [{ rotate: '150deg' }],

        },
    });
    