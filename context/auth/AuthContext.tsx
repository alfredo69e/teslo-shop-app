import { IUser } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    //* Methods
    onLoggin: ( email: string, password: string ) => Promise<boolean> 
    onRegister: ( email: string, password: string, name: string ) => Promise<{ hasError: boolean; message?: string;}>
    onLogoutUser: ( ) => void
}

export const AuthContext = createContext({} as ContextProps );