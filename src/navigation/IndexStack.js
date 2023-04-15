import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

export default function IndexStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='indexS'
          component={ IndexScreen}
          options={{title:"Iniciar sesión"}}
          />
      </Stack.Navigator>
    )
  }