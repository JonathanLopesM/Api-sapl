import express,{ Request, Response } from "express";
import PanelModel from "../../models/PanelModel";

import VoteModel from "../../models/VoteModel";


export const ReturnPainelDados = async (req:Request, res:Response) => {
  const { id } = req.params;

  const statePanel = await PanelModel.findOne();

  const { _id, tela, estado, materia, message} = statePanel;

      let dados= {};
        
        if(tela === 0){
          //bem vindos a casa do Povo
          let obj = {
            idPanel: _id,
            tela, 
            estado,
            materia,
            message,
            view :'Bem vindos a casa do Povo!',
          };
          dados = obj
          res.status(200).json(dados)
        }
        if(tela === 1){
          // presença e votação
          const stateVote = await VoteModel.find()
        
          dados = {
                  idPanel: _id,
                    tela:tela,
                    estado,
                    materia,
                    message,
                    stateVote
                  }
          res.status(200).json(dados)
        }
        if(tela === 2){
          const responseVote = await VoteModel.find()

          const NVote = responseVote.filter(parl => {
            return parl.voto == 'Não Votou'
          })
          const Yes = responseVote.filter(parl => {
            return parl.voto == 'Sim'
          })
          const Not = responseVote.filter(parl => {
            return parl.voto == 'Não'
          })
          const Presence = responseVote.filter(parl => {
            return parl.presenca == true
          })
          const totalVotes = NVote.length + Yes.length + Not.length

          const response = {
            NVote: NVote.length,
            Yes: Yes.length,
            Not: Not.length,
            Presence: Presence.length,
            totalVotes
          }
           dados = {
            idPanel: _id,
            tela:tela,
            estado,
            materia,
            message,
            response
          }
           res.status(200).json(dados)
        }
        if(tela === 3){
          
          dados = {
            idPanel: _id,
           tela:tela,
           estado,
           materia,
           message
         }
          res.status(200).json(dados)
       }
       if(tela === 4){
          
        dados = {
          idPanel: _id,
         tela:tela,
         estado,
         materia,
         message
         }
        res.status(200).json(dados)
       }
      if(tela === 5){
            
        dados = {
          idPanel: _id,
        tela:tela,
        estado,
        materia,
        message
      }
        res.status(200).json(dados)
      }
      if(tela === 6){
          
        dados = {
          idPanel: _id,
         tela:tela,
         estado,
         materia
         }
          res.status(200).json(dados)
        }
          

}