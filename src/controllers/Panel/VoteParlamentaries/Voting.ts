import VoteModel from "../../../models/VoteModel"


export const Voting = async (req, res) => {
  const { user } = req.params 
  const { voto, presenca } = req.body
  // console.log(user, 'id do votante')
  if(!presenca){
    res.status(404).json({message: "É preciso estar presente para votar"})
  }
  const response = await VoteModel.findOneAndUpdate({user:user}, {
    presenca: presenca,
    voto: voto
    
  })

  res.status(200).json({message: `ok`, response})
}