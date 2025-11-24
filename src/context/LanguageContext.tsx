import React, { createContext, useContext, useEffect, useRef } from 'react';
import { I18nManager } from 'react-native';
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

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      RNRestart.restart();
    }
  }, [isRTL, loaded]);

  const toggleLanguage = () => {
    setValue(prev => (prev === 'en' ? 'ar' : 'en'));
  };

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
