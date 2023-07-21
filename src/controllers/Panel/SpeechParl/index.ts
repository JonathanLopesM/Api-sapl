import DiscourseModel from "../../../models/DiscourseModel"


export const SpeechParl = async (req, res) => {
  const { id,
    user,
    name,
    fotografia,
    presenca,
    speechTime,
    speechTimeInit, } = req.body as any
    console.log(
      id,
    user,
    name,
    fotografia,
    presenca,
    speechTime,
    speechTimeInit
    )
    const response = new DiscourseModel({id,
      user,
      name,
      fotografia,
      presenca,
      speechTime,
      speechTimeInit})

  


  res.status(200).json({ message: "ok atualizou", response})
}