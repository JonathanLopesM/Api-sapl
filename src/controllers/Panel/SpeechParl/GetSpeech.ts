import DiscourseModel from "../../../models/DiscourseModel";


export const GetSpeech = async (req, res) => {

  const response = await DiscourseModel.find()

  res.status(200).json({ message: "get response message", response})
}