import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import colors from "../../utils/colors";
import Toast from "react-native-toast-message";
import AppBarCoach from "../../components/common/AppBarCoach";
//TERMINADO
export default function DeleteRoutines(props) {
  const { navigation, route } = props;
  const { alumnoId } = route.params;
  const [rutinas, setRutinas] = useState([]);

  const getRutinas = async () => {
    try {
      const response = await fetch(`http://192.168.0.5:8090/auth/user/${alumnoId}`);
      const data = await response.json();
      setRutinas(data);
    } catch (error) {
      console.log("An error occurred while fetching the data:", error);
    }
  }

  useEffect(() => {
    getRutinas();
  }, []);

  const uniqueRoutines = [...new Set(rutinas.map((rutina) => rutina.name))];


  //funcion para eliminar una rutina
  const deleteRoutine = async (nameRoutine) => {
    if (!nameRoutine) {
      console.log("No se puede eliminar: nombre de rutina vacío o indefinido");
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
              let response = await fetch(`http://192.168.0.5:8090/auth/${alumnoId}/${nameRoutine}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: {}
              })
                .catch(error => {
                  console.log("Error occurred while making the request:", error);
                });

              if (response.ok) {
                // Remove the deleted routine from the state
                setRutinas(prevRutinas => prevRutinas.filter(rutina => rutina.name !== nameRoutine));

                navigation.navigate("clientData", { alumnoId });
                Toast.show({
                  type: 'success',
                  text1: 'Rutina eliminada',
                  text2: 'La rutina se ha eliminado correctamente',
                });
              } else {
                console.log(`Error al eliminar la rutina: ${response.status} - ${response.statusText}`);
              }
            },
            style: "destructive",
          },
        ]
      );
    }
  }

  const verRutina = (alumnoId, name) => {
    navigation.navigate("routinesClient", { alumnoId, name });
  }



  return (

    <View style={styles.container}>
      <View style={styles.appBar}>
                <AppBarCoach />
            </View>
      <Image
        style={styles.img}
        source={require("../../../assets/circulo_verde.png")}
      />
      <Image
        style={styles.img2}
        source={require("../../../assets/franja_azul.png")}
      />

      <Text style={styles.title}>Rutinas</Text>
      <View style={styles.contenido}>
        <View style={styles.cabecera}>
          <Text style={styles.textCabecera}>Nombre</Text>
        </View>

        <View style={styles.tabla}>
          {uniqueRoutines.map((name) => (
            <View key={name} style={styles.contExercise}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.iconos}>
              <Button
                  icon={
                    <Icon
                      type='material-community'
                      name="pencil"
                      size={20}
                      color="white"
                    />}
                  onPress={() => verRutina(alumnoId, name)}
                  buttonStyle={{ backgroundColor: "#E8952B", borderRadius: 30, width: 40, height: 40 }}
                />
                <Button
                  icon={
                    <Icon
                      type='material-community'
                      name="trash-can-outline"
                      size={20}
                      color="white"
                    />}
                  onPress={() => deleteRoutine(name)}
                  buttonStyle={{ backgroundColor: "#DD4614", borderRadius: 30, width: 40, height: 40 }}
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
    //creacr espacio entre iconos
    justifyContent: 'space-between',
    width: 100,

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
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
},
});