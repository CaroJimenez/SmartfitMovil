import { TextInput } from 'react-native';
import React, { useState } from "react";
import { StyleSheet, ImageBackground } from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import colors from "../../utils/colors";

export default function EditRoutines() {
    const image = { uri: "https://image.lexica.art/full_jpg/53ba132b-f2d4-4f8a-a5f1-91bcd1b6229d" };
    const [exercise, setExercise] = useState('default');
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
                <Text style={styles.title}>Editar Rutinas</Text>
                
                <View style={[styles.contExercise]}>
                    <Picker
                    style={{ width: 250, marginBottom: 10 }}
                        selectedValue={exercise}
                        onValueChange={(itemValue) => {
                            setExercise(itemValue);
                            //formik.setFieldValue('gender', itemValue);
                        }}>
                        <Picker.Item label="Nombre de rutina" value="" />
                        <Picker.Item label="Crunch" value="Crunch" />
                    </Picker>
                    <View style={[styles.listaEjercicios]}>
                    <Text style={styles.nameEjercicios}>Lista de ejercicios aqui</Text>
                <Button
                        icon={
                            <Icon
                                type='material-community'
                                name="trash-can-outline"
                                size={20}
                                color="white"
                            />}
                        buttonStyle={{ backgroundColor: "#DD4614", borderRadius: 30, width: 40, height: 40, marginTop: 20 }}
                    />
                    </View>



                <Button
                    title="Agregar otro ejercicio"
                    titleStyle={{ fontSize: 14 }}
                    buttonStyle={{ backgroundColor: colors.VERDE_OSCURO, borderRadius: 30, width: 169, height: 35, marginTop: 20 }}
                />

                <Button
                    title="Actualizar"
                    titleStyle={{ fontSize: 14 }}
                    buttonStyle={{ backgroundColor: colors.AZUL_OSUCRO, borderRadius: 30, width: 100, height: 35, marginTop: 20, marginBottom: 15 }}

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
        color: colors.AZUL_OSUCRO,
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
        marginTop: 10,
        width: '70%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
    }
    ,
    name: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.AZUL_OSUCRO,
       marginBottom: 5,
    },
    listaEjercicios: {
        width: '70%',
        //alinear items a los lados
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    nameEjercicios: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: -18,
    },
    img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: -50,
        position: 'absolute',
        top: 0,
        left: -350,
        zIndex: -1,
    },
    img2:{
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 500,
        position: 'absolute',
        top: 29,
        right: -200,
        zIndex: -1,
    }
});