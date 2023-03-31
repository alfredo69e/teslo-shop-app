import { IProduct } from './../../../interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from './../../../db';
import { Product } from './../../../models';

type Data = { message: string } | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch ( req.method ) {
        case 'GET':
            
            return getProductBySearch( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const getProductBySearch = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { search = '' } = req.query;

    search = search.toString().toLowerCase();

    try {

        await db.connect();

        const products = await Product.find<IProduct>({ $text: { $search: search } })
                        .select('title images price inStock slug -_id')
                        .lean();

        await db.disconnect();

        // if( !product ) return  res.status(404).json( { message: `${ slug } no encontrado` } )

        return res.status(200).json( products );
        
    } catch ( err ) {
        console.log( 'getProductBySearch err ', err );
        
       await db.disconnect();
       return res.status(500).json( { message: `err in server` } );
    }
}
