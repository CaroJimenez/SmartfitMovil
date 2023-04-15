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
        <ImageBackground source={image} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Agrega o elimina ejercicios</Text>
                <Text style={styles.name}>Rutina de piernas</Text>
                <Text>Esta rutina te ayudará a fortalecer el tren inferior</Text>
                <View style={[styles.contExercise]}>
                    <Picker
                    style={{ width: 250 }}
                        selectedValue={exercise}
                        onValueChange={(itemValue) => {
                            setExercise(itemValue);
                            //formik.setFieldValue('gender', itemValue);
                        }}>
                        <Picker.Item label="Selecciona tu un ejercicio" value="" />
                        <Picker.Item label="Crunch" value="Crunch" />
                    </Picker>
                    <Button
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
                <Button
                    title="Agregar otro ejercicio"
                    buttonStyle={{ backgroundColor: colors.VERDE_OSCURO, borderRadius: 30, width: 200, height: 40, marginTop: 20 }}
                />

                <Button
                    title="Actualizar rutina"
                    buttonStyle={{ backgroundColor: colors.AZUL_OSUCRO, borderRadius: 30, width: 200, height: 40, marginTop: 20 }}

                />
            </View>

        </ImageBackground>
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
        color: colors.AZUL_CLARO,
        marginTop: 20,
        marginBottom: 20,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",

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
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.AZUL_OSUCRO,
       marginBottom: 5,
    },
});