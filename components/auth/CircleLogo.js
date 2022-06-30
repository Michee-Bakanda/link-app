import React from 'react'
import { View, Image, Text } from 'react-native'

const CircleLogo = ({ children }) => {
  return (
    <View style={{
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 20,
    }}>
      <View style={{
        backgroundColor: "white",
        height: 190,
        width: 190,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
      }}>
        {children ? (
          children
        ) : (
          <Image source={require("../../assets/logo.png")} style={{ width: 190, height: 190, marginVertical: 20 }} />

        )
        }
      </View>
    </View>
  )
}

export default CircleLogo