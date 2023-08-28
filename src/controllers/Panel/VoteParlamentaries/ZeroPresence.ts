import PanelModel from "../../../models/PanelModel";
import VoteModel from "../../../models/VoteModel";


export const ZeroPresence = async (req, res) => {

  await VoteModel.updateMany({
    presenca: false,
    voto: "Não votou"
  })
  const statePanel = await PanelModel.findOne();

  if(statePanel.materia){
    statePanel.materia= undefined
  }
  if(statePanel.registro){
    statePanel.registro= false
  }
  statePanel.save()
  
  res.status(200).json({ message: "ok" })
}