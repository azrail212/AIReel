
import { View, Text, ViewProps, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

type FormFieldProps = {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
} & ViewProps;

const FormField: React.FC<FormFieldProps> = ({ 
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
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className={`border-2 w-full h-16 px-4 
        bg-black-100 rounded-2xl items-center flex-row
        ${isFocused ? 'border-secondary' : 'border-black-200'}`}>
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          className='flex-1 w-full text-white font-psemibold text-base'
          placeholderTextColor='#7b7b8b'
          secureTextEntry={title === 'Password' && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={title === 'Email' ? 'none' : 'sentences'}
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() =>
            setshowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6"
            resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField