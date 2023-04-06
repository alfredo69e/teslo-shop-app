
import { IValidSizes } from "../products";
import { IUser } from "../user";


export interface IOrder {
    _id                 ?: string;
    user                ?: IUser | string;
    orderItems           : IOrderItems[];
    shippingAddress      : ShippingAddress;
    // paymentResult       ?: string;
    numberOfItem         : number;
    subTotal             : number;
    tax                  : number;
    total                : number;
    isPay                : boolean;
    paidAt               ?: string;
    transactionId        ?: string;
}

export interface IOrderItems {
    _id         : string;
    title       : string;
    size        : IValidSizes;
    quantity    : number;
    slug        : string;
    image       : string;
    price       : number;
    gender      : string;
}

export interface  ShippingAddress {
    firstName   : string;
    lastName    : string;
    address     : string;
    address2   ?: string;
    zip         : string;
    city        : string;
    country     : string;
    phone       : string;
}