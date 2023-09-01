import PanelModel from "../../../models/PanelModel";
import VoteModel from "../../../models/VoteModel";

export const ReturnVotes = async (req, res) => {
  const responseVote = await VoteModel.find()
  const statePanel = await PanelModel.findOne();

  const { _id, tela, estado, materia} = statePanel;

  const NVote = responseVote.filter(parl => {
    if(parl.presenca === true){
      return parl.voto == 'Não Votou'
    }
    return
  })
  const Yes = responseVote.filter(parl => {
    return parl.voto == 'Sim'
  })
  const Not = responseVote.filter(parl => {
    return parl.voto == 'Não'
  })
  const abstain = responseVote.filter(parl => {
    return parl.voto == 'Abster'
  })
  const Presence = responseVote.filter(parl => {
    return parl.presenca == true
  })

  const totalVotes = NVote.length + Yes.length + Not.length

  const response = {
    NVote: NVote.length,
    Yes: Yes.length,
    Not: Not.length,
    abstain: abstain.length,
    Presence: Presence.length,
    totalVotes,
    idPanel: _id,
    tela:tela,
    estado,
    materia,
  }
  return res.status(200).json({ response, responseVote })
}