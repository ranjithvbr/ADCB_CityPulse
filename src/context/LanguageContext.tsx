import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { I18nManager, Platform, ActivityIndicator } from 'react-native';
import RNRestart from 'react-native-restart';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

type Lang = 'en' | 'ar';

type LanguageContextValue = {
  lang: Lang;
  isRTL: boolean;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { value, setValue, loaded } = useAsyncStorage<Lang>(
    'appLanguage',
    'en',
  );

  const lang = value || 'en';
  const isRTL = lang === 'ar';
  const hasSynced = useRef(false);

  const [loadingSwitch, setLoadingSwitch] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    if (!hasSynced.current) {
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
      }
      hasSynced.current = true;
      return;
    }

    if (loadingSwitch && I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      const restartApp = () => RNRestart.restart();

      if (Platform.OS === 'android') {
        setTimeout(restartApp, 700);
      } else {
        restartApp();
      }
    }
  }, [isRTL, loaded, loadingSwitch]);

  const toggleLanguage = () => {
    setLoadingSwitch(true);
    setValue(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  if (loadingSwitch) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!loaded) return null;

  return (
    <LanguageContext.Provider value={{ lang, isRTL, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguageContext must be used inside LanguageProvider');
  }
  return ctx;
};
