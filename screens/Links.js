import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import FooterTabs from '../components/nav/FooterTabs'

const Links = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <Text>Links</Text>
      <FooterTabs />
    </SafeAreaView>
  )
}

export default Links