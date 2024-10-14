import { View, Text, TouchableOpacity, Alert , Image, Pressable } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useState } from 'react'
import { AuthError } from '@supabase/supabase-js'
import { useAuth } from '@/src/providers/AuthProvider'
import { Tables } from '@/src/types'
import { FontAwesome } from '@expo/vector-icons'

type Profile = Tables<'profiles'> | null

const index = () => {
 
 const { session , profile } = useAuth();

      
  
  if (!session){
    return <Redirect href={'/(auth)/sign-in'}/>
  }
 
  const onSignOut = () => {
    supabase.auth.signOut();
  }

  const confirmSignOut = () => {
    Alert.alert("Confirm","Are you sure you want to sign out?", [
      {
        text: 'Cancel'
      }, 
      {
        text: 'Sign Out',
        style:'destructive',
        onPress:onSignOut,
      }
    ]);
  }
  

  return (
    <View>
      <Stack.Screen options={{ headerShown : false }} />
      <Text className='text-3xl ml-[20px] mt-[70px] font-JakartaExtraBold text-black'>{`Welcome ${session.user.user_metadata.full_name || "User"}`}</Text>
      <Pressable className='absolute mt-[74px] ml-[350px]' onPress={confirmSignOut}>
      {
        ({ pressed }) => (
          <FontAwesome
            name='sign-out'
            color={'red'}
            size={30}
            style={{ alignSelf : 'flex-end' , paddingRight : 20 , opacity : pressed ? 0.5 : 1}}
          />
        )
      }
      </Pressable>
      
    
    </View>
  )
}

export default index