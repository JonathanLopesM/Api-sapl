import axios from "axios"
import { Request, Response } from "express"
import Painel from "../../models/PanelModel"

export const PatchPainel = async (req:Request, res:Response) => {
  const { estado, tela, materia } = req.body as any
  const { id } = req.params as any
  const tokenInterlegis = process.env.TOKEN_INTERLEGIS

  console.log(id)

  const response = await Painel.findByIdAndUpdate({ _id: id}, {
    estado: estado,
    tela:tela,
    materia: materia
  })

  if(tela === 0){
    res.status(200).json({message: "ok "})
  }
  if(tela === 1){
    console.log("buscar os parlamentares e votos deles")

    res.status(200).json({response, message: "parlamentares e seus votos  "})
  }
  if(tela === 2){
    console.log("resultado de votaçao")

    res.status(200).json({response, message: "resultado de votaçao"})
  }

}