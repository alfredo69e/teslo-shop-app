import { db, seedDatabase } from './../../db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from './../../models';

type Data = {
    message: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    if ( process.env.NODE_ENV === 'production' ) return res.status(401).json({ message: 'No tiene accesso a este servicio' });

   try {
        await db.connect();

        await Product.deleteMany();

        await Product.insertMany( seedDatabase.initialData.products );

        await db.disconnect();

        res.status(200).json({ message: 'Process completed success' })
   } catch (error) {
    console.log('error ', error);

    await db.disconnect();
    
    res.status(500).json({ message: 'Process not Complete ' });
    
   }
}