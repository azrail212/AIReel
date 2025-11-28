import { View, Text, FlatList } from 'react-native'
import React from 'react'

type TrendingProps = {
  posts: { id: number }[]; // adjust type based on your real data later
};
const Trending: React.FC<TrendingProps> = ({ posts }) => {
  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className='text-3xl text-white'>{item.id}</Text>
        )}
        horizontal
        />
  )
}

export default Trending