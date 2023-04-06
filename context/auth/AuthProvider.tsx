import { FC, ReactNode, useEffect, useReducer, useState } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

interface props {
    children: ReactNode;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}


export const AuthProvider: FC<props> = ({ children }) => {

    const { data, status } = useSession();

//   console.log({ session });

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    const { reload } = useRouter();

    useEffect(() => {
      if( status === 'authenticated' ) {

        dispatch({ type: '[Auth] - Login', payload: data?.user as IUser });
        
      }
    }, [ status, data ])
    

    // useEffect(() => {
    //     checkToken();
    // }, [])

    const checkToken = async() => {

        if( !Cookies.get('token') ) return;

        try {
            
            const { data } = await tesloApi.get('/user/validate-token');

            const { token, user } = data;

            Cookies.set('token', token );

            dispatch({ type: '[Auth] - Login', payload: user });

        } catch ( err ) {
            Cookies.remove('token');
            dispatch({ type: '[Auth] - Logout' });
        }

    }
    

    const onLoggin = async( email: string, password: string ): Promise<boolean> => {
        try {

            const { data } = await tesloApi.post('/user/login', { email, password });

            const { token, user } = data;
           
            Cookies.set('token', token );

            dispatch({ type: '[Auth] - Login', payload: user });

            return true;
            
            
        } catch ( err ) {
            return false;
        }
    }

    const onRegister = async( email: string, password: string, name: String ): Promise<{
            hasError: boolean;
            message?: string
        }> => {
        try {

            const { data } = await tesloApi.post('/user/register', { email, password, name });

            const { token, user } = data;
           
            Cookies.set('token', token );

            dispatch({ type: '[Auth] - Login', payload: user })

            return  {
                hasError: false,
                message: ''
            };
            
            
        } catch ( err ) {

            if( axios.isAxiosError( err ) ) {
                return {
                    hasError: true,
                    message: err.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'No se pudo crear el usuario'
            };
        }
    }

    const onLogoutUser = () => {
        // Cookies.remove('token');
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone', );
        signOut();
        // reload();
    }

return (
    <AuthContext.Provider value={{
        ...state,

        //* Method
        onLoggin,
        onRegister,
        onLogoutUser
    }}>
        { children }
    </AuthContext.Provider>
  )
}