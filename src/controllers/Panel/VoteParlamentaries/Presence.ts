import VoteModel from "../../../models/VoteModel"


export const Presence = async (req, res) => {
  const { user } = req.params 
  const { presence } = req.body

  if(!!presence){
    res.status(404).json({message: "Presença não foi cadastrada!"})
  }
  const response = await VoteModel.findOneAndUpdate({user:user}, {
    presenca: presence
  })

  res.status(200).json({message: `ok`, response})
}