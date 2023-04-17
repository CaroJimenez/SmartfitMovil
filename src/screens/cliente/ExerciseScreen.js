import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import AppBarCliente from '../../components/common/AppBarClient';
import Modal from '../../components/common/Modal';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function ExerciseScreen({ route }) {
    const { ejercicios } = route.params;
    const [showModal, setShowModal] = useState(false);
    const [videoId, setVideoId] = useState('');

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
            <TouchableOpacity style={styles.ejercicioContainer} onPress={() => reproducirVideo(item.link)}>
                <View style={styles.iconContainer}>
                    <Icon
                        type="material-community"
                        name="youtube"
                        color="red"
                        size={50}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.ejercicioText}>{item.nombre}</Text>
                    <Text style={styles.repeticionesText}> Repeticiones:  {item.repeticiones}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <AppBarCliente />
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>Ejercicios: </Text>
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
    },
    ejercicioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textContainer: {
        flex: 1,
        marginLeft: 15,
    },
    ejercicioText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    repeticionesText: {
        fontSize: 16,
        color: '#555',
    },
    iconContainer: {
        marginLeft: 35,
    },
});