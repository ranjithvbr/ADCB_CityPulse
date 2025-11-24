import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored !== null) {
          setValue(JSON.parse(stored));
        }
      } catch (e) {
        console.log('Error reading storage', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.log('Error writing storage', e);
      }
    })();
  }, [key, value, loaded]);

  return { value, setValue, loaded } as const;
}
