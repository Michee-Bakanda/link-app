import React, { useState, useContext } from 'react'
import { Text, View } from 'react-native'
import SubmitButton from '../components/auth/SubmitButton'
import UserInput from '../components/auth/UserInput'
import axios from 'axios'
import CircleLogo from '../components/auth/CircleLogo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth'

const Signup = ({navigation}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [state, setState] = useContext(AuthContext)

    const handleSubmit = async () => {
        setLoading(true)
        if (!name || !email || !password) {
            alert("all fields are required")
            setLoading(false)
            return;
        }
        console.log("SIGN UP REQUEST =>", name, email, password)
        try {
            const { data } = await axios.post('http://localhost:8000/api/signup', {
                name,
                email,
                password
            });
           if (data.error) {
               alert(data.error)
               setLoading(false)
           }else{
            //    save to context
            setState(data)
             // save response in async storage
             await AsyncStorage.setItem('@auth', JSON.stringify(data))
            setLoading(false);
            console.log("SIGN UP SUCCESS =>", data)
            alert("Sign up successful")
            navigation.navigate("Home")
           }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    return (
        <KeyboardAwareScrollView>
            <View style={{ flex: 1, justifyContent: "center",marginVertical: 100 }}>

                <CircleLogo />


                {/* title */}
                <Text style={{
                    fontSize: 24,
                    color: "#333",
                    textAlign: "center"
                }}>
                    Sign Up
                </Text>
                {/* title */}

                {/* user input */}
                <UserInput name="NAME" value={name} setValue={setName} autoCapitalize="words" autoCorrect={false} />
                <UserInput name="EMAIL" value={email} setValue={setEmail} autoCompleteType="email" keyboardType="email-address" />
                <UserInput name="PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" />

                <SubmitButton title="sign up" handleSubmit={handleSubmit} loading={loading} />
                {/* <Text>{JSON.stringify({name,email,password},null, 4)}</Text> */}
                {/* user input */}

                {/* navigate to another screen */}
                   <Text style={{textAlign:"center"}}>
                       Already Joined <Text onPress={()=> navigation.navigate("Sign In")} style={{color:"#ff2222"}}>Sign In</Text>
                   </Text>
                {/* navigate to another screen */}

            </View>
        </KeyboardAwareScrollView>

    )
}

export default Signup