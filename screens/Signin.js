import React, { useState } from 'react'
import { Text, View } from 'react-native'
import SubmitButton from '../components/auth/SubmitButton'
import UserInput from '../components/auth/UserInput'
import axios from 'axios'
import CircleLogo from '../components/auth/CircleLogo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Signin = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

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
            setLoading(false);
            console.log("SIGN IN SUCCESS =>", data)
            alert("Sign in successful")
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