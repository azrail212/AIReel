import { View, Text, FlatList, Image, RefreshControl, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { getUserPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts} = useAppwrite(
    () => getUserPosts(user.$id)
  );


  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
      data={posts}
      keyExtractor = {(item) => item.$id}
      renderItem = {({ item }) => (
        <VideoCard 
          video = {item}
        />
      )}
      ListHeaderComponent={() => (
        <View className='w-full justify-center items-center mt-6 mb-12 px-4'></View>
      )}
     
      />
      
    </SafeAreaView>
  )
}

export default Profile