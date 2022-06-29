import { useContext } from "react"
import Signin from '../../screens/Signin';
import Signup from '../../screens/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import { AuthContext } from '../../context/auth';
import HeaderTab  from "./HeaderTab";


const Stack = createNativeStackNavigator();
export default function ScreensNav() {

    const [state, setState] = useContext(AuthContext)

    const authenticated = state && state.token !== "" && state.user !== null;
    console.log("AUTHENTICATED =>", authenticated)

    return (

        // screenOptions={{ headerShown: false }}
        <Stack.Navigator initialRouteName='Home' >
            {authenticated ? (<Stack.Screen name="Home" component={Home} options={{title:"links daily", headerRight: ()=> <HeaderTab/>}}  />) : (<><Stack.Screen name="Sign In" component={Signin} options={{ headerShown: false}} />
            <Stack.Screen name="Sign Up" component={Signup}  options={{ headerShown: false}}  /></>)}
        </Stack.Navigator>




    )
}
