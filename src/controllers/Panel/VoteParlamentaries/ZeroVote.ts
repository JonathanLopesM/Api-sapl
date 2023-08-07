import PanelModel from "../../../models/PanelModel";
import VoteModel from "../../../models/VoteModel";


export const ZeroVote = async (req, res) => {

  await VoteModel.updateMany({
    voto: "Não votou"
  })
  const statePanel = await PanelModel.findOne();

  // consnt { _id, tela, estado, materia, message, registro} = statePanel;
  if(statePanel.materia){
    statePanel.materia= undefined
  }
  if(statePanel.registro){
    statePanel.registro= false
  }

  statePanel.save()
  
  res.status(200).json({ message: "ok" })
}