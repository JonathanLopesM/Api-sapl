import DiscourseModel from "../../../models/DiscourseModel";


export const GetSpeech = async (req, res) => {

  const response = await DiscourseModel.findOne()

  res.status(200).json({ message: "get response message", response})
}