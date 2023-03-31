import mongoose from 'mongoose';

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {

    console.log('process.env.MONGO_DB ', process.env.MONGO_DB);

    if( mongoConnection.isConnected === 1 ) {
        console.log(' ya estabamos conectados');
        return;
    }

    if( mongoose.connections.length > 0 ) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if(  mongoConnection.isConnected === 1 ) {
            console.log(' usando conecction anterior ');
            return;
        }

        await mongoose.disconnect();

    }

    await mongoose.connect(process.env.MONGO_DB ?? '');

    mongoConnection.isConnected = 1;

    
    

    console.log(' Connectado a mongo ', process.env.MONGO_DB ?? '');
}

export const disconnect = async () => {
    if ( mongoConnection.isConnected === 0 ) return;
    mongoConnection.isConnected = 0;
    mongoose.disconnect();
    console.log(' desconectado a mongo ');
}