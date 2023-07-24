import DiscourseModel from "../../../models/DiscourseModel"


export const PatchSpeech = async (req, res) => {
  const { idparams } = req.params
  const { id,
    name,
    fotografia,
    presenca,
    speechTime,
    speechTimeInit,
    speechTimeInitBoolean } = req.body as any
    console.log(
      idparams, id,
      name,
      fotografia,
      presenca,
      speechTime,
      speechTimeInit,
      speechTimeInitBoolean, "_id vindo na req"
    )
    const response = await DiscourseModel.findOne({ _id: idparams})
    console.log(response, "dados de valore");
    if(id){
      response.id = id;
    }
    if(name){
      response.name= name;
    }
    if(fotografia){
     response.fotografia = fotografia;
    }
    if(presenca !== undefined){
      response.presenca = presenca;
    }
    if(speechTime !== undefined){
      console.log(speechTime, "speech dentro app")
      response.speechTime = speechTime;
    }
    if(speechTimeInit){
      response.speechTimeInit = speechTimeInit;
    }
    if(speechTimeInitBoolean){
      response.speechTimeInitBoolean = speechTimeInitBoolean;
    }
   
    await response.save()


  res.status(200).json({ message: "ok atualizou", response})
}