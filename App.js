import Signin from './screens/Signin';
import Signup from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Sign Up' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Sign Up" component={Signup} />
        <Stack.Screen name="Sign In" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
