import React from 'react'
import {SafeAreaView, Text} from "react-native"
// import {Text, View, } from 'react-native'
import FooterTabs from '../components/nav/FooterTabs'

const Post = () => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: "space-between"}}>
        <Text>Posts</Text>
        <FooterTabs />
    </SafeAreaView>
  )
}

export default Post