import mongoose, { Schema } from "mongoose";

export interface ISpeech {
  id: number;
  name: string;
  fotografia: string
  presenca: boolean;
  speechTime: boolean,
  speechTimeInit: number
  speechTimeInitBoolean:boolean
}
const speechSchema = new Schema({
  id: {type:Number},
  name: String,
  fotografia: String,
  presenca: Boolean,
  speechTime: Boolean,
  speechTimeInit: Number,
  speechTimeInitBoolean: Boolean
  
})

export default mongoose.model<ISpeech>('Speech', speechSchema, 'speech' )




