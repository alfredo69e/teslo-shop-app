import { db } from '@/db';
import { User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { IUser } from '@/interfaces';
import { jwt } from '@/utils';

type Data = {   message: string }
    | { token: string, user: { name: string, role: string, email: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch ( req.method ) {
        case 'POST':
            
            return loginUser( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const loginUser = async ( req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {

        const { email = '', password = '' } = req.body;

        await db.connect();

        const user = await User.findOne<IUser>({ email });

        await db.disconnect();

        if ( !user ) return res.status(404).json({message: 'Password or Email not Valide'});
        if( !bcrypt.compareSync( password, user.password! ) ) return res.status(404).json({message: 'Password or Email not Valide'});

        const { role, name, _id } = user;

        const token = jwt.signJwt( _id, email );

        return res.status(200).json({
            token,
            user: {
                email,
                role,
                name
            }
        })
        
    } catch ( err ) {

        await db.disconnect();
        res.status(500).json({ message: 'server err ' });
        
    }


}

