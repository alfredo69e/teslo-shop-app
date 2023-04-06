import { CartState } from './';
import { ICartProduct, ShippingAddress } from './../../interfaces';


type CartActionType = 
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update Product in Cart', payload: ICartProduct[] } 
    | { type: '[Cart] - Update Cart Quantity Product', payload: ICartProduct } 
    | { type: '[Cart] - Remove Product Cart', payload: ICartProduct } 
    | { type: '[Cart] - Load Address From Cookies', payload: ShippingAddress } 
    | { type: '[Cart] - Update Shipping Address', payload: ShippingAddress } 
    | { type: '[Cart] - Order complete' } 
    | { type: '[Cart] - Update Order Summary', payload: {
        numberOfItem: number;
        subTotal: number;
        tax: number;
        total: number;
    } } 

export const cartReducer = ( state: CartState, action: CartActionType ): CartState => {
    
    switch ( action.type ) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart: action.payload 
            };
        case '[Cart] - Update Product in Cart':
            
            return {
                ...state,
                cart: [ ...action.payload ]
            };
        case '[Cart] - Update Cart Quantity Product':
            
            return {
                ...state,
                cart: state.cart.map(( p ) => {
                    if( p._id !== action.payload._id ) return p;
                    if( p.size !== action.payload.size ) return p;

                    p.quantity = action.payload.quantity;
                    return p;
                })
            };
        case '[Cart] - Remove Product Cart':
            
            return {
                ...state,
                cart: state.cart.filter(( p ) => {
                    if( p._id !== action.payload._id ) return p;
                    if( p.size !== action.payload.size ) return p;
                })
            };
        case '[Cart] - Update Order Summary':
            
            return {
                ...state,
                ...action.payload
            };
        case '[Cart] - Load Address From Cookies':
        case '[Cart] - Update Shipping Address':
            
            return {
                ...state,
                shippingAddress: action.payload
            };
        case '[Cart] - Order complete':
            
            return {
                ...state,
                cart: [],
                numberOfItem: 0,
                subTotal: 0,
                tax: 0,
                total: 0,
                
            };

            
        default:
            return state;
    };
}