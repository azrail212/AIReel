
import { View, Text, ViewProps, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, {useState } from 'react'
import { icons } from '../constants'
import { usePathname, router } from 'expo-router';

type SearchInputProps = {
  initialQuery:string
} & ViewProps;

const SearchInput: React.FC<SearchInputProps> = ({ 
  initialQuery
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
      <View className={`border-2  border-black-200  w-full h-16 px-4 
        bg-black-100 rounded-2xl items-center flex-row space-x-4
        ${isFocused ? 'border-secondary' : 'border-black-200'}`}>
        <TextInput
          value={query}
          onChangeText={(e) => setQuery(e)}
          placeholder="Search for a video topic"
          className='text-base mt-0.5 text-white flex-1 font-pregular'
          placeholderTextColor='#CDCDE0'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity
          onPress={()=>{
            if(!query) {
              return Alert.alert('Missing query', "Please input something to search results across database")
            }

            if (pathname.startsWith('/search')) router.setParams({query})
            else router.push(`/search/${query}`)
          }}>
            <Image
              source={icons.search}
              className='w-5 h-5 '
              resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput