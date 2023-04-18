import React from "react";
import { ActivityIndicator , StyleSheet, Text} from "react-native";
import { Overlay} from "react-native-elements";

export default function Loading() {
    return (
        <Overlay>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text>Cargando...</Text>
        </Overlay>
    )
}

const styles = StyleSheet.create({})