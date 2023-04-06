import { db } from '.';
import { User } from '@/models';
import bcrypt from 'bcryptjs';



export const checkUSerEmailPassword = async( email: string, password: string ) => {
    
    await db.connect();
    const user = await User.findOne({ email: email.toLowerCase() });
    await db.disconnect();

    if( !user ) return null;

    if( !bcrypt.compareSync( password, user.password! ) ) return null;

    const { role, name, _id: id } = user;

    return {
        role,
        name,
        id,
        _id: id,
        email: email.toLowerCase(),
    }
}

export const oauthToDbUser = async( oauthEmail: string, oauthName: string ) => {
    
    await db.connect();
    const user = await User.findOne({ email: oauthEmail.toLowerCase() });
   

    if( user ) {
        await db.disconnect();
        const { role, name, _id: id } = user;
        return { 
            role,
            name,
            id,
            _id: id,
            email: oauthEmail.toLowerCase(), 
        };
    };

    const newUser = new User({
        email: oauthEmail.toLowerCase(),
        name: oauthName.toLowerCase(),
        password: '@',
        role: 'client'
    });

    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();

    const { role, name, _id: id } = newUser;

    return { 
        role,
        name,
        id,
        _id: id,
        email: oauthEmail.toLowerCase(), 
    };
}