import React from 'react'
import { View, Image, Text } from 'react-native'

const CircleLogo = ({ children }) => {
  return (
    <View style={{
      justifyContent: "center",
      alignItems: "center"
    }}>
      {children ? (
        children
      ) : (
        <Image source={require("../../assets/logo.png")} style={{ width: 300, height: 300, marginVertical: 20 }} />

      )
      }
    </View>
  )
}

export default CircleLogo