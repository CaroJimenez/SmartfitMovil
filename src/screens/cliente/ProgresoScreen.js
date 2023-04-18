import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AppBarCliente from '../../components/common/AppBarClient'
import Modal from '../../components/common/Modal'
import ChangePeso from '../../components/count/ChangePeso'
import GraficProgress from '../../components/count/GraficProgress'
import { Icon } from 'react-native-elements';


export default function ProgresoScreen() {
    const [showModal, setshowModal] = useState(false);
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
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <AppBarCliente />
                <Text style={styles.input}>IMC: {imc}</Text>
                <Text style={styles.input}>Objetivo : {goal}</Text>
                <Text style={{ textAlign: "center", fontSize: 15 }}>Aquí podrás llevar un registro detallado de tu progreso en la pérdida de peso. Registra tu peso corporal para tener un control más efectivo de tu progreso.</Text>
                <Text style={styles.texto}>Para registrar tu peso, presiona el botón de editar</Text>
                {/* <Text style={styles.input}>{pesoChangePeso !== null ? pesoChangePeso : weight}</Text> // Muestra el peso de ChangePeso si existe */}
                <View style={styles.rowContainer}>
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
                </Modal>
                <GraficProgress />
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
    }
});