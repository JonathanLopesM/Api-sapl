import mongoose, { Schema } from "mongoose";

export interface IVotante {
  id: number;
  user: string;
  name: string;
  fotografia: string
  presenca: boolean;
  voto: string;
}
const userSchema = new Schema({
  id: {type:Number},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'UsersParl',
    require:true
  },
  name: String,
  fotografia: String,
  presenca: Boolean,
  voto: String
  
})

export default mongoose.model<IVotante>('Votante', userSchema, 'votante' )




