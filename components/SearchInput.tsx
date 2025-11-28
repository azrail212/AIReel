
import { View, Text, ViewProps, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

type SearchInputProps = {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
} & ViewProps;

const SearchInput: React.FC<SearchInputProps> = ({ 
  title, 
  value, 
  placeholder, 
  handleChangeText, 
  otherStyles, 
  keyboardType = 'default',
  ...props 
}) => {
  const [showPassword, setshowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
      <View className={`border-2  border-black-200  w-full h-16 px-4 
        bg-black-100 rounded-2xl items-center flex-row space-x-4
        ${isFocused ? 'border-secondary' : 'border-black-200'}`}>
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          placeholder="Search for a video topic"
          className='text-base mt-0.5 text-white flex-1 font-pregular'
          placeholderTextColor='#7b7b8b'
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity>
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