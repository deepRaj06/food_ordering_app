import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import {images} from '@/constants';
import {Slot} from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';

const _Layout = () => {
  return (
    // Below component ensures when user writing input keyboard should appear below it not above that
    // iOS - need to add some padding
    // android - need to add some height

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/*keyboardShouldPersistTaps - tapping outside the keyboard will dismiss the keyboard entirely */}
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled">
        <View
          className="w-full relative"
          style={{height: Dimensions.get('screen').height / 2.25}}>
          <ImageBackground
            source={images.loginGraphic}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-16 z-10"
          />
        </View>

        {/*  */}
        {/* <CustomInput 
          placeholder="Enter your email"
          value={''}
          onChangeText={(text) => {}}
          label='Email'
          keyboardType='email-address'
        />
        <CustomButton/> */}
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default _Layout;
