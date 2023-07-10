import VoteModel from "../../../models/VoteModel"


export const Voting = async (req, res) => {
  const { user } = req.params 
  const { voto } = req.body
  // console.log(user, 'id do votante')
  const response = await VoteModel.findOneAndUpdate({user:user}, {
    voto: voto
  })

  res.status(200).json({message: `ok`, response})
}