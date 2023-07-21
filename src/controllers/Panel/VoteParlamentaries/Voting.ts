import VoteModel from "../../../models/VoteModel"


export const Voting = async (req, res) => {
  const { user } = req.params 
  const { voto, presenca } = req.body

  const response = await VoteModel.findOne({user:user})

  if(!response.presenca){
    res.status(404).json({message: "É preciso estar presente para votar"})
  }
  if(presenca){
    response.presenca = presenca
  }
  if(voto){
    response.voto = voto
  }
  await response.save()

  res.status(200).json({message: `ok`, response})
}