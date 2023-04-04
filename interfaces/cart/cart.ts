import { IValidSizes } from './..';

export interface ICartProduct {
    _id: string;
    images: string;
    price: number;
    size?: IValidSizes;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex';
    quantity: number;
}