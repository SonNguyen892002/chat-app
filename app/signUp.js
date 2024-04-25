import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loading from '../components/loading';
import CustomKeyboardView from '../components/customKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const usernameRef = useRef('');
  const profileRef = useRef('');

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert('Sign Up', 'Please enter all the field!');
      return;
    }

    setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false);
    // console.log('Get result', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View className='flex-1'>
        <StatusBar style='dark' />
        <View
          style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
          className='flex-1 gap-12'
        >
          <View className='items-center'>
            <Image
              style={{ height: hp(20) }}
              resizeMode='contain'
              source={require('../assets/images/register.png')}
            />
          </View>
          <View className='gap-10'>
            <Text
              style={{ fontSize: hp(4) }}
              className='font-bold tracking-wider text-center text-neutral-800'
            >
              Sign Up
            </Text>

            {/* Input section */}
            <View className='gap-4'>
              <View
                style={{ height: hp(7) }}
                className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
              >
                <Feather name='user' size={hp(2.7)} color='gray' />
                <TextInput
                  onChangeText={(value) => (usernameRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className='flex-1 font-semibold text-neutral-700'
                  placeholder='Username'
                  placeholderTextColor={'gray'}
                />
              </View>

              <View
                style={{ height: hp(7) }}
                className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
              >
                <Octicons name='mail' size={hp(2.7)} color='gray' />
                <TextInput
                  onChangeText={(value) => (emailRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className='flex-1 font-semibold text-neutral-700'
                  placeholder='Email address'
                  placeholderTextColor={'gray'}
                />
              </View>

              <View
                style={{ height: hp(7) }}
                className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
              >
                <Octicons
                  name='lock'
                  size={hp(2.7)}
                  color='gray'
                  className='px-1'
                />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className='flex-1 font-semibold text-neutral-700'
                  placeholder='Password'
                  placeholderTextColor={'gray'}
                  secureTextEntry
                />
              </View>

              <View
                style={{ height: hp(7) }}
                className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
              >
                <Feather name='image' size={hp(2.7)} color='gray' />
                <TextInput
                  onChangeText={(value) => (profileRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className='flex-1 font-semibold text-neutral-700'
                  placeholder='Profile url'
                  placeholderTextColor={'gray'}
                />
              </View>

              {/* Submit btn */}
              <View>
                {loading ? (
                  <View className='flex-row justify-center'>
                    <Loading size={hp(6)} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleRegister}
                    style={{
                      height: hp(6.5),
                      backgroundColor: 'rgb(102, 17, 175)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{ fontSize: hp(2.7) }}
                      className='text-white font-bold tracking-wider'
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* SignUp direction */}
              <View className='flex-row justify-center'>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className='font-semibold text-neutral-500'
                >
                  Already have an account?{' '}
                </Text>
                <Pressable onPress={() => router.push('signIn')}>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className='font-bold text-indigo-500'
                  >
                    Sign In
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
