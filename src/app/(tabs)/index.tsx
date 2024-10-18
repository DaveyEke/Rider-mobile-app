import { View, Text, TouchableOpacity, Alert , Image, Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import React from 'react'
import { Redirect, router, Stack } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useState , useEffect } from 'react'
import { AuthError } from '@supabase/supabase-js'
import { useAuth } from '@/src/providers/AuthProvider'
import { Tables } from '@/src/types'
import { FontAwesome } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location'
import { ActivityIndicator } from 'react-native'
import { Router } from 'expo-router'

type Profile = Tables<'profiles'> | null

const index = () => {
 const [location, setLocation] = useState<LocationObject | null>(null);
 const [errorMsg, setErrorMsg] = useState("");
 const [mapLoading , setMapLoading ] = useState(true)
 const { session , profile } = useAuth();
 const colorscheme = useColorScheme();
  


  const defaultLongitude = -122.4324;
  const defaultLatitude = 37.78825
  
 
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
  
    useEffect(() => {
      (async () => {
        let  result  = await Location.requestForegroundPermissionsAsync();
        if (result.status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        
      })();
    }, []);

    useEffect(()=>{
      if (location !== null) {
        setMapLoading(false)
      }
    },[location])
  
    if (!session){
      return <Redirect href={'/(auth)/sign-in'}/>
    }

    const currentLatitude  = location?.coords.latitude  
    const currentLongitude = location?.coords.longitude 
~
    console.log(location)
   
  return (
    <View className='flex-1'>
      <Stack.Screen options={{ headerShown : false }} />
      <Text className={`text-3xl ml-[20px] mt-[70px] font-JakartaExtraBold ${ colorscheme == 'dark' ? 'text-white' : 'text-black'}`}>{` Welcome ${session.user.user_metadata.full_name  || "User"}`}</Text>
      <View className='pl-5 pr-5'>
      {

        mapLoading ? (
          <View className='justify-center mt-[275px] items-center'>
            <ActivityIndicator size={'large'} color={'green'}/>
            <Text className={` mt-[5px] text-2xl ${ colorscheme == 'dark' ? 'text-white' : 'text-black'}`}>Loading map...</Text>
            <Text className={` mt-[5px] font-bold ${ colorscheme == 'dark' ? 'text-white' : 'text-black'}`}>Make sure you have location turned on in settings!</Text>
           </View>
        ) : (
          <MapView
          style={styles.map}
          initialRegion={{
            // Remeber to put the dynamic latituded and Longitudes back
            latitude: currentLatitude || defaultLatitude ,
            longitude: currentLongitude || defaultLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            title="My Location"
            description="This is a marker in San Francisco"
          />
        </MapView>
        )

      }
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '65%',
    borderRadius : 20,
    marginTop : 20,
  },
});