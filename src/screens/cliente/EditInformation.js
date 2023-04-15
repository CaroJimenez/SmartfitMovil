import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message';
import { Formik } from 'formik';
import * as yup from 'yup';
import AppBarCliente from '../../components/common/AppBarClient';

//Llamamos una constante para validar que no se manden caracteres especiales
const validationSchema = yup.object().shape({
    nombres: yup.string().matches(/^[a-zA-Z ]*$/, 'Solo se permiten letras').required('Campo requerido'),
    apellidos: yup.string().matches(/^[a-zA-Z ]*$/, 'Solo se permiten letras').required('Campo requerido'),
    correo: yup.string().email('Correo electrónico inválido').matches(/utez.edu.mx$/, 'El correo debe terminar con "utez.edu.mx"').required('Campo requerido'),
    peso: yup.number().typeError('Solo se permiten números').required('Campo requerido'),
    altura: yup.number().typeError('Solo se permiten números').required('Campo requerido'),
});

export default function EditInformation() {
    //Definimos los estados para los campos de texto
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const navigation = useNavigation();
    //El route nos permite obtener los parametros que se mandan de una pantalla a otra
    const route = useRoute();
    //Data es el objeto que contiene los datos del usuario
    const { data } = route.params;

    const cancelar = () => {
        navigation.goBack();
    }

    const actualizarPantalla = () => {
        route.params.onUpdate();
    }
    //Aqui imprime la data pa ver que rollo
    console.log(data);

    React.useEffect(() => {
        if (data) {
            setNombre(data.name);
            setApellidos(data.lastName);
            setCorreo(data.email);
            setPeso(data.weight);
            setAltura(data.height);
            setFechaNacimiento(data.birthdate);
        }
    }, [data]);

    const actualizar = async (values) => {
        try {
            //Se supone que masomens asi se consume en servicio
            const response = await fetch(`//192.168.100.10:8090/auth/updateAlumno/${data.id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: values.nombres,
                    lastName: values.apellidos,
                    email: values.correo,
                    weight: values.peso,
                    height: values.altura,
                    birthdate: fechaNacimiento,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Información actualizada',
                });
                actualizarPantalla();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error al actualizar la información',
                    text2: data.message || '',
                });
            }
        } catch (error) {
            console.error(error);
        }
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <AppBarCliente />
            <Formik
                initialValues={{
                    nombres: nombre,
                    apellidos: apellidos,
                    correo: correo,
                    peso: peso,
                    altura: altura,
                    fechaNacimiento: fechaNacimiento
                }}
                onSubmit={(values) => actualizar(values)}
                validationSchema={validationSchema}
            >
                <Text style={styles.label}>Apellidos:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('apellidos')}
                    onBlur={handleBlur('apellidos')}
                    value={values.apellidos}
                />
                {errors.apellidos && touched.apellidos && (
                    <Text style={styles.error}>{errors.apellidos}</Text>
                )}

                <Text style={styles.label}>Correo:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('correo')}
                    onBlur={handleBlur('correo')}
                    value={values.correo}
                />
                {errors.correo && touched.correo && (
                    <Text style={styles.error}>{errors.correo}</Text>
                )}

                <Text style={styles.label}>Peso:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('peso')}
                    onBlur={handleBlur('peso')}
                    value={values.peso}
                />
                {errors.peso && touched.peso && (
                    <Text style={styles.error}>{errors.peso}</Text>
                )}

                <Text style={styles.label}>Altura:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('altura')}
                    onBlur={handleBlur('altura')}
                    value={values.altura}
                />
                {errors.altura && touched.altura && (
                    <Text style={styles.error}>{errors.altura}</Text>
                )}

                <Text style={styles.label}>Fecha de nacimiento:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('fechaNacimiento')}
                    onBlur={handleBlur('fechaNacimiento')}
                    value={values.fechaNacimiento}
                />
                {errors.fechaNacimiento && touched.fechaNacimiento && (
                    <Text style={styles.error}>{errors.fechaNacimiento}</Text>
                )}

                <TouchableOpacity style={styles.botonIzquierdo} onPress={cancelar}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonDerecho} onPress={handleSubmit}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>Actualizar</Text>
                </TouchableOpacity>
            </Formik>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 267,
        height: 32,
        borderWidth: 1,
        borderRadius: 32,
        paddingHorizontal: 10,
    },
    botonIzquierdo: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 15,
        backgroundColor: 'blue',
        position: 'absolute',
        width: 159.57,
        height: 47.75,
        left: 11,
        top: 569,
    },
    botonDerecho: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 159.57,
        height: 47.75,
        left: 188,
        top: 568,
        borderRadius: 15,
        backgroundColor: 'red',
    },
})