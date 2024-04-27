import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { useEffect, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/customKeyboardView';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../constants/common';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState();
  const textRef = useRef();
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createChatRoom();
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createAt', 'asc'));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      updateScrollView
    );

    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    });
  };

  const createChatRoom = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messageRef = collection(docRef, 'messages');
      textRef.current = '';
      if (inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        sender: user?.username,
        createAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      Alert.alert('Message', error.message);
    }
  };

  console.log(messages?.length);

  return (
    <CustomKeyboardView inChat={true}>
      <View className='flex-1 bg-white'>
        <StatusBar style='dark' />
        <ChatRoomHeader user={item} router={router} />
        <View className='h-3 border-b border-neutral-300' />
        <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
          {messages?.length <= 0 ? (
            <View className='flex-1 justify-center items-center'>
              <Text>Say hi to your friend 👋</Text>
            </View>
          ) : (
            <View className='flex-1'>
              <MessageList
                scrollViewRef={scrollViewRef}
                messages={messages}
                currentUser={user}
              />
            </View>
          )}
          <View style={{ marginBottom: hp(2.7) }} className='pt-2'>
            <View className='flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5'>
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder='Type message...'
                style={{ fontSize: hp(2) }}
                className='flex-1 mr-2'
                autoCapitalize='none'
                blurOnSubmit={false}
                autoFocus={false}
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                style={{
                  backgroundColor: 'rgb(229 229 229)',
                  padding: 8,
                  marginRight: 1,
                  borderRadius: 100,
                }}
              >
                <Feather name='send' size={hp(2.7)} color={'#737373'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
