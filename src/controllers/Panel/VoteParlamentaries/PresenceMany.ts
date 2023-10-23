import VoteModel from "../../../models/VoteModel"


export const PresenceMany = async (req, res) => {
  const { presence } = req.body

  console.log( presence, 'user e presenca')
  if(presence == null || presence == undefined){
    res.status(404).json({message: "Presença não foi cadastrada!"})
  }
  const response = await VoteModel.updateMany({
    presenca: presence
  })

  res.status(200).json({message: `ok`, response})
}