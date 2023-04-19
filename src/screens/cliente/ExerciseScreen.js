import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import AppBarCliente from '../../components/common/AppBarClient';
import Modal from '../../components/common/Modal';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import colors from '../../utils/colors';

export default function ExerciseScreen({ route }) {
    const { id } = route.params;
    const { namerutina } = route.params;
    const [showModal, setShowModal] = useState(false);
    const [videoId, setVideoId] = useState('');
    const [ejercicios, setEjercicios] = useState([]);

    const guardarListaEjercicios = () => {
      const url = `http://192.168.0.4:8090/auth/${namerutina}/user/${id}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setEjercicios(data);
        })
        .catch(error => console.log(error));
    }
    
    useEffect(() => {
      guardarListaEjercicios();
    }, []);
    
    const onClose = () => {
        setShowModal(false);
        setVideoId('');
    };

    //Reproducir video
    const reproducirVideo = (url) => {
        setShowModal(true);
        //Obtenemos el id del video que son los ultimos 11 caracteres
        const videoId = url.match(/[a-zA-Z0-9_-]{11}/)[0];
        //Y ya despues solo mandamos esos 11 caracteres
        setVideoId(videoId);
    };

    const renderEjercicio = ({ item }) => {
        return (
            <TouchableOpacity style={styles.ejercicioContainer} onPress={() => reproducirVideo(item.exercise.url)}>
            
                <View style={styles.iconContainer}>
                    <Icon
                        type="material-community"
                        name="youtube"
                        color="red"
                        size={50}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.ejercicioText}>{item.exercise.name}</Text>
                    <Text style={styles.repeticionesText}> Repeticiones:  {item.exercise.repeats}</Text>
                </View>

            </TouchableOpacity>
        );
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
            <Text style={{   fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        marginHorizontal: 20,}}>Ejercicios </Text>
            <FlatList
                data={ejercicios}
                renderItem={renderEjercicio}
                keyExtractor={(item, index) => index.toString()}
            />
            <Modal visible={showModal} close={onClose}>
                <YoutubePlayer
                    videoId={videoId}
                    height={200}
                    play={true}
                    onChangeState={event => console.log(event)}
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: colors.VERDE_CLARO,
        
    },
    ejercicioContainer: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        width: '70%',
        alignSelf: 'center',

    },
    textContainer: {
        flex: 1,
        marginLeft: 15,
    },
    ejercicioText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    repeticionesText: {
        fontSize: 14,
        color: '#555',
    },
    iconContainer: {
        marginLeft: 35,
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
        top: 165,
        right: 150,
        zIndex: -1,
//voltear imagen modo espejo
        transform: [{ scaleX: -1 }],

    }
});