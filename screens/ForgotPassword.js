import React, { useState,useContext } from 'react'
import { Text, View } from 'react-native'
import SubmitButton from '../components/auth/SubmitButton'
import UserInput from '../components/auth/UserInput'
import axios from 'axios'
import CircleLogo from '../components/auth/CircleLogo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth'

const ForgotPassword= ({navigation}) => {

    const [email, setEmail] = useState("micbakanda@gmail.com")
    const [password, setPassword] = useState("felicite")
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [state, setState] = useContext(AuthContext)
    const [resetCode, setRestCode] = useState("")

    const handleSubmit = async () => {
        setLoading(true)
        if ( !email) {
            alert("email required")
            setLoading(false)
            return;
        }
        console.log("Reset REQUEST =>",  email)
        try {
            const { data } = await axios.post('http://localhost:8000/api/forgot-password', {
            
                email
               
            });
            if (data.error) {
                alert(data.error)
                setLoading(false)
            } else {
                setLoading(false)
                setVisible(true)
                console.log("reset password res=>", data)
                alert("Enter the password reset code we sent in your email")
            }
           
        } catch (error) {
            alert("error sending email")
            console.log(error)
            setLoading(false);
        }
    }

    const handlePasswordReset = async()=>{
        console.log("handle Pssword reset=>", email, password, resetCode)
        try {
            const { data } = await axios.post('http://localhost:8000/api/reset-password', {
            
                email,
                password,
                resetCode
            });
            console.log("reset password =>", data)
            if (data.error) {
                alert(data.error)
                setLoading(false)
            }else{
                alert("now you can login in with your new password")
                navigation.navigate("Signin")
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            alert("Password reset failed")
        }
    }

    // const loadFromAsync = async()=>{
    //     let data = await AsyncStorage.getItem("@auth")
    //     console.log("from storage =>",data)
    // }

    // loadFromAsync()

    return (
        <KeyboardAwareScrollView>
            <View style={{ flex: 1, justifyContent: "center",marginVertical: 100 }}>

                <CircleLogo />


                {/* title */}
                <Text style={{
                    fontSize: 24,
                    color: "#333",
                    textAlign: "center",
                    marginTop: 15,
                    marginBottom: 50
                }}>
                   ForgotPassword
                </Text>
                {/* title */}

                {/* user input */}
                <UserInput name="EMAIL" value={email} setValue={setEmail} autoCompleteType="email" keyboardType="email-address" />
                {/* <UserInput name="PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" /> */}

                {visible &&(
                    <>
                      <UserInput name="PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" />
                      <UserInput name="PASSWORD RESET CODE" value={resetCode} setValue={setRestCode} secureTextEntry={true} autoCompleteType="password" />
                    </>
                )}

                <SubmitButton title={visible ? "Reset Password" : "Request Reset Code"} handleSubmit={visible ? handlePasswordReset : handleSubmit} loading={loading} />
                {/* <Text>{JSON.stringify({name,email,password},null, 4)}</Text> */}
                {/* user input */}

                {/* navigate to another screen res*/}
                  

                   <Text onPress={()=>navigation.navigate("Sign In")} style={{color:"orange",textAlign:"center",marginTop:10}}>Sign in</Text>
                {/* navigate to another screen */}

            </View>
        </KeyboardAwareScrollView>

    )
}

export default ForgotPassword