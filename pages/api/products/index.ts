import { db, shop_constants } from './../../../db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from './../../../interfaces';
import { Product } from './../../../models';

type Data = 
    { message: string } 
  | IProduct[] 

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch ( req.method ) {
        case 'GET':
            
            return getProducts( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { gender = 'all' } = req.query;

    let query = {};


    if( gender !== 'all' && shop_constants.SHOP_CONSTANTS.validGenders.includes( `${gender}`) ) {
        query = { gender }
    }

    try {

        await db.connect();

        const products = await Product.find<IProduct[]>( query )
                            .select('title images inStock price slug -_id')
                            .lean();

        await db.disconnect();

        return res.status(200).json( products )
        
    } catch ( err ) {
        console.log( 'getProducts err ', err );
        
       await db.disconnect();
       return res.status(500).json( { message: `err in server` } );
    }

}