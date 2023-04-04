import { CartState } from './';
import { ICartProduct } from './../../interfaces';


type CartActionType = 
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update Product in Cart', payload: ICartProduct[] } 
    | { type: '[Cart] - Update Cart Quantity Product', payload: ICartProduct } 
    | { type: '[Cart] - Remove Product Cart', payload: ICartProduct } 
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
        default:
            return state;
    };
}