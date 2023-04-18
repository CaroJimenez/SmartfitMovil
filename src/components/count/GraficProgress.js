import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';

export default function GraficProgress() {
 //Podible solucion al servicio
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch('http://tu.servicio-web.com/pesos')
    //         .then(response => response.json())
    //         .then(data => setData(data))
    //         .catch(error => console.error(error));
    // }, []);
    // const labels = data.map((item) => item.date);
    // const weights = data.map((item) => item.weight);

    const data = [
        { weight: 70, date: '2023-04-01' },
        { weight: 69, date: '2023-04-02' },
        { weight: 68.5, date: '2023-04-03' },
        { weight: 67, date: '2023-04-04' },
    ];

    const labels = data.map((item) => item.date);
    const weights = data.map((item) => item.weight);
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(25, 132, 192, ${opacity})`,
        strokeWidth: 3,
        barPercentage: 0.8,
        useShadowColorFromDataset: false,
        fillShadowGradientOpacity: 1,
        fillShadowGradient: '#1976d2',
        decimalPlaces: 1,
        verticalLabelRotation: 45,
    };

    return (
        <View style={styles.container}>
            <View style={styles.textoContainer}>
                <Icon name="info-circle" size={15} color="#666" />
                <Text style={styles.texto}>Progreso de peso en Kg</Text>
            </View>
            <LineChart
                data={{
                    labels,
                    datasets: [
                        {
                            data: weights,
                            color: () => '#1976d2',
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={chartConfig}
                style={{ borderRadius: 10 }}
                bezier
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    textoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    texto: {
        fontSize: 16,
        color: 'black',
        marginLeft: 5,
        writingDirection: 'vertical',
    },
});
