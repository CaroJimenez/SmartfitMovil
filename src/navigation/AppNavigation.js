import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import PasswordScreen from "../screens/PasswordScreen";
import HomeCScreen from "../screens/cliente/HomeCScreen";
import HomeIScreen from "../screens/entrenador/HomeIScreen";
import RoutinesScreen from "../screens/entrenador/RoutinesScreen";
import ClientsScreen from "../screens/entrenador/ClientsScreen";
import ClientDataScreen from "../screens/entrenador/ClientDataScreen";
import EditRoutines from "../screens/entrenador/EditRoutines"
import DeleteRoutines from "../screens/entrenador/DeleteRoutines";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InformationScreen from "../screens/cliente/InformationScreen";
import EditInformationScreen from "../screens/cliente/EditInformation";
import ExerciseScreen from "../screens/cliente/ExerciseScreen";
const Stack = createNativeStackNavigator();


export default function AppNavigation() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" component={IndexScreen} options={{title:"Iniciar sesión"}} />
            <Stack.Screen name="register" component={RegistrationScreen} options={{title:"Registro"}} />
            <Stack.Screen name="password" component={PasswordScreen} options={{title:"Recuperar contraseña"}} />
            <Stack.Screen name="homeClient" component={HomeCScreen} options={{title:"Inicio"}} />
            <Stack.Screen name="homeInstructor" component={HomeIScreen} options={{title:"Inicio"}} />
            <Stack.Screen name="routines" component={RoutinesScreen} options={{title:"Rutinas"}} />
            <Stack.Screen name="deleteRoutines" component={DeleteRoutines} options={{title:"Eliminar rutina"}}/>
            <Stack.Screen name="clients" component={ClientsScreen} options={{title:"Clientes"}} />
            <Stack.Screen name="clientData" component={ClientDataScreen} options={{title:"Datos del cliente"}} />
            <Stack.Screen name="editRoutines" component={EditRoutines} options={{title:"Editar rutina"}}/>
            {/* Temporalmente las pantallas de cliente */}
            <Stack.Screen name="infoClientScreen" component={InformationScreen} options={{title:"Informacion Cliente"}}/>
            <Stack.Screen name="editInfoClientScreen" component={EditInformationScreen} options={{title:"Edit Informacion Cliente"}}/>
            <Stack.Screen name="rotineScreen" component={RoutinesScreen} options={{title:"Rutina"}}/>
            <Stack.Screen name="exerciseScreen" component={ExerciseScreen} options={{title:"Ejercicios"}}/>
        </Stack.Navigator> 
    );
}