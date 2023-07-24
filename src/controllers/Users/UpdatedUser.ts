import bcrypt from "bcrypt"
import UserParlamModel from "../../models/UserParlamModel";


export const UpdatedUser = async (req, res) => {
  const { id } = req.params;
  console.log(id, "id que chega")
  const { username, password, confirmpassword, active, nivel } = req.body;
  let user;
  user = await UserParlamModel.findOne({_id:id})

  if(username){
    user.username = username;
  }
  if(password){
    if(password === confirmpassword){
       // create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        user.password = passwordHash;
    }
  }
  if(active){
    user.active = active;
  }
  if(nivel) {
    user.nivel = nivel
  }
  await user.save()
  console.log(user, "user model")
  console.log(username, password, confirmpassword, active, nivel, "parametros")
  res.status(203).json({message: "user updated success!"})

}