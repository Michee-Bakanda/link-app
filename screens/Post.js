import React from 'react'
import { useState } from 'react'
import {SafeAreaView, ScrollView, Text, TextInput,View} from "react-native"
// import {Text, View, } from 'react-native'
import FooterTabs from '../components/nav/FooterTabs'
import SubmitButton from '../components/auth/SubmitButton'
// import { LinkContext } from "../context/link";
// import ogs from "@uehreka/open-graph-scraper-react-native";
// import urlRegex from "url-regex";
// import PreviewCard from "../components/links/PreviewCard";
import axios from "axios";
// import urlRegex from "url-regex";
// import ogs from "@uehreka/open-graph-scraper-react-native";



const Post = () => {

   // context
  //  const [links, setLinks] = useContext(LinkContext);
  // state
   const [link, setLink]= useState('')
   const [title, setTitle] = useState('')
   const [loading, setLoading] = useState('')
   const [urlPreview, setUrlPreview] = useState({});

   const handleChange=(text)=>{
    //  
    try {
      setLoading(true);
      setLink(text);

      if (urlRegex({ strict: false }).test(text)) {
        ogs({ url: text }, (error, results, response) => {
          // console.log(results);
          if (results.success) {
            setUrlPreview(results);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
   }

   const handleSubmit = async () => {
    // console.log("title and link => ", title, link, urlPreview);
    if (!link || !title) {
      alert("Paste url and give it a nice title 😎");
      return;
    }
    try {
      const { data } = await axios.post("/post-link", {
        link,
        title,
        urlPreview,
      });
      // console.log("data => ", data);
      // update link context
      setLinks([data, ...links]);
      setTimeout(() => {
        alert("🎊 Link posted");
        navigation.navigate("Home");
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <SafeAreaView style={{flex: 1, justifyContent: "space-between"}}>
    //     <Text>Posts</Text>
    //     <FooterTabs />
    // </SafeAreaView>
    <SafeAreaView style={{flex: 1}}>
         <ScrollView>
               <Text style={{textAlign:"center"}}>Paste website url</Text>
               <TextInput placeholder='Paste the url' style={{borderWidth: 1,borderColor: "gray",height: 50, marginVertical:30,marginHorizontal:10,borderRadius: 30, padding: 15}} value={link} onChangeText={text => setLink(text)} />
               <TextInput placeholder='Give it a title' style={{borderWidth: 1,borderColor: "gray",height: 50, marginVertical:30,marginHorizontal:10,borderRadius: 30, padding: 15}} value={title} onChangeText={text => setTitle(text)} />

               <View style={{paddingTop:25}}>
                   <SubmitButton title="Submit" handleSubmit={handleSubmit} loading={loading} />
               </View>
               <Text>{JSON.stringify(urlPreview, null, 4)}</Text>
         </ScrollView>
         <FooterTabs />
    </SafeAreaView>
  )
}

export default Post