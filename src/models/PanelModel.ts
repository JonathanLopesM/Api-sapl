import mongoose, { Schema } from "mongoose";

export interface IPainel {
  estado:boolean;
  tela:number;
  materia: string
}
const userSchema = new Schema({
  estado: Boolean,
  tela: Number,
  materia: String
})

export default mongoose.model<IPainel>('Painel', userSchema, 'painel' )




