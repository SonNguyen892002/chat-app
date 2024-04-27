import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { useAuth } from '../context/authContext';
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
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { blurhash } from '../constants/common';
import { getDownloadURL, ref } from 'firebase/storage';
import { getStorage, uploadBytes } from 'firebase/storage';
import 'react-native-get-random-values';
import * as uuid from 'uuid';

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pickedImage, setPickedImage] = useState();

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const usernameRef = useRef('');

  const takeImageHandler = async () => {
    let imageResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    const imageUri = imageResult.assets[0].uri;

    const uploadUrl = await uploadImage(imageUri);
    setPickedImage(uploadUrl);
  };

  const uploadImage = async (imageUri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUri, true);
        xhr.send(null);
      });

      const fileRef = ref(getStorage(), uuid.v4());
      await uploadBytes(fileRef, blob);

      blob.close();

      return await getDownloadURL(fileRef);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !pickedImage
    ) {
      Alert.alert('Sign Up', 'Please enter all the field!');
      return;
    }

    setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      pickedImage
    );
    setLoading(false);
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
                  autoCorrect={false}
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
                  autoCapitalize='none'
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

              <View className='flex-1 flex-row '>
                <Pressable
                  onPress={takeImageHandler}
                  style={{ height: hp(7) }}
                  className='flex-1 flex-row gap-2 px-2 bg-neutral-100 items-center rounded-xl'
                >
                  <Image
                    source={
                      pickedImage
                        ? { uri: pickedImage }
                        : require('../assets/images/user-avatar.png')
                    }
                    style={{
                      height: hp(5),
                      width: hp(5),
                      aspectRatio: 1,
                      borderRadius: 100,
                    }}
                    placeholder={blurhash}
                    transition={500}
                  />
                  <TextInput
                    editable={false}
                    value={pickedImage}
                    style={{ fontSize: hp(2) }}
                    className='flex-1 font-semibold text-neutral-700'
                    placeholder='Choose your profile picture'
                    placeholderTextColor={'gray'}
                  />
                </Pressable>
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
