import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constants';
import { useState } from 'react';
import WebView from 'react-native-webview';

interface Creator {
  username: string;
  avatar: string;
}

interface Video {
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator;
}

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);

  const videoUrl = video.includes('?')
    ? `${video}&autoplay=1&muted=1&controls=1`
    : `${video}?autoplay=1&muted=1&controls=1`;

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>

          <View className="pt-2">
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {play ? (
        <WebView
          source={{
            uri: `${videoUrl}&title=0&byline=0`,
          }}
          style={{
            width: 380,
            height: 288,
            marginTop: 12,
            borderRadius: 33,
            overflow: 'hidden',
            backgroundColor: 'black',
          }}
          className="w-full h-60 rounded-xl mt-3"
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={false}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-16 h-16 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
