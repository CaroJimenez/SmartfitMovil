import React from "react";
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import colors from "../utils/colors";
import { Input, Button, Icon } from "react-native-elements";
import * as yup from 'yup';
import { useFormik } from "formik";

export default function PasswordScreen() {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        //validaciones del formulario
        validationSchema: yup.object({
            email: yup.string()
                .email("Formato de correo no válido")
                .required("Email obligatorio"),
        }),
        validateOnChange: false,
        //recibe el correo
        onSubmit: async (formValue, { setSubmitting }) => {
            // este es el correo
            const correo = formValue['email'];
            console.log(correo);
            setSubmitting(false);
        }
        

    });
    return (
        <>
       <Text>Recupera tu contraseña</Text>
       <Text>Ingresa tu correo con el que registraste tu cuenta,
              te enviaremos un correo para que puedas recuperar tu contraseña
       </Text>
       <Input
                    placeholder="Correo de UTEZ"
                    containerStyle={styles.inputs}
                    rightIcon={
                        <Icon type="material-community" name="at" iconStyle={styles.icon} />
                    }
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    errorMessage={formik.errors.email}
                />
                   <Button
                    title="Enviar correo"
                    containerStyle={[styles.containerBtn, { backgroundColor: colors.AZUL_OSCURO }]}
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
                />

       
        </>
    );
    }

    const styles = StyleSheet.create({
        
    });