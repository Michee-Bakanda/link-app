import React, {useContext} from 'react'
import {SafeAreaView, Text} from "react-native"
import FooterTabs from '../components/nav/FooterTabs'
import { AuthContext } from '../context/auth'


const Home = () => {

   const [state, setstate] = useContext(AuthContext)

  return (
    <SafeAreaView style={{flex: 1, justifyContent: "space-between"}}>
      <Text>Home</Text>
        {/* <Text>{JSON.stringify(state,null,4)}</Text> */}
        
        <FooterTabs />
    </SafeAreaView>
  )
}

export default Home