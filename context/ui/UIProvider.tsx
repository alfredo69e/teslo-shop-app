import { FC, ReactNode, useReducer, useState } from 'react';
import { UIContext, uiReducer } from './';


export interface UIState {
    isMenuOpen: boolean;
}

interface props {
    children: ReactNode;
}

const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false,
}


export const UIProvider: FC<props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = ( value: boolean ) => {
        dispatch({ type: '[UI] - ToggleMenu', payload: value });
    }

return (
    <UIContext.Provider value={{
        ...state,

        // * Methods
        toggleSideMenu,
    }}>
        { children }
    </UIContext.Provider>
  )
}