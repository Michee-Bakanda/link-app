import React, { useState,useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import SubmitButton from '../components/auth/SubmitButton'
import UserInput from '../components/auth/UserInput'
import axios from 'axios'
import CircleLogo from '../components/auth/CircleLogo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import * as ImagePicker from "expo-image-picker"

const Account = ({navigation}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [image, setImage] = useState({
      url:"",
      public_id:"1"
    })
    const [password, setPassword] = useState("felicite")
    const [loading, setLoading] = useState(false)
    // image preview once we are uploading
    const [uploadImage, setUploadImage] = useState(null)
    // const [image, setImage] = useState({})
    // context
    const [state, setState] = useContext(AuthContext)

    useEffect(()=>{
       if(state){
         const {name, email, image, role} =state.user
         setName(name)
         setEmail(email)
         setRole(role)
        //  setImage(image)
       }
    }, [state])

    const handleSubmit = async () => {
        
    }

    const handleUpload = async () => {
   
    let permissionResult= await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
       alert("access needed")
       console.log(permissionResult)
       return;
    }
    // get image from image
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    })

    console.log("picker =>", pickerResult  )
    
    // if its not  cancelled
    if (pickerResult.cancelled === true) {
      return;
    }

    // save for preview
    let base64Image = `data:image/png;base64,${pickerResult.base64}`
    setUploadImage(base64Image)
    // send to backend for upload to cloudinary
    const {data} = await axios.post('/upload-image', {
      image: base64Image
    })
    console.log("uploading response=>", data)
    // update user info in the context and async storage


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
                          <Image source={{uri: image.url}} style={{ width: 190, height: 190, marginVertical: 20,borderRadius: 100 }} />
                    ) : uploadImage ? 
                         ( <Image source={{uri: uploadImage}} style={{ width: 190, height: 190, marginVertical: 20,borderRadius: 100 }} /> )
                    : (
                      <TouchableOpacity onPress={handleUpload}>
                             <FontAwesome5 name="camera" size={25} color="orange" />
                      </TouchableOpacity>
                    )
                    }
                </CircleLogo>

                {image && image.url ? (
                    <TouchableOpacity onPress={handleUpload }>
                        <FontAwesome5 name="camera" size={25} color="orange" style={{
                          marginTop: -5,
                          marginBottom: 10,
                          alignSelf:"center"
                        }} />
                    </TouchableOpacity>
                ):(
                      <></>
                )
                }


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