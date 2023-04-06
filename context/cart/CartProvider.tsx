import { FC, ReactNode, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct, IOrder, ShippingAddress } from './../../interfaces';
import Cookie from 'js-cookie';
import Cookies from 'js-cookie';
import { tesloApi } from '../../api';
import axios from 'axios';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItem: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: ShippingAddress;
}

interface props {
    children: ReactNode;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItem: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: {
        firstName   : '',
        lastName    : '',
        address     : '',
        address2    : undefined,
        zip         : '',
        city        : '',
        country     : '',
        phone       : '',
    }
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

        if( Cookies.get('firstName') ) {

            dispatch({ type: '[Cart] - Load Address From Cookies', payload: {
                firstName: Cookies.get('firstName') || '',
                lastName: Cookies.get('lastName') || '',
                address: Cookies.get('address') || '',
                address2: Cookies.get('address2') || '',
                zip: Cookies.get('zip') || '',
                city: Cookies.get('city') || '',
                country: Cookies.get('country') || '',
                phone: Cookies.get('phone') || '',
            } });
            
        };

       
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

    const updateAddress = ( address: ShippingAddress ) => {
        Cookies.set('firstName', address.firstName);
        Cookies.set('lastName', address.lastName);
        Cookies.set('address', address.address);
        Cookies.set('address2', address.address2 || '');
        Cookies.set('zip', address.zip);
        Cookies.set('city', address.city);
        Cookies.set('country', address.country);
        Cookies.set('phone', address.phone);
        dispatch({ type: '[Cart] - Update Shipping Address', payload: address });
    }

    const onCreateOrder = async(): Promise<{ hasErr: boolean; message: string; }> => {

        if( !state.shippingAddress ) {
            throw new Error('No Hay Order');
        }

        try {

            const createOrder: IOrder = {
                orderItems           : state.cart.map( ( p ) => ({
                    ...p,
                    size        : p.size!,
                    image       : p.image,
                } )),
                shippingAddress      : state.shippingAddress,
                numberOfItem         : state.numberOfItem,
                subTotal             : state.subTotal,
                tax                  : state.tax,
                total                : state.total,
                isPay                : false,
            };

            const { data } = await tesloApi.post<IOrder>('/orders', createOrder );

         dispatch({ type: '[Cart] - Order complete' })

        return {
            hasErr: false,
            message: data._id!
        }
            
        } catch ( err ) {

            console.log('err ', err);

            if( axios.isAxiosError(err) ) {
                return {
                    hasErr: true,
                    message: err.response?.data.message
                }
            }

            return {
                hasErr: true,
                message: 'error no controlado'
            }
            
            
        }

    }

return (
    <CartContext.Provider value={{
        ...state,
        
        //* Methods
        onAddProductCart,
        onRemoveProductCart,
        updateCartQuantity,
        updateAddress,
        onCreateOrder
    }}>
        { children }
    </CartContext.Provider>
  )
}