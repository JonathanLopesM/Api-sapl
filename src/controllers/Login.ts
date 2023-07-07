import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken"

import User from "../models/UserModel";
import UserParlam from "../models/UserParlamModel";
import Votante from "../models/votingModel";

interface ReqBody {
  username: string;
  password: string;
}
export const Login = async (req:Request, res:Response) => {
  const { username, password } = req.body as ReqBody;

  if(!username){
    return res.status(422).json({ message: 'O Username é obrigatório'})
  }
  if(!password){
    return res.status(422).json({ message: 'A Senha é obrigatória'})
  }

  let user = {} as any
  var response = {} as any
  user = await User.findOne({ username: username})
  if(user) {
    response = {
      _id: user._id,
      username: user.username,
      active: user.active,
      nivel: user.nivel
    }
  }

  
  if(!user){
      user = await UserParlam.findOne({ username: username})
      if(!user){
        return res.status(422).json({ msg: 'Usuário não encontrado, verifique Email/Senha'})
      }
      let votante = await Votante.findOne({ id: user.id})


      if(!votante){
          votante = new Votante({
            id: user.id,
            user: user._id,
            name: user.nome_parlamentar,
            fotografia: user.fotografia,
            presenca: true,
            voto: 'Não Votou'
          })
          votante.save()
        }
        if(user) {
          await Votante.findByIdAndUpdate(user._id, {
              name: user.nome_parlamentar,
              fotografia: user.fotografia,
              presenca: true,
              voto: 'Não Votou'
          }, { new: true })
          

          const {
            _id, id, active, nivel, __str__, 
            nome_completo, nome_parlamentar,
            sexo, data_nascimento, profissao, ativo,
            biografia, fotografia, cropping, nivel_instrucao, 
          } = user
        
           response = {
            user:{
              _id, id,
              username:user.username,
              active, nivel, __str__, 
              nome_completo, nome_parlamentar,
              sexo, data_nascimento, profissao, ativo,
              biografia, fotografia, cropping, nivel_instrucao, 
            }
          }
        }
        
  }


  const checkPassword = await bcrypt.compare(password, user.password)
  if(!checkPassword) {
    return res.status(422).json({ message: 'Senha Inválida' })
  }
  
  try{

    const secret = process.env.SECRET as Secret
    const token = jwt.sign({
      id:user._id,
    },
    secret,
    )

    res.status(200).json({response, token})
  } catch(error) {
    res.status(500).json({
      msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
    })
  }
}