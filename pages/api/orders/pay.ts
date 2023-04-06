import { db } from '@/db';
import { IPaypal } from '@/interfaces';
import { Order } from '@/models';
import axios from 'axios';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch ( req.method ) {
        case 'POST':
            
            return payOrder( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const getPaypalBeareToken = async (): Promise<string | null> => {

    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT; 
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');


    try {

        const { data } = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body , {
            headers: {
                'Authorization': `Basic ${ base64Token }`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        } );

        return data.access_token.toString();
        
    } catch ( err ) {
        if( axios.isAxiosError( err ) ) {
            console.log( err.response?.data );
            
        } else {
            console.log( err);
        }

        return null;
    }
}

const payOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { transactionId = '', orderId = '' } = req.body;

    const session: any = await getToken({ req });

    if( !session ) return res.status(401).json({ message: 'Please Loggin' });

    if( !isValidObjectId( orderId ) ) return res.status(401).json({ message: 'No es una Orden Valida' });

    const paypalBeareToken = await getPaypalBeareToken();

    if( !paypalBeareToken ) return res.status(400).json({ message: 'no se pudo crear el token en paypal' });

    

    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
        headers: {
            'Authorization': `Bearer ${ paypalBeareToken }`
        }
    });

    if( data.status !== 'COMPLETED' ) return res.status(400).json({ message: 'Orden no Reconocida' });

    await db.connect();

    const dbOrder = await Order.findById( orderId );
   

    if( !dbOrder ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Orden no Existe' });
    }

    if( dbOrder.total !== Number( data.purchase_units[0].amount.value ) ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Los Montos de paypal y orden no son iguales' });
    }

    dbOrder.isPay = true;
    dbOrder.transactionId = transactionId;

    await dbOrder.save();

    await db.disconnect();

    return res.status(200).json({ message: 'Order Pay' });
}
