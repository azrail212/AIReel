import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import React from 'react';
import { icons } from '@/constants';
import { useState } from 'react';
import WebView from 'react-native-webview';

interface Creator {
  username: string;
  avatar: string;
}

interface Video {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator;
}

interface VideoCardProps {
  video: Video;
  showActions?: boolean;
  onEditPress?: (video: Video) => void;
  onDeletePress?: (video: Video) => void;
}

const VideoCard = ({
  video,
  showActions = false,
  onEditPress,
  onDeletePress,
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const videoUrl = video.video.includes('?')
    ? `${video.video}&autoplay=1&muted=1&controls=1`
    : `${video.video}?autoplay=1&muted=1&controls=1`;

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {video.creator.username}
            </Text>
          </View>

          {showActions ? (
            <TouchableOpacity
              className="pt-2"
              activeOpacity={0.8}
              onPress={() => setMenuOpen(true)}
            >
              <Image
                source={icons.menu}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <View className="pt-2">
              <Image
                source={icons.menu}
                className="w-5 h-5 opacity-30"
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </View>
      {play ? (
        <WebView
          source={{
            uri: `${videoUrl} & title=0 & byline=0`,
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
            source={{ uri: video.thumbnail }}
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

      {/*  Action menu modal */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        {/* tap outside to close */}
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.35)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setMenuOpen(false)}
        >
          {/* prevent closing when tapping the box */}
          <Pressable
            style={{
              width: 220,
              backgroundColor: '#121212',
              borderRadius: 14,
              paddingVertical: 8,
              overflow: 'hidden',
            }}
            onPress={() => {}}
          >
            <TouchableOpacity
              style={{ paddingVertical: 12, paddingHorizontal: 14 }}
              activeOpacity={0.8}
              onPress={() => {
                setMenuOpen(false);
                onEditPress?.(video);
              }}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Edit</Text>
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#2a2a2a' }} />

            <TouchableOpacity
              style={{ paddingVertical: 12, paddingHorizontal: 14 }}
              activeOpacity={0.8}
              onPress={() => {
                setMenuOpen(false);
                onDeletePress?.(video);
              }}
            >
              <Text style={{ color: '#ff5a5a', fontSize: 16 }}>Delete</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default VideoCard;
