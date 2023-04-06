

import { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from './../../../interfaces';
import { db } from './../../../db';
import { Order, Product } from '@/models';
import { getToken } from 'next-auth/jwt';

type Data = { message: string }
        | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch ( req.method ) {
        case 'POST':
            
            return createOrder( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const createOrder = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { orderItems, total } = req.body as IOrder;

    const session : any = await getToken({ req });
    
    if( !session ) return res.status(401).json({message: 'Autenticated'});

    // *
    const productsId = orderItems.map(( p ) => p._id);

    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsId } });

    try {

        const subTotal = orderItems.reduce( ( prev, current ) => {
            
            const currentPrice = dbProducts.find( ( prod ) => prod.id === current._id )?.price;

            console.log('currentPrice ', currentPrice);
            

            if( !currentPrice ) throw new Error('Verifique Cart');
            
            return ( currentPrice * current.quantity ) + prev 
        
        }, 0 );

        const taxRate = Number( process.env.NEXT_PUBLIC_TAX_RATE || 0 );

        const backenTotal = subTotal * ( taxRate + 1 );

        if( backenTotal !== total ) throw new Error('Total no Same');

        const userId = session.user?._id;

        const newOrder = new Order({
            ...req.body,
            isPais: false,
            user: userId
        });

        newOrder.total = Math.round( newOrder.total * 100 ) / 100;
        
        await newOrder.save();

        await db.disconnect();


        return res.status(201).json( newOrder );
        
    } catch ( err: any) {
        await db.disconnect();
        console.log( err );

        return res.status(400).json({message: err.message || 'Review los log of Server'})
    }


    
}
