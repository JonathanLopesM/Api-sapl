import axios from "axios";
import bcrypt from "bcrypt"
import User from "../../models/UserModel";
import UserParlam from "../../models/UserParlamModel";

interface PARL {
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

export const CreateAuthUser = async (req, res) => {
  const { username, password, confirmpassword, active, nivel, id } = req.body;
  const url = process.env.URL_INTERLEGIS
  let parlamentar = null
  if(!username){
    return res.status(422).json({ message: 'O Username é obrigatório'})
  }
  if(!password){
    return res.status(422).json({ message: 'A Senha é obrigatória'})
  }
  if(!active){
    return res.status(422).json({ message: 'O Active é obrigatório'})
  }
  if(!nivel){
    return res.status(422).json({ message: 'O Nivel de usuário é obrigatório'})
  }
  if(password !== confirmpassword) {
    return res.status(422).json({ message: 'As senhas não conferem!'})
  }

  // check if User exists 
  if(!id){
    const userExists = await User.findOne({username: username})

    if(userExists){
      return res.status(422).json({ message: 'Username já vinculado a uma conta!'})
    }
  }
  else {
    const userExists = await UserParlam.findOne({username: username})

    if(userExists){
      return res.status(422).json({ message: 'Username já vinculado a uma conta!'})
    }
  }
  if(id) {
     parlamentar = await axios.get(`${url}/api/parlamentares/parlamentar/${id}`) as PARL
  }
  // create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  //create User
  let user = {} as any
  let voting = {} as any
  if(nivel == 2){
    user = new User({
      username,
      password:passwordHash,
      active,
      nivel
    })
    await user.save()
  }
  if(nivel == 1){
    user = new UserParlam({
      id:parlamentar.data.id,
      username,
      password:passwordHash,
      active,
      nivel,
      __str__:parlamentar.data.__str__,
      nome_completo:parlamentar.data.nome_completo,
      nome_parlamentar:parlamentar.data.nome_parlamentar,
      sexo:parlamentar.data.sexo,
      data_nascimento:parlamentar.data.data_nascimento,
      numero_gab_parlamentar:parlamentar.data.numero_gab_parlamentar,
      telefone:parlamentar.data.telefone,
      telefone_celular:parlamentar.data.telefone_celular,
      endereco_web:parlamentar.data.endereco_web,
      profissao:parlamentar.data.profissao,
      email:parlamentar.data.email,
      locais_atuacao:parlamentar.data.locais_atuacao,
      ativo:parlamentar.data.ativo,
      biografia:parlamentar.data.biografia,
      fotografia:parlamentar.data.fotografia,
      cropping:parlamentar.data.cropping,
      nivel_instrucao:parlamentar.data.nivel_instrucao
    })
    await user.save()
  }

  try {
    res.status(201).json({message: 'usuario criado com sucesso!'})
  } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Erro no servidores'})
  }
}