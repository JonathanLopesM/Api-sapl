import mongoose, { Schema } from "mongoose";

export interface ISpeech {
  id: number;
  name: string;
  fotografia: string
  presenca: boolean;
  speechTime: boolean,
  speechTimeInit: number
  speechTimeInitBoolean:boolean
  partTime: boolean
  partTimeInit:number
  partTimeInitBoolean:boolean 
  orderQuestionTime:boolean 
  orderQuestionTimeInit:boolean
  orderQuestionTimeInitBoolean: boolean
  finalConsiderationsTime :boolean
  finalConsiderationsTimeInit: number
  finalConsiderationsTimeInitBoolean: boolean
  soundPlay: boolean
}
const speechSchema = new Schema({
  id: {type:Number},
  name: String,
  fotografia: String,
  presenca: Boolean,
  
  speechTime: Boolean,
  speechTimeInit: Number,
  speechTimeInitBoolean: Boolean,

  partTime: Boolean,
  partTimeInit:Number,
  partTimeInitBoolean:Boolean,

  orderQuestionTime: Boolean,
  orderQuestionTimeInit:Number,
  orderQuestionTimeInitBoolean: Boolean,

  finalConsiderationsTime :Boolean,
  finalConsiderationsTimeInit: Number,
  finalConsiderationsTimeInitBoolean: Boolean,

  soundPlay: Boolean
  
})

export default mongoose.model<ISpeech>('Speech', speechSchema, 'speech' )




