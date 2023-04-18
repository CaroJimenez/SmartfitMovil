import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
    const { visible, close, children } = props;
    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={close}
            overlayStyle={styles.overlay}
        >
            {children}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: "#fff",
        height: "auto",
        width: "90%",
    },
});