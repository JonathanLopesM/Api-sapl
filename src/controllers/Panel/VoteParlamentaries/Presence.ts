import VoteModel from "../../../models/VoteModel"


export const Presence = async (req, res) => {
  const { user } = req.params 
  const { presence } = req.body
  console.log(user, presence, "user e presence")

  if(presence == null || presence == undefined){
    res.status(404).json({message: "Presença não foi cadastrada!"})
  }
  const response = await VoteModel.findOneAndUpdate({user:user}, {
    presenca: presence
  })

  res.status(200).json({message: `ok`, response})
}