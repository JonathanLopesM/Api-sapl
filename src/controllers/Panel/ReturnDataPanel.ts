import axios from "axios"
import express,{ Request, Response } from "express"
import PanelModel from "../../models/PanelModel"

import VoteModel from "../../models/VoteModel";
import { io } from "../../server";
import { Socket } from "socket.io";



export const ReturnPainelDados = async (req:Request, res:Response) => {
  const { id } = req.params;

  const statePanel = await PanelModel.findOne();
  console.log(statePanel, 'painel')
  const { _id, tela, estado, materia} = statePanel;
  console.log(_id,tela, estado, materia,"painel");

        let dados= {};
        if(tela === 0){
          let obj = {
            idPanel: _id,
            tela, 
            estado,
            materia,
            view :'Bem vindos a casa do Povo!',
          };
          dados = obj
          res.status(200).json(dados)
        }
        if(tela === 1){
          const stateVote = await VoteModel.find()
        
          dados = {
                  idPanel: _id,
                    tela:tela,
                    estado,
                    materia,
                    stateVote
                  }
          res.status(200).json(dados)
        }
        if(tela === 2){
          const stateVote = await VoteModel.find()
          console.log(stateVote, 'votes')
          let votou;
          let NVotou;
          let Abster;
          
           dados = {
            idPanel: _id,
            tela:tela,
            estado,
            materia
          }
           res.status(200).json(dados)
        }
        if(tela === 3){
          
          dados = {
           tela:tela,
           estado,
           materia
         }
          res.status(200).json(dados)
       }
       if(tela === 4){
          
        dados = {
         tela:tela,
         estado,
         materia
       }
        res.status(200).json(dados)
     }
        

}