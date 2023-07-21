import mongoose, { Schema } from "mongoose";

export interface ISpeech {
  id: number;
  user: string;
  name: string;
  fotografia: string
  presenca: boolean;
  speechTime: boolean,
  speechTimeInit: number
}
const speechSchema = new Schema({
  id: {type:Number},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'UsersParl',
    require:true
  },
  name: String,
  fotografia: String,
  presenca: Boolean,
  speechTime: Boolean,
  speechTimeInit: Number
  
})

export default mongoose.model<ISpeech>('Speech', speechSchema, 'speech' )




