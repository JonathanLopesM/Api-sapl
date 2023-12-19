import DiscourseModel from "../../../models/DiscourseModel";


export const GetSpeech = async (req, res) => {

  const response = await DiscourseModel.find()
  if(!response ){
    const newDisco = new DiscourseModel(
      {
        "id": 100,
        "name": "Usuário",
        "fotografia": "http://votacao.novace.com.br/novace_logo.png",
        "speechTime": false,
        "speechTimeInit": 450,
        "__v": 0,
        "presenca": false,
        "speechTimeInitBoolean": false,
        "partTime": false,
        "partTimeInit": 120,
        "partTimeInitBoolean": false,
        "orderQuestionTime": false,
        "orderQuestionTimeInit": 60,
        "orderQuestionTimeInitBoolean": false,
        "finalConsiderationsTime": false,
        "finalConsiderationsTimeInit": 300,
        "finalConsiderationsTimeInitBoolean": false,
        "soundPlay": false
    })
    await newDisco.save()
  }

  res.status(200).json({ message: "get response message", response})
}