import Signin from './screens/Signin';
import Signup from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/auth';
import Home from './screens/Home';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
          <Stack.Navigator initialRouteName='Sign In' screenOptions={{headerShown: false}}>
            <Stack.Screen name="Sign Up" component={Signup} />
            <Stack.Screen name="Sign In" component={Signin} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  )
}
