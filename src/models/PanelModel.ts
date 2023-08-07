import mongoose, { Schema } from "mongoose";

export interface IPainel {
  estado:boolean;
  tela:number;
  materia: string;
  message: string;
  registro: boolean;
}
const userSchema = new Schema({
  estado: Boolean,
  tela: Number,
  materia: String,
  message: String,
  registro: Boolean
})

export default mongoose.model<IPainel>('Painel', userSchema, 'painel' )




