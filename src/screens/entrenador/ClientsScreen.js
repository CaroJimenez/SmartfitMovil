import { Picker } from "@react-native-picker/picker";
import React, { useState , useEffect} from "react";
import { StyleSheet,ScrollView } from 'react-native';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useFormik } from "formik";
import colors from "../../utils/colors";
const image = { uri: "" };
export default function ClientsScreen(props) {
    const { navigation } = props;
    const [search, setSearch] = useState('');

    const selectClient = (id_alumno) => {
        //mandar el id recibido y navegar a la pantalla de datos del cliente
        navigation.navigate("clientData", { id_alumno})
    };

    //filtro de busqueda
    const formikSearch = useFormik({
        initialValues: {
            searchClient: "",
        },
        validateOnChange: true,
        onSubmit: async (formValue, { setSubmitting }) => {
            console.log(formValue);
            setSubmitting(false);
        }
    });
    //filtro de seleccion
    const formikFilter = useFormik({
        initialValues: {
            clientFilter: "",
        },
        validateOnChange: true,
        onSubmit: async (formValue, { setSubmitting }) => {
            console.log(formValue);
            setSubmitting(false);
        }
    });

    //mandar a traer el servicio de listar clientes con fetch
    const [clients, setClients] = useState([]);
    const getClients = async () => {
        const response = await fetch('http://192.168.0.7:8090/auth/listaAlumnos');
        const data = await response.json();
        setClients(data);
        
    }
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.last_name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase())
      );
    useEffect(() => {
        getClients();
    }, []);
    

    return (
        <ScrollView>
        <View style={styles.background}>

            <Image
                style={styles.img}
                source={require("../../../assets/circulo_verde.png")}
            />
            <Image
                style={styles.img2}
                source={require("../../../assets/franja_azul.png")}
            />
            <View style={[styles.contSearch, styles.inputs]}>
                <Input
                    placeholder="Buscar usuario" style={{ fontSize: 15.5 }}
                    defaultValue={search}
                    onChange={event => setSearch(event.nativeEvent.text)}
                    rightIcon={
                        <Icon
                            onPress={formikSearch.handleSubmit}
                            type="material-community" name="magnify" iconStyle={styles.icon} />
                    }
                />
            </View>
            <Text style={{ marginTop: 15 }}></Text>

            {/*
        mapear clientes y mostrarlos en un view
        */}
           {filteredClients.map((client, index) => (
  <View key={client.id} style={[styles.client]}>
    <View style={styles.datos}>
      <Text style={[styles.text, {fontWeight:'bold'}]}>{client.name} {client.last_name}</Text>
      <Text style={[styles.text]}>{client.email} </Text>

      <View style={{ position: 'absolute', right: 0, marginRight: 15, marginTop: 15 }}>
        <Icon
          onPress={() => selectClient(client.id)}
          type="material-community" name="eye-outline" size={20} color="#333" />
      </View>
    </View>
  </View>
))}



        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contSearch: {
        //centrar
        marginLeft: 'auto',
        marginRight: 'auto',
    }, inputs: {
        width: '70%',
        height: 50,
        marginTop: 10,
        //poner bordes
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: '#EEEEEE',

    },
    client: {
        //centrar
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '70%',
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#CBCBCB',
    },
    text: {
        marginLeft: 10,
        marginTop: 4,
    },
    icon: {

    },
    background: {
        backgroundColor: colors.VERDE_CLARO,
        //abarcar toda la pantalla
        height: 1000,
    },
    img:
    {
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: 500,
        position: 'absolute',
        top: 0,
        left: 250,
        zIndex: -1,
    },
    img2:{
        width: 500,
        height: 500,
        marginBottom: 10,
        marginTop: -100,
        position: 'absolute',
        top: -10,
        right: 10,
        zIndex: -1,
    }
});