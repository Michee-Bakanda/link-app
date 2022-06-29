import React, {useState} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useNavigation, useRoute } from '@react-navigation/native'

export const Tab =({name, text, handlePress,screenName, routeName})=>{
  const activeScreenColor = screenName === routeName && "orange";

return(
  <TouchableOpacity>
  <>
     <FontAwesome5 color={activeScreenColor} name={name} size={24} style={{
         marginBottom: 3,
         alignSelf:"center"
     }}
     onPress={handlePress}
      />
     <Text>{text}</Text>
  </>
</TouchableOpacity>
)
    
    }

const FooterTabs = () => {
  const navigation = useNavigation()
  const route = useRoute()
  console.log(route)

  

  return (
    <View style={{flexDirection: "row", margin: 10, marginHorizontal: 30, justifyContent:"space-between"}}>
        <Tab handlePress={()=>navigation.navigate("Home")} name="home" text="Home" screenName="Home"  routeName={route.name} />
        <Tab handlePress={()=>navigation.navigate("Post")} name="plus-square" text="Post" screenName="Post" routeName={route.name} />
        <Tab handlePress={()=>navigation.navigate("Links")} name="list-ol" text="Links" screenName="Links" routeName={route.name} />
        <Tab handlePress={()=>navigation.navigate("Account")} name="user" text="Account" screenName="Account" routeName={route.name} />
    </View>
  )
}

export default FooterTabs