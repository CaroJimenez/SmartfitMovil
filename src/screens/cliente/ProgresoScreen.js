import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AppBarClient from '../../components/common/AppBarClient';
import { Icon, Input, Button } from 'react-native-elements';
import colors from '../../utils/colors';
import * as yup from 'yup';
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
/*
import Modal from '../../components/common/Modal'
import ChangePeso from '../../components/count/ChangePeso'
import GraficProgress from '../../components/count/GraficProgress'
*/


export default function ProgresoScreen(props) {
    const { navigation, route } = props;
    const { miVariable } = route.params;

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
        const response = await fetch(`http://54.227.146.247:8080/auth/record/insertRecord?weight=${peso}&date=${date}&userId=${miVariable}`, {
            method: 'POST',
        });
        const data = await response.json();
        //SÍ INSERTA
    }

    const actualizarPeso = async (peso) => {
        try {
            const response = await fetch(`http://54.227.146.247:8080/auth/updateWeight/${miVariable}`, {
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
                const response = await fetch(`http://54.227.146.247:8080/auth/record/record/${miVariable}`);
                const data = await response.json();
                setRecord(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);




    /*  const [showModal, setshowModal] = useState(false);
      const [conteined, setConteined] = useState(null);
      const onClose = () => setshowModal(false);
      const [pesoChangePeso, setPesoChangePeso] = useState(null); // Nuevo estado para almacenar el peso de ChangePeso
  
      //Variables estaticas
      const [weight, setWeight] = useState(70); // Peso predefinido
      const [height, setHeight] = useState(1.75); // Altura predefinida
      const [goal, setGoal] = useState('Bajar de Peso'); // Objetivo predefinido
      const [imc, setImc] = useState(0);
  
      useEffect(() => {
          const imc = weight / (height * height);
          setImc(imc.toFixed(2));
      }, []);
  
      // Llamada al posible servicio de Spring
      // const fetchData = async () => {
      //     try {
      //         const response = await axios.get('http://your-api-endpoint');
      //         const { weight, height, goal } = response.data;
      //         setWeight(weight);
      //         setHeight(height);
      //         setGoal(goal);
      //     } catch (error) {
      //         console.error(error);
      //     }
      // };
  
      // useEffect(() => {
      //     fetchData();
      // }, []);
  
      // Cálculo del IMC
      //Aqui masomenos verifique de que si el peso de ChangePeso es diferente al peso del servicio volviera a calcular el imc
      useEffect(() => {
          let newImc;
          if (pesoChangePeso !== null && pesoChangePeso !== weight) { // Verifica si el peso de ChangePeso es diferente al peso del servicio
              newImc = pesoChangePeso / (height * height);
              setWeight(pesoChangePeso);
          } else {
              newImc = weight / (height * height);
          }
          setImc(newImc.toFixed(2));
      }, [weight, height, pesoChangePeso]);
  
      // Función para actualizar el peso desde ChangePeso
      const handleUpdateWeight = (newWeight) => {
          setPesoChangePeso(newWeight);
      }
  
      const handleChangePress = () => {
          setConteined(<ChangePeso close={onClose} onUpdateWeight={handleUpdateWeight} peso={weight} />);
          setshowModal(true);
      }*/

    return (
        <ScrollView style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                    </View>


                </View>

                {/* 
                <Text style={styles.input}>IMC: {imc}</Text>
                <Text style={styles.input}>Objetivo : {goal}</Text>
                
                <Text style={styles.texto}>Para registrar tu peso, presiona el botón de editar</Text>
                {/* <Text style={styles.input}>{pesoChangePeso !== null ? pesoChangePeso : weight}</Text> // Muestra el peso de ChangePeso si existe */}
                {/*}<View style={styles.rowContainer}>
                    <TouchableOpacity onPress={handleChangePress}>
                        <Icon
                            name="edit"
                            type="material"
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                <Modal visible={showModal} close={onClose}>
                    {conteined}
    </Modal>*/}
                {/* <GraficProgress />*/}
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
    }
});