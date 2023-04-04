import { FC, ReactNode, useEffect, useReducer, useState } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from './../../interfaces';
import Cookie from 'js-cookie';
import { double } from 'webidl-conversions';

export interface CartState {
    cart: ICartProduct[];
    numberOfItem: number;
    subTotal: number;
    tax: number;
    total: number;
}

interface props {
    children: ReactNode;
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItem: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}


export const CartProvider: FC<props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
       try {

        const cookieProducts: ICartProduct[] = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : [];

        // console.log('cookieProducts ', cookieProducts);
        
        dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        
       } catch ( err ) {

        dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        
       }
     }, []);


    useEffect(() => {
        Cookie.set('cart', JSON.stringify( state.cart ) );
    }, [ state.cart ]);

    useEffect(() => {
        const numberOfItem = state.cart.reduce(( prev, current ) =>  current.quantity + prev, 0 );
        
        const subTotal = state.cart.reduce(( prev, current ) => ( current.quantity * current.price ) + prev, 0 );
        
        const taxRate = Number( process.env.NEXT_PUBLIC_TAX_RATE || 0 );

        const orderSummary = {
            numberOfItem,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * ( taxRate + 1 ),
        };

        dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });

    }, [ state.cart ]);
    

    const onAddProductCart = ( product: ICartProduct ) => {

        const productInCart = state.cart.some( ( p ) => p._id === product._id  );

        if( !productInCart ) return dispatch({ type: '[Cart] - Update Product in Cart', payload: [ ...state.cart, product ] });

        const productInCartButDiffSize = state.cart.some( ( p ) => p._id === product._id && p.size === product.size );

        if( !productInCartButDiffSize ) return dispatch({ type: '[Cart] - Update Product in Cart', payload: [ ...state.cart, product ] });

        const updateProducts = state.cart.map(( p ) => {
            if( p._id !== product._id ) return p;
            if( p.size !== product.size ) return p;
            p.quantity += product.quantity;
            return p;

        })

        dispatch({ type: '[Cart] - Update Product in Cart', payload: updateProducts });
        
    }

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch( { type: '[Cart] - Update Cart Quantity Product', payload: product } )
    }


    const onRemoveProductCart = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove Product Cart', payload: product });
    }

return (
    <CartContext.Provider value={{
        ...state,
        
        //* Methods
        onAddProductCart,
        onRemoveProductCart,
        updateCartQuantity,
    }}>
        { children }
    </CartContext.Provider>
  )
}