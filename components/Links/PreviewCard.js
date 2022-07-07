import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { LinkContext } from '../../context/link'
import { AuthContext } from '../../context/auth'
import IconSet from './IconSet'

const PreviewCard = ({ ogTitle = 'untitled', ogDescription = 'No description found', ogImage = 'https://via.placeholder.com/500x500.png?text=Image', handlePress = (f) => f, link = {}, showIcons = false }) => {

  const [links, setLinks] = useContext(LinkContext)
  const [auth, setAuth] = useContext(AuthContext)

  const handleLikePress = async (link) => {
    const { data } = await axios.put('http://localhost:8000/api/like', { linkId: link._id })
    setLinks((links) => {
      const index = links.findIndex((l) => l._id == link._id)
      links[index] = data
      return [...links]
    })
    //  console.log("link clicked", link._id);
  }

  const handleUnLikePress = async (link) => {
    const { data } = await axios.put('http://localhost:8000/api/unlike', { linkId: link._id })
    setLinks((links) => {
      const index = links.findIndex((l) => l._id == link._id)
      links[index] = data
      return [...links]
    })
    //  console.log("link clicked", link._id);
  }


  return (
    <View style={{ height: 280, backgroundColor: 'white', width: '100%', borderRadius: "14%", shadowColor: "#171717", shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.2, shadowRadius: 3, marginBottom: 20 }}>
      <Image style={{ height: "70%", width: "100%", borderTopRightRadius: "14%", borderTopLeftRadius: "14%" }} source={{ uri: ogImage.url }} />




      <IconSet handleLikePress={handleLikePress} handleUnLikePress={handleUnLikePress} link={link} showIcons={showIcons} auth={auth} />


      <TouchableOpacity onPress={() => handlePress(link)}>

        <View style={{ padding: 5, height: 50 }}>
          <Text style={{ paddingTop: 5, paddingBottom: 5, fontWeight: 'bold' }}>{ogTitle}</Text>
          <Text>{ogDescription}</Text>
        </View>

      </TouchableOpacity>

    </View>
  )
}

export default PreviewCard