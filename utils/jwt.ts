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

};

export const isValidToken = ( token: string ): Promise<string> => {
    
    if( !process.env.JWT_SECRET_SEED ) throw new Error('No hay Semilla de jwt');

    return new Promise(( resolve, reject ) => {

        try {

            jwt.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if( err ) return reject('Jwt no es valido');

                const { _id } = payload as { _id: string }; 

                return resolve( _id );
            })
            
        } catch ( err ) {
            
            return reject(err);

        }
    });
}