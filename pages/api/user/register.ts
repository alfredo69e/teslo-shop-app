import { db } from '@/db';
import { User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { IUser } from '@/interfaces';
import { jwt, validations } from '@/utils';

type Data = { message: string }
    | { token: string, user: { name: string, role: string, email: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch ( req.method ) {
        case 'POST':
            
            return registerUser( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const registerUser = async ( req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {

        const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string };


        if( password.length < 6 ) {
            return res.status(400).json({message: 'The Password have 6 caracters'});
        } 

        if( name.length < 2 ) {
            return res.status(400).json({message: 'The Name have 2 letters'});
        } 

        // console.log( email );
        

        if( !validations.isValidEmail( email ) ) {
            return res.status(400).json({message: 'Is Not email Valide'});
        } 


        await db.connect();

        const user = await User.findOne<IUser>({ email });

        if ( user ) {
            await db.disconnect();
            return res.status(400).json({message: 'Email Register'});
        } 


       
        

        const newUser = new User({
            email: email.toLocaleLowerCase(),
            password: bcrypt.hashSync( password ),
            name: name.toLocaleLowerCase(),
            role: 'client'
        });

        const userSave = await newUser.save({ validateBeforeSave: true });

        await db.disconnect();

        const token = jwt.signJwt( userSave._id, userSave.email );

        return res.status(200).json({
            token,
            user: {
                email: userSave.email,
                role: userSave.role,
                name: userSave.name
            }
        })
        
    } catch ( err ) {
        await db.disconnect();
        res.status(500).json({ message: 'server err ' });
    }


}

