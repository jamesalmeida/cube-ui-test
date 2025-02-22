import React from 'react';
import { LogBox } from 'react-native'; //ignore warnings for now about the Animated.event from the cube navigation library
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CubeScreen from './src/CubeScreen';

LogBox.ignoreLogs([
  'Animated.event now requires a second argument for options',
  'Animated: `useNativeDriver` was not specified',
]);

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Cube">
          <Stack.Screen name="Cube" component={CubeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;