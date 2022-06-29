import React, { useState,useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import SubmitButton from '../components/auth/SubmitButton'
import UserInput from '../components/auth/UserInput'
import axios from 'axios'
import CircleLogo from '../components/auth/CircleLogo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

const Account = ({navigation}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [image, setImage] = useState({})
    const [password, setPassword] = useState("felicite")
    const [loading, setLoading] = useState(false)
    // context
    const [state, setState] = useContext(AuthContext)

    useEffect(()=>{
       if(state){
         const {name, email, image, role} =state.user
         setName(name)
         setEmail(email)
         setRole(role)
       }
    }, [state])

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

                <CircleLogo>
                    {image && image.url ? (
                          <Image source={{uri: image.url}} style={{ width: 300, height: 300, marginVertical: 20 }} />
                    ) : (
                      <FontAwesome5 name="camera" size={25} />
                    )
                    }
                </CircleLogo>


                {/* title */}
                <Text style={{
                    fontSize: 24,
                    color: "#333",
                    textAlign: "center",
                    paddingBottom: 10
                }}>
                    {name}
                </Text>

                <Text style={{
                    fontSize: 24,
                    color: "#333",
                    textAlign: "center",
                    paddingBottom: 10
                }}>
                    {email}
                </Text>

                <Text style={{
                    fontSize: 24,
                    color: "#333",
                    textAlign: "center",
                    paddingBottom: 50
                }}>
                    {role}
                </Text>
                {/* title */}

                {/* user input */}
                <UserInput name="PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" />

                <SubmitButton title="Update Password" handleSubmit={handleSubmit} loading={loading} />
                {/* <Text>{JSON.stringify({name,email,password},null, 4)}</Text> */}
                {/* user input */}

                

            </View>
        </KeyboardAwareScrollView>

    )
}

export default Account