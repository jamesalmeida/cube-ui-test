import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { sendMessageToGrok } from '../services/grokApi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'chronicler';
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGrok(inputText);
      
      const chroniclerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'chronicler',
      };

      setMessages(prevMessages => [...prevMessages, chroniclerMessage]);
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to get response from Chronicler'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showInput = () => {
    setIsInputVisible(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const hideInput = () => {
    setIsInputVisible(false);
    inputRef.current?.blur();
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'user' ? styles.userMessage : styles.chroniclerMessage
    ]}>
      <Text style={[
        styles.messageText,
        { color: item.sender === 'user' ? '#FFFFFF' : '#000000' }
      ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 25}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        style={styles.flatList}
        inverted={false}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
      />
      {isInputVisible && (
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={[
                styles.input,
                isLoading && styles.inputDisabled
              ]}
              value={inputText}
              onChangeText={setInputText}
              placeholder={isLoading ? "Chronicler is typing..." : "Type your response..."}
              returnKeyType="send"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                if (inputText.trim()) {
                  sendMessage();
                }
              }}
              onBlur={hideInput}
              multiline={false}
              editable={!isLoading}
            />
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={showInput}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    flex: 1,
  },
  messageList: {
    padding: 10,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#333333',
    alignSelf: 'flex-end',
  },
  chroniclerMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: props => props.sender === 'user' ? '#FFFFFF' : '#000000',
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingBottom: Platform.OS === 'ios' ? 34 : 10,
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 20,
    fontSize: 16,
  },
  inputDisabled: {
    opacity: 0.7,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 90,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
}); 