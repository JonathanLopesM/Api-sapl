import votingModel from "../../../models/votingModel"


export const Voting = async (req, res) => {
  const { user } = req.params 
  const { voto } = req.body
  // console.log(user, 'id do votante')
  const response = await votingModel.findOneAndUpdate({user:user}, {
    voto: voto
  })
  console.log(response, 'response do voto')  

  res.status(200).json({message: `ok`, response})
}