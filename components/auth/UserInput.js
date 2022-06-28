import React from 'react'
import { Text, View, TextInput } from 'react-native'

const UserInput = ({name,setValue, value,autoCapitalize="none",keyboardType="default",secureTextEntry=false}) => {
  return (
    
            <View style={{ marginHorizontal: 24 }}>
                <Text>{name}</Text>
                <TextInput 
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                style={{
                    borderBottomWidth: 0.5,
                    height: 48,
                    borderBottomColor: '#8e93a1',
                    marginBottom: 30 
                }}
                value={value}
                onChangeText={(text)=> setValue(text)}
                 />
            </View>
           
  )
}

export default UserInput