import { View, Text , Image, Pressable , TouchableOpacity , StyleSheet} from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { Link } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { Alert } from 'react-native'
import { Modal } from 'react-native'
import Colors from '@/src/constants/Colors'

const signIn = () => {
  const [email , setEmail ] = useState("");
  const [password , setPassword ] = useState("")
  const [showModal , setShowModal ] =  useState(false)

const [loading, setLoading] = useState(false);

async function signInWithEmail() {
  setLoading(true);
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    Alert.alert(error.message);
    setLoading(false);
    return;
  } else {
    setShowModal(true)
    setLoading(false);
  }
  
}
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
  const handleContinue = () => {
    setShowModal(false)
    router.push('/(tabs)/')
  }
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

      <Text className='left-5 text-bold text-1xl absolute mt-[365px]'>Password:</Text>
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
      <Modal
        visible={showModal}
        animationType='slide'
        transparent={true}
      > 
        <View className='items-center flex-1 pl-4 pr-4 ' style={styles.modalViewBg}   >
        <View className='w-full h-[450px]  mt-[225px] rounded-2xl absoluteitems-center bg-white'>
        <Image 
          source={require('@/assets/images/check.png')}
          className='self-center w-40 h-40 mt-[50px]'
          resizeMode='contain'
        />
        <Text className='text-bold  text-3xl self-center mt-[20px]'>Success!</Text>
        <Text className='font-bold text-neutral-500 self-center mt-[20px]'>Your have been signed in successfully!</Text>
        <TouchableOpacity  className='self-center w-[321px]  mt-[39px] bg-blue-500 p-5  rounded-full' onPress={handleContinue}>
          <Text className='text-white text-xl self-center font-bold'>Continue</Text>
        </TouchableOpacity>
        </View>
        </View>
      </Modal>
      <TouchableOpacity  className='self-center w-[321px]  mt-[50px] bg-blue-500 p-5  rounded-full' onPress={signInWithEmail}>
        <Text className='self-center text-white font-bold'>{ loading ? 'Signing In...' : 'Sign In'}</Text>
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

const styles = StyleSheet.create({
  modalViewBg : {
     backgroundColor : '#rgba(0,0,0,0.5)'
  }
})

