import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { blurhash } from '../constants/common';
import { useAuth } from '../context/authContext';
import { useRouter } from 'expo-router';

export default function HomeHeader() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  const handleProfile = () => {
    router.push({ pathname: '/profile', params: user });
  };

  return (
    <View
      style={{ paddingTop: top + 10 }}
      className='flex-row justify-between px-5 bg-indigo-500 pb-6 rounded-b-2xl shadow'
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className='font-medium text-white'>
          Messages
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleProfile}>
          <Image
            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
            source={user?.profileUrl}
            placeholder={blurhash}
            transition={500}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
