import { View, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../constants/common';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileHeader({ user }) {
  const { top } = useSafeAreaInsets();
  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false,
        header: () => (
          <View
            style={{ paddingTop: top + 20 }}
            className='flex-col justify-center items-center px-5 bg-indigo-500 pb-6 rounded-b-2xl shadow'
          >
            <Image
              style={{ height: hp(16), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={blurhash}
              transition={500}
            />
            <View className='flex-row justify-center items-center'>
              <Text style={{ fontSize: hp(3.5) }} className='text-white pr-2'>
                {user?.username}
              </Text>
              <MaterialIcons
                name='drive-file-rename-outline'
                size={28}
                color='white'
              />
            </View>
          </View>
        ),
      }}
    />
  );
}
