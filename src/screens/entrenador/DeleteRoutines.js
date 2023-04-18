import React, { useState, useEffect } from "react";
import { StyleSheet, Alert} from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import colors from "../../utils/colors";
import Toast from "react-native-toast-message";

export default function DeleteRoutines(props) {
    const { navigation, route } = props;
    const { alumnoId } = route.params;
    const [rutinas, setRutinas] = useState([]);
    
    const getRutinas = async () => {
        try {
          const response = await fetch(`http://192.168.0.7:8090/auth/user/${alumnoId}`, { timeout: 120000 });
          const data = await response.json();
          setRutinas(data);
        } catch (error) {
          console.log("An error occurred while fetching the data:", error);
        }
      }
      
    useEffect(() => {
        getRutinas();
    }, []);


    //funcion para eliminar una rutina
    const deleteRoutine = async (nameRoutine) => {
        if (nameRoutine === "undefined") {
          console.log("no se puede eliminar");
        } else {
          Alert.alert(
            "Eliminar rutina",
            `¿Estás seguro que quieres eliminar la rutina ${nameRoutine}?`,
            [
              {
                text: "Cancelar",
                style: "cancel",
              },
              {
                text: "Eliminar",
                onPress: async () => {
                  let response = await fetch(`http://192.168.0.7:8090/auth/${alumnoId}/${nameRoutine}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {}
                    
                  })
                  .catch(error => {
                      console.log("Error occurred while making the request:", error);
                  });
                  navigation.navigate("clientData", {alumnoId});
                  Toast.show({
                    type: 'success',
                    text1: 'Rutina eliminada',
                    text2: 'La rutina se ha eliminado correctamente',
                  });
                },
                style: "destructive",
              },
            ]
          );
        }
      }
      

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

            <Text style={styles.title}>Eliminar Rutinas</Text>
            <View style={styles.contenido}>
                <View style={styles.cabecera}>
                    <Text style={styles.textCabecera}>Nombre</Text>
                </View>

                <View style={styles.tabla}>
                    {rutinas.map((rutina) => (
                        <View key={rutina.id_routines} style={styles.contExercise}>
                            <Text style={styles.name}>{rutina.name}</Text>
                            <View style={styles.iconos}>
                                <Button
                                    icon={
                                        <Icon
                                            type='material-community'
                                            name="trash-can-outline"
                                            size={20}
                                            color="white"
                                        />}

                                    onPress={() => deleteRoutine(rutina.name)}
                                    buttonStyle={{ backgroundColor: "#DD4614", borderRadius: 30, width: 40, height: 40 }}
                                />
                                <Button
                                    icon={
                                        <Icon
                                            type='material-community'
                                            name="eye-outline"
                                            size={20}
                                            color="white"
                                        />}
                                    buttonStyle={{ backgroundColor: colors.AZUL_OSUCRO, borderRadius: 30, width: 40, height: 40 }}
                                />
                            </View>
                        </View>
                    ))}


                </View>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.AZUL_CLARO,
        marginBottom: 20,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.VERDE_CLARO,
        height: '100%',

    },
    contExercise: {
        flexDirection: 'row',
        marginBottom: 15,
    }
    ,
    name: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 50,
        marginTop: 10,
    },
    cabecera: {
        flexDirection: 'row',
        width: '60%',
        marginTop: 20,
    },
    textCabecera: {
        fontSize: 17.8,
        fontWeight: "bold",
        color: colors.AZUL_OSUCRO,
        marginBottom: 4,
        marginLeft: 50,
    },
    contenido: {
        marginTop: 20,
        width: '100%',
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 20,
    },
    iconos: {
        flexDirection: 'row',
        marginLeft: 50,
        //posicionar iconos a la derecha
        position: 'absolute',
        right: 0,
        marginRight: 20,

    },
    tabla: {
        flexDirection: 'column',
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
    },
    img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 500,
        position: 'absolute',
        top: 0,
        left: -250,
        zIndex: -1,
    },
    img2: {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: -100,
        position: 'absolute',
        top: -10,
        right: 10,
        zIndex: -1,
    },
});