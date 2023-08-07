import axios from "axios"
import { Request, Response } from "express"
import Painel from "../../models/PanelModel"

export const PatchPainel = async (req:Request, res:Response) => {
  const { estado, tela, materia, message, registro } = req.body as any
  const { id } = req.params as any
  const tokenInterlegis = process.env.TOKEN_INTERLEGIS

  const response = await Painel.findByIdAndUpdate({ _id: id}, {
    estado: estado,
    tela:tela,
    materia: materia,
    message: message,
    registro: registro
  })

  res.status(200).json({response, message: "ok "})
}