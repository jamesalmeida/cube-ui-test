import AsyncStorage from '@react-native-async-storage/async-storage';
import OpenAI from 'openai';

const API_KEY_STORAGE_KEY = 'xai_api_key';

export const sendMessageToGrok = async (message: string): Promise<string> => {
  try {
    const apiKey = await AsyncStorage.getItem(API_KEY_STORAGE_KEY);
    
    if (!apiKey) {
      throw new Error('No API key found. Please add your xAI API key in settings.');
    }

    const client = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.x.ai/v1',
    });

    const completion = await client.chat.completions.create({
      model: 'grok-2-1212',
      messages: [
        {
          role: 'system',
          content: 'You are the Chronicler, a storytelling AI guide in the game Chronicles of X. Engage with the player to create an immersive narrative experience.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error('Error calling Grok API:', error);
    throw error;
  }
}; 