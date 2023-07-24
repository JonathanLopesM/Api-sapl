import UserModel from "../../models/UserModel"
import UserParlamModel from "../../models/UserParlamModel"


export const GetUsers = async (req, res) => {

  const response = await UserModel.find()
  const resParl = await UserParlamModel.find()

  res.status(200).json({response, resParl})
}