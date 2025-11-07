import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '../../lib/appwrite'


const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    createUser();
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} className='w-[110px] h-[50px]' resizeMode='contain'/>
          <Text className='text-2xl text-white text-semibold mt-10 font-semibold'>Sign Up to AIReel</Text> 

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(newValue) => setForm({ ...form,
              username: newValue})}
            otherStyles="mt-10">
          </FormField>  

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(newValue) => setForm({ ...form,
              email: newValue})}
            otherStyles="mt-10"
            keyboardType='email-address'>
          </FormField>  

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(newValue) => setForm({ ...form,
              password: newValue})}
              otherStyles="mt-10">
          </FormField>  

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles='mt-10'
            isLoading={isSubmitting}/>

            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
              <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp