import mongoose, { Model, model, Schema } from 'mongoose';
import { IUser } from '../interfaces';



const userShema = new Schema({

    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
        type: String,
        enum: {
            values: ['admin', 'client'],
            message: '{VALUE} no es un role valido',
            default: 'client',
            required: true
        }
    }
},{
    timestamps: true
}); 

const User: Model<IUser> = mongoose.models.User || model('User', userShema);


export default User;