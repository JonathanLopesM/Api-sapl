import VoteModel from "../../models/VoteModel"

export const GetUserId = async (req, res) => {
  const {id} = req.params 
  const response = await VoteModel.findOne({id:id})

  res.status(200).json(response)
}