import { Stack, Link, router, Redirect } from 'expo-router';

import 'react-native-url-polyfill/auto'
import { View,Text, ScrollView, Image} from 'react-native';

import {StatusBar} from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants'
import CustomButton from '@/components/CustomButton';

export default function Home() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className='w-full justify-center items-center min-h-[85vh] px-3'>
          <Image
            source={images.logo}
            className='w-[300px] h-[150px]'
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[298px]'
            resizeMode='contain'
          />

        <View className='relative mt-5'>
          <Text className='text-3xl text-white font-bold text-center'>
            Discover Endless {"\n"}
            Posibilities with{' '}
            <Text className='text-secondary-200'>AIReel</Text>
          </Text>
          
        <Image 
        source={images.path} 
        className="w-[136px] h-[15px] absolute -bottom-3 -right-10"
        resizeMode='contain'
        />
        </View>

        <Text className='text-sm mt-7 text-center text-gray-100 font-pregular'>
          Where creativity meets innovation: embark on a journey of limitless exploration with AIReel
        </Text>

        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push('/sign-in')}
          containerStyles="w-full mt-7"></CustomButton>
        </View>
      </ScrollView>

      <StatusBar 
        backgroundColor='#161622' 
        style='light'/>
          
    </SafeAreaView>
  );
}

