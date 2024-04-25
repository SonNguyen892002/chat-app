import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const ios = Platform.OS == 'ios';
export default function CustomKeyboardView({ children, inChat }) {
  let kbvConfig = {};
  let ScrollViewConfig = {};
  if (inChat) {
    kbvConfig = { keyboardVerticalOffset: 60 };
    ScrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }
  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding' : 'height'}
      style={{ flex: 1 }}
      {...kbvConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...ScrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
