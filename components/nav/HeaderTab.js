import React, {useContext} from 'react'
import { AuthContext } from '../../context/auth'
import {View, TouchableOpacity, SafeAreaView} from "react-native"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderTab = () => {

   const [state, setState] = useContext(AuthContext)

   const signOut = async()=>{
       setState({token: '', user: null})
       await AsyncStorage.removeItem("@auth")
   }

  return (
    <SafeAreaView>
        <TouchableOpacity onPress={signOut}>
            <FontAwesome5 name="sign-out-alt" size={25} color="#ff9900" />
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HeaderTab