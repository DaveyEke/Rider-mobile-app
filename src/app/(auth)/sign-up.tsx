import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { ColorSchemeName } from 'react-native'

const SignUp = () => {
  <Stack.Screen name='Sign In' />
  const colorScheme = useColorScheme();
  const textColor = ( current : ColorSchemeName) => {
    if ( current === 'dark' ) {
      return 'text-white'
    } else {
      return 'text-black'
    }
  } 
  return (
    <View>
      <Text className={`${textColor(colorScheme)}`}>SignUp</Text>
    </View>
  )
}

export default SignUp