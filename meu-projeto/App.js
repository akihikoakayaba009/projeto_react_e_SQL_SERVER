// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './telainicial';
import TelaSecundaria from './TelaSecundaria';
import TelaEditar from './telaeditar';
import Login from './Login';
import BuscarClientes from './BuscarClientes';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="TelaSecundaria" component={TelaSecundaria} />
        <Stack.Screen name="TelaEditar" component={TelaEditar} /> 
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BuscarClientes" component={BuscarClientes} />
          </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
