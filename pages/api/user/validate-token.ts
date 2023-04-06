import { db } from '@/db';
import { User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { IUser } from '@/interfaces';
import { jwt } from '@/utils';
import { isValidToken } from '../../../utils/jwt';

type Data = {   message: string }
    | { token: string, user: { name: string, role: string, email: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch ( req.method ) {
        case 'GET':
            
            return validateToken( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const validateToken = async ( req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {

        const { token = ''} = req.cookies;

        // return res.status(200).json({ token } as any);

        let userId = '';

        try {
            userId = await jwt.isValidToken( token );
        } catch ( err ) {
            return res.status(401).json({ message: `${err}` });
        }



        await db.connect();

        const user = await User.findById<IUser>( userId ).lean();

        await db.disconnect();

        if ( !user ) return res.status(404).json({message: 'No Existe Usuario'});
       
        const { role, name, _id, email } = user;

        return res.status(200).json({
            token: jwt.signJwt( _id, email ),
            user: {
                email,
                role,
                name
            }
        });
        
    } catch ( err ) {

        await db.disconnect();
        res.status(500).json({ message: 'server err ' });
        
    }


}

