import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

const AuthLayout = () => {

  const { session }  = useAuth();

  if (session){
    return <Redirect href={'/(tabs)/'}/>
  }

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown : false }} />
    <Stack.Screen name="sign-up" options={{ headerShown : false }} />
      {/* <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default AuthLayout;