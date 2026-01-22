import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '@/constants'
import * as DocumentPicker from 'expo-document-picker'
import { RefreshControl } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as VideoThumbnails from 'expo-video-thumbnails';

import CustomButton from '@/components/CustomButton'

type PickerType = 'image' | 'video';

type FormState = {
  title: string;
  video: DocumentPicker.DocumentPickerAsset | null;
  thumbnail: DocumentPicker.DocumentPickerAsset | null;
  prompt: string;
  videoPosterUri: string | null;
};

const Create = () => {

  const defaultForm = useMemo<FormState>(
    () => ({
      title: '',
      video: null,
      thumbnail: null,
      prompt: '',
      videoPosterUri: null,
    }),
    []
  );

  const [form, setForm] = useState<FormState>(defaultForm);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const resetForm = useCallback(() => {
    setForm({ ...defaultForm });
  }, [defaultForm]);
    
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    resetForm();
    setRefreshing(false);
  }, [resetForm]);

   // Helper: ensure video URI becomes file:// (expo-av friendly on Android)
  const ensureFileUri = useCallback(async (uri: string, fallbackName: string) => {
    if (!uri.startsWith('content://')) return uri;

    const dest = FileSystem.cacheDirectory + fallbackName;
    await FileSystem.copyAsync({ from: uri, to: dest });
    return dest;
  }, []);


  const openPicker = useCallback(
    async (selectType: PickerType) => {
      const result = await DocumentPicker.getDocumentAsync({
        type: selectType === 'image' ? ['image/*'] : ['video/*'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const asset = result.assets[0];

      const finalUri = await ensureFileUri(
        asset.uri,
        asset.name ?? `${selectType}-${Date.now()}`
      );

      if (selectType === 'video') {
        const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(finalUri, {
          time: 1000, // avoids black first frame in many videos
        });

        setForm((prev) => ({
          ...prev,
          video: { ...asset, uri: finalUri },
          videoPosterUri: thumbUri,
        }));

        return;
      }

      // image
      setForm((prev) => ({
        ...prev,
        thumbnail: { ...asset, uri: finalUri },
      }));
    },
    [ensureFileUri]
  );

  // 7) These handlers are stable and avoid spreading stale state
  const onChangeTitle = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, title: value }));
  }, []);

  const onChangePrompt = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, prompt: value }));
  }, []);

  const submit = useCallback(async () => {
    // handle submit logic
    // setUploading(true) ...
    // setUploading(false) ...
  }, []);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'   
                  refreshControl={
                  <RefreshControl 
                    refreshing={refreshing} 
                    onRefresh={onRefresh} 
                  />
          }>
        <Text className='text-white text-2xl font-psemibold'>
          Upload Video
        </Text>

        <FormField 
          title="Video Title"
          value={form.title}
          placeholder='Give your video a catchy title...'
          handleChangeText={(e) => setForm({ ...form, 
            title:e })}
          otherStyles="mt-10"
        />
        
       <View className="mt-7 space-y-2">
  <Text className="text-base text-gray-100 font-pmedium mb-2">
    Upload Video
  </Text>

  {!form.video ? (
    <TouchableOpacity onPress={() => openPicker('video')}>
      <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
        <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
          <Image
            source={icons.upload}
            className="w-1/2 h-1/2"
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View>
      <Video
        source={{ uri: form.video.uri }}
        style={{ width: '100%', height: 256, borderRadius: 16 }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        usePoster
        posterSource={form.videoPosterUri ? { uri: form.videoPosterUri } : undefined}
      />

      <TouchableOpacity
  onPress={() => openPicker('video')}
  className="mt-3 flex-row items-center bg-black-200 px-4 py-2 rounded-xl self-start"
  activeOpacity={0.8}
>
  <Image
    source={icons.upload}
    className="w-4 h-4 mr-2"
    resizeMode="contain"
  />
  <Text className="text-sm text-gray-100 font-pmedium">
    Change video
  </Text>
</TouchableOpacity>
    </View>
  )}
</View>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium mb-2'>
            Thumbnail Image
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image 
                source={{ uri: form.thumbnail.uri}}
                className='w-full h-64 rounded-2xl'
                resizeMode='cover'
              />
          ) : (
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
              <Image
                source={icons.upload}
                className="w-5 h-5 mr-2"
                resizeMode='contain'
              />
              <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>
            </View>
          )}
          </TouchableOpacity>
        </View>

        <FormField 
          title="AI Prompt"
          value={form.prompt}
          placeholder='The prompt you used to create this video...'
          handleChangeText={(e) => setForm({ ...form, 
            prompt:e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles='mt-7 mb-20'
          isLoading={uploading}/>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Create