import React, {useState} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export const Tab =({name, text})=>(
    <TouchableOpacity>
           <>
              <FontAwesome5 name={name} size={24} style={{
                  marginBottom: 3,
                  alignSelf:"center"
              }} />
              <Text>{text}</Text>
           </>
       </TouchableOpacity>
)

const FooterTabs = () => {
  return (
    <View style={{flexDirection: "row", margin: 10, marginHorizontal: 30, justifyContent:"space-between"}}>
        <Tab name="home" text="Home" />
        <Tab name="plus-square" text="Post" />
        <Tab name="list-ol" text="Links" />
        <Tab name="user" text="Account" />
    </View>
  )
}

export default FooterTabs