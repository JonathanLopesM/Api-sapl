import DiscourseModel from "../../../models/DiscourseModel"


export const SpeechParl = async (req, res) => {
  const { id,
    user,
    name,
    fotografia,
    presenca,
    speechTime,
    speechTimeInit, } = req.body as any
    
    const response = new DiscourseModel({
      id,
      name,
      fotografia,
      presenca,
      speechTime,
      speechTimeInit})

      await response.save()


  res.status(200).json({ message: "ok atualizou", response})
}