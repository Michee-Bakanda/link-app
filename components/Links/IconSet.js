import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const IconSet = ({
    handleLikePress,
    handleUnLikePress,
    showIcons,
    link,
    auth
}) => {

  

  return (
      <>
      {showIcons && (
        <>
          <View style={{ position: 'absolute', right: 20, top: 20 }}>
            <FontAwesome5 name='eye' size={25} color='#ff9900' />
            <Text style={{ textAlign: 'center', color: '#ff9900' }}>
              {link.views}
            </Text>
          </View>

          {link?.likes?.includes(auth?.user?._id)? (
                    <TouchableOpacity style={{ position: 'absolute', right: 80, top: 20 }} onPress={()=> handleUnLikePress(link)}>
                    <FontAwesome5 name='heartbeat' size={25} color='#ff9900' />
                    <Text style={{ textAlign: 'center', color: '#ff9900' }}>
                      {link.likes.length}
                    </Text>
                  </TouchableOpacity>
          ):(
            <TouchableOpacity style={{ position: 'absolute', right: 80, top: 20 }} onPress={()=> handleLikePress(link)}>
            <FontAwesome5 name='heart' size={25} color='#ff9900' />
            <Text style={{ textAlign: 'center', color: '#ff9900' }}>
              {link.likes.length}
            </Text>
          </TouchableOpacity>
          )}

          

         
        </>
      )}


      

    </>
  )
}

export default IconSet