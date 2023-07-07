import mongoose, { Schema } from "mongoose";

export interface IUserParl {
  username:string;
  password:string;
  active:number;
  nivel:number;
  id: number;
  __str__:string;
  metadata: object;
  nome_completo:string;
  nome_parlamentar: string;
  sexo:string;
  data_nascimento:string;
  numero_gab_parlamentar:string;
  telefone:string;
  telefone_celular:string;
  endereco_web:string;
  profissao:string;
  email:string;
  locais_atuacao:string;
  ativo:boolean;
  biografia:string;
  fotografia:string;
  cropping:string;
  nivel_instrucao:number;
}
const userSchema = new Schema({
  id: {type:Number},
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
  __str__:{type:String},
  metadata: {type:Object},
  nome_completo:{type:String},
  nome_parlamentar: {type:String},
  sexo:{type:String},
  data_nascimento:{type:String},
  numero_gab_parlamentar:{type:String},
  telefone:{type:String},
  telefone_celular:{type:String},
  endereco_web:{type:String},
  profissao:{type:String},
  email:{type:String},
  locais_atuacao:{type:String},
  ativo:{type:Boolean},
  biografia:{type:String},
  fotografia:{type:String},
  cropping:{type:String},
  nivel_instrucao:{type:Number}
  
  
})

export default mongoose.model<IUserParl>('UsersParl', userSchema, 'usersparl' )




