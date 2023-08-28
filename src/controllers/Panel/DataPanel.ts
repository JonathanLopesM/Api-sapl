import axios from "axios"
import { Request, Response } from "express"
import Painel from "../../models/PanelModel"

export const DataPanel = async (req:Request, res:Response) => {
  const { estado, tela, materia } = req.body as any
  const tokenInterlegis = process.env.TOKEN_INTERLEGIS

  const state = new Painel({
    estado: estado, 
    tela:tela
  })
  await state.save()
  
  
  if(tela === 0){
    res.status(200).json({message: `tela ${tela}`})
  }
  if(tela === 1){
    res.status(200).json({message: `tela ${tela}`})
  }
  if(tela === 2){
    res.status(200).json({message: `tela ${tela}`})
  }

}