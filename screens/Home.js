import React, { useContext, useEffect } from 'react'
import { SafeAreaView, Text, ScrollView, View, TouchableOpacity } from "react-native"
import PreviewCard from '../components/Links/PreviewCard'
import FooterTabs from '../components/nav/FooterTabs'
import { AuthContext } from '../context/auth'
import { LinkContext } from '../context/link'
import axios from 'axios'



const Home = ({navigation}) => {

  const [state, setstate] = useContext(AuthContext)
  const [links, setLinks] = useContext(LinkContext)

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    const { data } = await axios.get("http://localhost:8000/api/links/:page")
    setLinks(data)
  }

  const handlePress = async (link)=>{
    await axios.put(`http://localhost:8000/api/view-count/${link._id}`)
     navigation.navigate('LinkView', {link})
    //  update link in context
    setLinks(()=>{
      const index = links.findIndex((l)=> l.id === link._id);
      links[index]= {...link, views: link.views + 1};
      return [...links];
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: "21px", marginTop: 10, marginBottom: 10 }}>Recent Links</Text>
      <ScrollView>
        {links && links.map((link) =>
          <TouchableOpacity>
            <View style={{ alignItems: 'center', padding: 23 }} key={link._id}>
              <PreviewCard {...link.urlPreview} handlePress={handlePress} link={link} showIcons={true} />
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
      {/* <Text>{JSON.stringify(links,null,4)}</Text> */}
    
      <FooterTabs />
    </SafeAreaView>
  )
}

export default Home