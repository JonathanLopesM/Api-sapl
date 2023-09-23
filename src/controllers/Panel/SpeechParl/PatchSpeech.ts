import DiscourseModel from "../../../models/DiscourseModel"

export const PatchSpeech = async (req, res) => {
  const { idparams } = req.params
  const { id, name, fotografia, presenca,
    speechTime, speechTimeInit, speechTimeInitBoolean, 
    partTime, partTimeInit, partTimeInitBoolean,orderQuestionTime, orderQuestionTimeInit,orderQuestionTimeInitBoolean, 
    finalConsiderationsTime,finalConsiderationsTimeInit,finalConsiderationsTimeInitBoolean,
    soundPlay 
  } = req.body as any

  console.log(idparams, 'id:', id, 'idsREcebidos')
    
    const response = await DiscourseModel.findOne({ _id: idparams})
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
    //Cronometro Discurso
    if(speechTime !== undefined){
      response.speechTime = speechTime;
    }
    if(speechTimeInit){
      response.speechTimeInit = speechTimeInit;
    }
    if(speechTimeInitBoolean !== undefined){
      response.speechTimeInitBoolean = speechTimeInitBoolean;
    }
    //Cronometro Aparte
    if(partTime !== undefined){
      response.partTime = partTime;
    }
    if(partTimeInit){
      response.partTimeInit = partTimeInit;
    }
    if(partTimeInitBoolean !== undefined){
      response.partTimeInitBoolean = partTimeInitBoolean;
    }
    // orderQuestionTime, orderQuestionTimeInit,orderQuestionTimeInitBoolean
    if(orderQuestionTime !== undefined){
      response.orderQuestionTime =orderQuestionTime
    }
    if(orderQuestionTimeInit){
      response.orderQuestionTimeInit =orderQuestionTimeInit
    }
    if(orderQuestionTimeInitBoolean !== undefined){
      response.orderQuestionTimeInitBoolean =orderQuestionTimeInitBoolean
    }
    // finalConsiderationsTime,finalConsiderationsTimeInit, sinalSonoro ,finalConsiderationsTimeInitBoolean
    if(finalConsiderationsTime !== undefined){
      response.finalConsiderationsTime =finalConsiderationsTime
    }
    if(finalConsiderationsTimeInit){
      response.finalConsiderationsTimeInit =finalConsiderationsTimeInit
    }
    if(finalConsiderationsTimeInitBoolean !== undefined){
      response.finalConsiderationsTimeInitBoolean = finalConsiderationsTimeInitBoolean
    }
    if(soundPlay !== undefined){
      response.soundPlay = soundPlay
    }

    await response.save()

  res.status(200).json({ message: "ok atualizou", response})
}