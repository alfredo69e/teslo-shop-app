import jwt from 'jsonwebtoken';

export const signJwt = ( _id: string, email: string ) => {

    if( !process.env.JWT_SECRET_SEED ) throw new Error('No hay Semilla de jwt');

    return jwt.sign(
        {
            _id, 
            email,
        },
        process.env.JWT_SECRET_SEED,
        {
            expiresIn: '15d',

        }
    )

}