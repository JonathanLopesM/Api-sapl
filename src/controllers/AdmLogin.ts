import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken"
import User from "../models/UserModel";

interface ReqBody {
  username: string;
  password: string;
}
export const AdmLogin = async (req:Request, res:Response) => {
  const { username, password } = req.body as ReqBody;
  if(!username){
    return res.status(404).json({ message: 'O Username é obrigatório'})
  }
  if(!password){
    return res.status(404).json({ message: 'A Senha é obrigatória'})
  }
  let user = {} as any
  var response = {} as any

  user = await User.findOne({ username})
  if(!user){
    res.status(404).json({ message: "Usuário não encontrado, verifique Username/Senha"})
  }
  if(user) {
    response = {
      _id: user._id,
      username: user.username,
      active: user.active,
      nivel: user.nivel
    }
  }
  const checkPassword = await bcrypt.compare(password, user?.password)
  if(!checkPassword) {
    return res.status(404).json({ message: 'Senha Inválida' })
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