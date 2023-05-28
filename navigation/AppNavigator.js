import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/List';

const AppNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="ListScreen" component={ListScreen} options={() => ({ headerShown: false })} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;