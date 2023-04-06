import { createContext } from 'react';
import { ICartProduct, ShippingAddress} from './../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItem: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress

    //* Method
    onAddProductCart: ( value: ICartProduct ) => void;
    onRemoveProductCart: ( value: ICartProduct ) => void;
    updateCartQuantity: ( value: ICartProduct ) => void;
    updateAddress: ( value: ShippingAddress ) => void;
    
    //*Orders
    onCreateOrder: () => Promise<{ hasErr: boolean; message: string; }> ;
}

export const CartContext = createContext({} as ContextProps );