import React, { useState,useContext } from 'react'
import { Text, View } from 'react-native'
import SubmitButton from '../components/auth/SubmitButton'
import UserInput from '../components/auth/UserInput'
import axios from 'axios'
import CircleLogo from '../components/auth/CircleLogo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth'

const Signin = ({navigation}) => {

    const [email, setEmail] = useState("micbakanda@gmail.com")
    const [password, setPassword] = useState("felicite")
    const [loading, setLoading] = useState(false)
    const [state, setState] = useContext(AuthContext)

    const handleSubmit = async () => {
        setLoading(true)
        if ( !email || !password) {
            alert("all fields are required")
            setLoading(false)
            return;
        }
        console.log("SIGN UP REQUEST =>",  email, password)
        try {
            const { data } = await axios.post('http://localhost:8000/api/signin', {
            
                email,
                password
            });
            if (data.error) {
                alert(data.error)
                setLoading(false)
            }else{
                // save in context
                setState(data)
                // save response in async storage
                await AsyncStorage.setItem('@auth', JSON.stringify(data))
                setLoading(false);
                console.log("SIGN IN SUCCESS =>", data)
                alert("Sign in successful")
                // redirect to Home
                navigation.navigate("Home")
            }
        } catch (error) {
            alert("sign in failed")
            console.log(error)
            setLoading(false);
        }
    }

    const loadFromAsync = async()=>{
        let data = await AsyncStorage.getItem("@auth")
        console.log("from storage =>",data)
    }

    loadFromAsync()

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
                    Sign In
                </Text>
                {/* title */}

                {/* user input */}
                <UserInput name="EMAIL" value={email} setValue={setEmail} autoCompleteType="email" keyboardType="email-address" />
                <UserInput name="PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" />

                <SubmitButton title="sign In" handleSubmit={handleSubmit} loading={loading} />
                {/* <Text>{JSON.stringify({name,email,password},null, 4)}</Text> */}
                {/* user input */}

                {/* navigate to another screen */}
                   <Text style={{textAlign:"center"}}>
                       Not yet registered ? <Text onPress={()=> navigation.navigate("Sign Up")} style={{color:"#ff2222"}}>Sign Up</Text>
                   </Text>

                   <Text style={{color:"orange",textAlign:"center",marginTop:10}}>Forgot Password ?</Text>
                {/* navigate to another screen */}

            </View>
        </KeyboardAwareScrollView>

    )
}

export default Signin