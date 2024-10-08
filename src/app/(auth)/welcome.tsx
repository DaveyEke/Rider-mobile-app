import { onboarding } from "@/src/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import Swiper from "react-native-swiper";
import CustomButton from "@/src/components/CustomButton";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
   return (
  <SafeAreaView className="flex h-full items-center justify-between bg-white">
     <StatusBar  style='dark'/>
  <TouchableOpacity className="w-full justify-end flex items-end p-6">
    <Text onPress={()=>router.push('../(auth)/sign-in')} className="text-black text-lg font-JakartaSemiBold">Skip</Text>
  </TouchableOpacity>
  <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
  <CustomButton
    text={isLastSlide ? "Get Started" : "Next"}
    onPress={() =>
      isLastSlide
        ? router.replace("../(auth)/sign-in")
        : swiperRef.current?.scrollBy(1)
    }
    className="w-11/12 mt-10 mb-5"
  />
    </SafeAreaView>
   )
}

export default Home;