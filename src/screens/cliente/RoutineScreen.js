import { StyleSheet, Text, View, FlatList, TouchableOpacity , Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppBarCliente from '../../components/common/AppBarClient'
import axios from 'axios';
import colors from '../../utils/colors';
export default function RoutineScreen(props) {
    const { navigation, route } = props;
    const { miVariable } = route.params;

    const [rutinas, setRutinas] = useState([]);

    //Obtiene las rutinas del alumno
    useEffect(() => {
        fetch(`http://18.233.152.72:8080/auth/user/${miVariable}`)
            .then(response => response.json())
            .then(data => setRutinas(data))
            .catch(error => console.log(error));
    }, [miVariable]);
    
    const uniqueRoutines = rutinas.filter((routine, index, self) =>
    index === self.findIndex((r) => r.name === routine.name)
  );

    //En esta constante se renderiza cada rutina solo el nombre

    const renderRutina = ({ item }) => (
        <TouchableOpacity
        style={styles.rutinaButton} onPress={() => verEjercicios(item)}
            // Navegar a la pantalla de ver rutina, pasando los parámetros necesarios
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </TouchableOpacity>
      );

    //Manda los ejercicios de la rutina seleccionada a la pantalla de ejercicios
    const verEjercicios = (rutina) => {
        navigation.navigate('exerciseScreen', { namerutina: rutina.name, id: miVariable });
    };

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
            <AppBarCliente />
            <Text style={styles.title}>Rutinas</Text>
            {/* Mostrar la rutinas del alumno */}
            <FlatList
                data={uniqueRoutines}
                renderItem={renderRutina}
                keyExtractor={rutina => rutina.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        //colocar hacia arriba
        marginVertical: 5,
        marginHorizontal: 20,

    },
    cardDescription: {
        fontSize: 12,
        marginHorizontal: 20,
        color: 'white',
        //hacer la letra cursiva
        fontStyle: 'italic',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.VERDE_CLARO,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    rutinaButton: {
        backgroundColor: '#083464',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 35.7,
        width: 350,
    },
    rutinaText: {
        fontSize: 18,
    },img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 400,
        position: 'absolute',
        top: -470,
        right: -385,
        zIndex: -1,
    },
    img2: {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 400,
        position: 'absolute',
        top: 209,
        right: 150,
        zIndex: -1,
//voltear imagen modo espejo
        transform: [{ scaleX: -1 }],

    }
})