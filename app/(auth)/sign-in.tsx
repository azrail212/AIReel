import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  

  const submit = async () => {
    if(form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill all the fields')
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert('Success', 'You have successfully signed in');
      router.replace('/home');

    } catch (error) {
        throw error;
      } finally {
      setIsSubmitting(false);
    }
  } 

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} className='w-[110px] h-[50px]' resizeMode='contain'/>
          <Text className='text-2xl text-white text-semibold mt-10 font-semibold'>Log in to AIReel</Text>      
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form,
              email: e})}
            otherStyles="mt-7"
            keyboardType='email-address'>
          </FormField>  
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form,
              password: e})}
              otherStyles="mt-7">
          </FormField>  
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}/>

            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
              <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

