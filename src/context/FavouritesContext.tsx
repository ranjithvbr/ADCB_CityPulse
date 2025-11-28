import React, { createContext, useContext } from 'react';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

type FavouritesContextValue = {
  // favourites: string[];
  isFavourite: (id: string) => boolean;
  toggleFavourite: (id: string) => void;
  // loaded: boolean;
};

const FavouritesContext = createContext<FavouritesContextValue | undefined>(
  undefined,
);

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { value, setValue, loaded } = useAsyncStorage<string[]>(
    'favouriteEvents',
    [],
  );

  const favourites = value;

  const isFavourite = (id: string) => favourites.includes(id);

  const toggleFavourite = (id: string) => {
    setValue(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  return (
    <FavouritesContext.Provider
      value={{ isFavourite, toggleFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavouritesContext = () => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) {
    throw new Error(
      'useFavouritesContext must be used inside FavouritesProvider',
    );
  }
  return ctx;
};
