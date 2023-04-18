import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeIScreen from "../screens/entrenador/HomeIScreen";
import RoutinesScreen from "../screens/entrenador/RoutinesScreen";
import ClientsScreen from "../screens/entrenador/ClientsScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function NavigationInstructor() {
    return (
        <Tab.Navigator
        screenOptions={{headerShown: false}}
        >
            <Tab.Screen name="routines" component={RoutinesScreen} options={{ title: "Rutinas" }} />
            <Tab.Screen name="clients" component={ClientsScreen} options={{ title: "Clientes" }} />
            <Tab.Screen name="homeInstructor" component={HomeIScreen} options={{ title: "Inicio" }} />
        </Tab.Navigator>


    );
}