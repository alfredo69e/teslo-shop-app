import { createContext } from 'react';
import { ICartProduct } from './../../interfaces';

interface ContextProps {
    cart: ICartProduct[];
    numberOfItem: number;
    subTotal: number;
    tax: number;
    total: number;

    //* Method
    onAddProductCart: ( value: ICartProduct ) => void;
    onRemoveProductCart: ( value: ICartProduct ) => void;
    updateCartQuantity: ( value: ICartProduct ) => void;
}

export const CartContext = createContext({} as ContextProps );