import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { blurhash } from '../constants/common';
import { useAuth } from '../context/authContext';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import CustomMenuItems from './CustomMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function HomeHeader() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();
  const handleProfile = () => {};
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View
      style={{ paddingTop: top + 10 }}
      className='flex-row justify-between px-5 bg-indigo-500 pb-6 rounded-b-2xl shadow'
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className='font-medium text-white'>
          List chats
        </Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: 'continuous',
                marginTop: 40,
                backgroundColor: 'white',
                width: 160,
              },
            }}
          >
            <CustomMenuItems
              text='Profile'
              action={handleProfile}
              value={null}
              icon={<Feather name='user' size={hp(2.5)} color='#737373' />}
            />
            <Divider />
            <CustomMenuItems
              text='Logout'
              action={handleLogout}
              value={null}
              icon={<AntDesign name='logout' size={hp(2.5)} color='#737373' />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

const Divider = () => {
  return <View className='p-[1px] w-full bg-neutral-200' />;
};
