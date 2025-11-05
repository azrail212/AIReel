import { Stack, Link } from 'expo-router';

import { View,Text} from 'react-native';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

import {StatusBar} from 'expo-status-bar'

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-3xl font-pblack">AIReel</Text>
          <StatusBar style="auto"></StatusBar>
          <Link href="/profile" style={{color:'blue'}}>Go to Profile</Link>
        </View>
  );
}

