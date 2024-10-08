import { View, Text , Image, Pressable , TouchableOpacity} from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { Link } from 'expo-router'

const signIn = () => {
  const [email , setEmail ] = useState("");
  const [password , setPassword ] = useState("")
 
  const changePasswordBorderColor = (input : string) => {
      if (input.length > 0) {
        return'border-blue-500';
      } else {
        return 'border-white';
      }
  }

  const changeEmailBorderColor = (input : string) => {
    if (input.length > 0) {
      return 'border-blue-500';
    } else {
      return 'border-white';
    }
}
    const signInUser = () => {}
  return (
    
    <View className='bg-white flex-1'>
      <StatusBar  style='light'/>
      <Image 
       source={require('@/assets/images/signup-car.png')}
       className="z-0 w-full h-[260px]"
      />
      <Text className='absolute bottom-25 pt-[195px] left-5 text-2xl text-bold text-black'> Welcome!👋 </Text>
      <Text className='left-5 text-bold text-1xl'>Email:</Text>
      <View className={`bg-neutral-300 p-8 mr-4 ml-4 mt-[8] rounded-full jusitfy-center border-2 ${changeEmailBorderColor(email)}`}>
      <Image 
        source={require('@/assets/icons/email.png')}
        resizeMode='contain'
        className = "absolute left-5 top-5 w-6 h-6  self-start"
      />
      <TextInput className='bg-neutral-300 top-5 left-5 ml-[50px] mt-[5px] absolute rounded-full' placeholder='Enter your email' 
        onChangeText={setEmail}
        value={email}
        placeholderTextColor={"black"}
      /> 
      </View>

      <Text className='left-5 text-bold text-1xl absolute mt-[360px]'>Password:</Text>
      <View className={`bg-neutral-300 p-8 mr-4 ml-4 mt-[40px] rounded-full jusitfy-center border-2 ${changePasswordBorderColor(password)}`}>
      <Image 
        source={require('@/assets/icons/lock.png')}
        resizeMode='contain'
        className = "absolute left-5 top-5 w-6 h-6  self-start"
      />
      <TextInput 
      className='bg-neutral-300 top-5 left-5 ml-[50px] mt-[5px] absolute rounded-full' 
      placeholder='Enter your Password' 
      placeholderTextColor={"black"}
      secureTextEntry
      onChangeText={setPassword}
      value={password}
      /> 
      </View>
      <TouchableOpacity  className='self-center w-[321px]  mt-[50px] bg-blue-500 p-5  rounded-full'>
        <Text className='self-center text-white font-bold'>Sign In</Text>
      </TouchableOpacity>
      <View className='flex-row items-center p-3 mt-[15px]'>
      <Text className=' ml-[60px] text-neutral-500 '>Don't have an account? </Text>
      <Link href={'/(auth)/sign-up'}>
      <Text className=' text-blue-500 font-bold '>Create One!</Text>
      </Link>
      </View>
    </View>
  
  )
}

export default signIn

