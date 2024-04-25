import { Image } from 'expo-image';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { blurhash } from '../constants/common';

export default function ChatItem({ item, noBorder, router }) {
  const openChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: item });
  };
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: noBorder ? 0 : 1,
        borderBottomColor: 'rgb(229, 229, 229)',
      }}
    >
      <Image
        source={item?.profileUrl}
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        placeholder={blurhash}
        transition={500}
      />
      <View className='flex-1 gap-1'>
        <View className='flex-row justify-between'>
          <Text
            style={{ fontSize: hp(1.8) }}
            className='font-semibold text-neutral-800'
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className='font-medium text-neutral-500'
          >
            Iron
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className='font-semibold text-neutral-500'
        >
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
}
