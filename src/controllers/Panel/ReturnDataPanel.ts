import axios from "axios"
import { Request, Response } from "express"
import PanelModel from "../../models/PanelModel"

import VoteModel from "../../models/VoteModel";

export const ReturnPainelDados = async (req:Request, res:Response) => {
  const { id } = req.params;

  const statePanel = await PanelModel.findOne()
  


  const { tela, estado, materia} = statePanel
  console.log(tela, estado, materia,"painel")

  if(tela === 0){
    res.status(200).json({message: `Bem vindos a casa do Povo!`})
  }
  if(tela === 1){
    const stateVote = await VoteModel.find()
    console.log(stateVote, 'votante')
    res.status(200).json({message: `tela ${tela}`, stateVote})
  }
  if(tela === 2){
    res.status(200).json({message: `tela ${tela}`})
  }
   

}