import axios from "axios"
import { Request, Response } from "express"
import Painel from "../../models/PanelModel"

export const PatchPainel = async (req:Request, res:Response) => {
  const { estado, tela, materia, message } = req.body as any
  const { id } = req.params as any
  const tokenInterlegis = process.env.TOKEN_INTERLEGIS

  const response = await Painel.findByIdAndUpdate({ _id: id}, {
    estado: estado,
    tela:tela,
    materia: materia,
    message: message
  })

  if(tela === 0){
    res.status(200).json({message: "ok "})
  }
  if(tela === 1){

    res.status(200).json({response, message: "parlamentares e seus votos  "})
  }
  if(tela === 2){

    res.status(200).json({response, message: "resultado de votaçao"})
  }
  if(tela === 3){

    res.status(200).json({response, message: "Discurso"})
  }
  if(tela === 4){

    res.status(200).json({response, message: "Silêncio"})
  }
  if(tela === 5){

    res.status(200).json({response, message: "painel Mensagem"})
  }

}