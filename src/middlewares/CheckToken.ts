
import jwt, { Secret } from "jsonwebtoken"

async function checkToken (req, res, next) {
  
  const authHeader = await req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if(!token){
    console.log()
    return res.status(401).json({ msg: "Acesso negado!" })
  }

  try {

    const secret = process.env.SECRET as Secret

    jwt.verify(token, secret, (err, decoded) => {
      if(err) return res.status(401).send({ error: 'Token invalid'});
      // console.log(decoded)
      req.userId = decoded.id;
      
      return next()
    })

  } catch (error) {
    res.status(400).json({ msg: "Token Inválido !"})
  }

}

export default checkToken


