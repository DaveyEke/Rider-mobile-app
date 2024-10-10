import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useState } from 'react'
import { AuthError } from '@supabase/supabase-js'
import { useAuth } from '@/src/providers/AuthProvider'

const index = () => {
 const [ profile , setProfile] = useState(null)
 
  const { session } = useAuth();
  
  const userId = session?.user.id;

  if (!session){
    return <Redirect href={'/(auth)/sign-in'}/>
  }
 

  async function getProfile (user_id : string ) {

    const { data , error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user_id)
    .single()
    setProfile(profile)  
  }

console.log(session?.user.email)

  return (
    <View>
      <Stack.Screen options={{ headerShown : false }} />
      <Text className='text-3xl mt-[80px] font-bold text-black'>Welcome John</Text>
      <Text className='mt-[80px] text-5xl' onPress={()=>supabase.auth.signOut()}> Sign Out</Text>
    </View>
  )
}

export default index