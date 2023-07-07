import mongoose, { Schema } from "mongoose";

export interface IUser {
  username:string;
  password:string;
  active:number;
  nivel:number;
}
const userSchema = new Schema({
  username: {type: String},
  password: String,
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  active: { type:Number },
  nivel: { type:Number },
  
  
})

export default mongoose.model<IUser>('Users', userSchema, 'users' )




