import { db } from './../../../db';
import { Product } from './../../../models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from './../../../interfaces';

type Data = { message: string }
    |   IProduct 

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch ( req.method ) {
        case 'GET':
            
            return getProductBySlug( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const  getProductBySlug = async ( req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { slug } = req.query;
    
    try {

        await db.connect();

        const product = await Product.findOne<IProduct>({ slug }).lean();

        await db.disconnect();

        if( !product ) return  res.status(404).json( { message: `${ slug } no encontrado` } )

        return res.status(200).json( product );
        
    } catch ( err ) {
        console.log( 'getProductBySlug err ', err );
        
       await db.disconnect();
       return res.status(500).json( { message: `err in server` } );
    }
}
