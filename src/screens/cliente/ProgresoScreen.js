import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import AppBarClient from '../../components/common/AppBarClient';
import { Icon, Input, Button } from 'react-native-elements';
import colors from '../../utils/colors';
import * as yup from 'yup';
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { LineChart } from 'react-native-chart-kit';

export default function ProgresoScreen(props) {
    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth * 0.9;
    const chartHeight = 220;

    const { navigation, route } = props;
    const { miVariable } = route.params;

    const [alumnos, setAlumnos] = useState([]);
    const getAlumnos = async () => {
        const response = await fetch(`http://18.233.152.72:8080/auth/alumno/${miVariable}`)
        const data = await response.json();
        setAlumnos(data);

    }
    useEffect(() => {
        getAlumnos();
    }, []);

    const imc = alumnos.current_weight / (alumnos.height * alumnos.height);
    //quitar decimales
    const imc2 = imc.toFixed(2);

    //formik con la validacion del campo peso
    const formik = useFormik({
        initialValues: {
            peso: "",
        }, validationSchema: yup.object({
            peso: yup.number().required("Ingresa un peso").
                positive("Ingresa un número positivo").integer("Ingresa un número entero").
                min(1).max(300)
        }),
        validateOnChange: false,
        onSubmit: async (formValue, { setSubmitting }) => {
            insertarPeso(formValue.peso);
            actualizarPeso(formValue.peso);
            setSubmitting(false);

            Toast.show({
                type: "success",
                position: "top",
                text1: "Peso registrado",
                text2: "El peso se ha registrado correctamente",
                visibilityTime: 4000,
            });
            navigation.navigate('homeClient');
        }
    })

    const insertarPeso = async (peso) => {
        //crear una fecha de hoy
        const date = new Date().toISOString().slice(0, 10);
        //INSERTAR NUEVO PESO
        const response = await fetch(`http://18.233.152.72:8080/auth/record/insertRecord?weight=${peso}&date=${date}&userId=${miVariable}`, {
            method: 'POST',
        });
        const data = await response.json();
        //SÍ INSERTA
    }

    const actualizarPeso = async (peso) => {
        try {
            const response = await fetch(`http://18.233.152.72:8080/auth/updateWeight/${miVariable}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    current_weight: peso
                })
            });

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                console.error(`Error al analizar respuesta JSON: ${err}`);
                console.error(`Texto recibido: ${text}`);
                return;
            }

            console.log(data);

        } catch (error) {
            console.error(error);
        }
    }

    const [record, setRecord] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://18.233.152.72:8080/auth/record/record/${miVariable}`);
                const data = await response.json();
                setRecord(data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    if (!record) {
        return null; // o un componente de carga mientras se carga el registro
    }


    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        
    };

    const data = {
        labels: record.map((r) => r.date.split("T")[0]),
        datasets: [
          {
            data: record.map((r) => r.weight),
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          },
        ],
      };
      

    return (
        <ScrollView style={{backgroundColor: colors.VERDE_CLARO}}>

            <View style={styles.contenedor}>
                <View style={styles.appBar}>
                    <AppBarClient />
                </View>
                <View style={styles.weightForm}>
                    <Text style={styles.label}>Peso</Text>
                    <View style={{ width: 300 }}>
                        <Input
                            placeholder="Nuevo peso"
                            containerStyle={styles.inputs}
                            rightIcon={
                                <Icon type="material-community" name="weight-kilogram" iconStyle={styles.icon} />
                            }
                            onChangeText={(text) => formik.setFieldValue("peso", text)}
                            errorMessage={formik.errors.peso}
                        />
                        <Button
                            title="Actualizar"
                            buttonStyle={{ backgroundColor: colors.AZUL_OSUCRO, borderRadius: 10, width: 100, height: 40 }}
                            titleStyle={{ color: 'white' }}
                            onPress={formik.handleSubmit}

                            loading={formik.isSubmitting}
                        />
                        <Text style={styles.imc}>Tu IMC actual es: {imc2}</Text>
                    </View>


                </View>
                <View style={styles.grafica}>
                    <LineChart
                        data={data}
                        width={screenWidth}
                        height={chartHeight}
                        chartConfig={chartConfig}
                        bezier
                        />
                </View>


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    result: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    input: {
        width: 267,
        height: 32,
        borderWidth: 1,
        borderRadius: 32,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    appBar: {
        //alinear appbar hasta arriba
        marginTop: 0,
        width: '100%',

    }, inputs: {
        width: '70%',
        height: 50,
        //poner bordes
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: '#EEEEEE',
        marginBottom: 20,

    }, weightForm: {
        marginTop: 20,
    },
    grafica: {
        marginTop: 20,
    },
    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },imc:{
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,

    }
});