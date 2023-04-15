import React from "react";
import { Text as RNText, StyleSheet } from "react-native/types";

const styles = StyleSheet.create({
    fontFamily: "town-70-accent-extra-thin-1",
})
function Text({children}){
    return <RNText style={styles.text}>{children}</RNText>;
}