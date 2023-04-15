import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "./src/screens/IndexScreen";
import { NavigationContainer } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import 'react-native-gesture-handler';
import AppNavigation from './src/navigation/AppNavigation';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
   <AppNavigation/>
 </NavigationContainer>
 <Toast/>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
