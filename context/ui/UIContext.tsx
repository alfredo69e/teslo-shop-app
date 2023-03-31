import { createContext } from 'react';

interface ContextProps {
    isMenuOpen: boolean;

     // * Methods
    toggleSideMenu: ( value: boolean ) => void
}

export const UIContext = createContext({} as ContextProps );