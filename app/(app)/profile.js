import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';

export default function Profile() {
  const user = useLocalSearchParams();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sign out of your account',
      'Are you sure you want to sign out of your account?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => await logout(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  return (
    <View className='flex-1 bg-white'>
      <ProfileHeader user={user} />
      <View className='gap-4 mt-5 px-4'>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name='notifications' size={28} color='black' />
          <Text
            style={{ fontSize: hp(2) }}
            className='flex-1 font-semibold text-neutral-700'
          >
            Notification
          </Text>
          <Ionicons name='chevron-forward' size={24} color='black' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Ionicons name='information-circle' size={28} color='black' />
          <Text
            style={{ fontSize: hp(2) }}
            className='flex-1 font-semibold text-neutral-700'
          >
            Information
          </Text>
          <Ionicons name='chevron-forward' size={24} color='black' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Ionicons name='settings-sharp' size={28} color='black' />
          <Text
            style={{ fontSize: hp(2) }}
            className='flex-1 font-semibold text-neutral-700'
          >
            General setting
          </Text>
          <Ionicons name='chevron-forward' size={24} color='black' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
          <AntDesign name='back' size={28} color='black' />
          <Text
            style={{ fontSize: hp(2) }}
            className='flex-1 font-semibold text-neutral-700'
          >
            Back to messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.btn}>
          <FontAwesome
            className='pl-1'
            name='sign-out'
            size={28}
            color='black'
          />
          <Text
            style={{ fontSize: hp(2) }}
            className='flex-1 font-semibold text-neutral-700'
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    height: hp(10),
    gap: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgb(245, 245, 245 )',
    alignItems: 'center',
    borderRadius: 12,
  },
});
