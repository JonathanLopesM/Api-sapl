import express,{ Request, Response } from "express";
import PanelModel from "../../models/PanelModel";
import VoteModel from "../../models/VoteModel";
import DiscourseModel from "../../models/DiscourseModel";
import axios from "axios";

const url = process.env.URL_INTERLEGIS

export const ReturnPainelDados = async (req:Request, res:Response) => {
  const { id } = req.params;
  const statePanel = await PanelModel.findOne();
  const { _id, tela, estado, materia, message, registro} = statePanel;

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
            registro
          };
          dados = obj
          res.status(200).json(dados)
        }
        if(tela === 1){
          // presença e votação
          const stateVote = await VoteModel.find()
          let result;
          let matter;
          if(materia){
            const respo = await axios.get(`${url}/api/materia/materialegislativa/${materia}`)
            matter = respo.data
          }
          if(registro){
            const resultResp = await axios.get(`${url}/api/sessao/ordemdia/?materia=6041`)
            result = resultResp.data.results[0]
          }
          
          const NVote = stateVote.filter(parl => {
            return parl.voto == 'Não Votou'
          })
          const Yes = stateVote.filter(parl => {
            return parl.voto == 'Sim'
          })
          const Not = stateVote.filter(parl => {
            return parl.voto == 'Não'
          })
          const Presence = stateVote.filter(parl => {
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
                    materia: matter,
                    message,
                    stateVote,
                    response,
                    registro,
                    result
                  }
          res.status(200).json(dados)
        }
        if(tela === 2){
          const responseVote = await VoteModel.find()
          let matter;
          if(materia){
            const respo = await axios.get(`${url}/api/materia/materialegislativa/${materia}`)
            matter = respo.data
          }

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
            materia: matter,
            message,
            response,
            registro
          }
           res.status(200).json(dados)
        }
        if(tela === 3){

          const speechParl = await DiscourseModel.findOne()
          let matter;
          if(materia){
            const respo = await axios.get(`${url}/api/materia/materialegislativa/${materia}`)
            matter = respo.data
          }
          
          dados = {
            idPanel: _id,
           tela:tela,
           estado,
           materia: matter,
           message,
           speechParl,
           registro
         }
         
          res.status(200).json(dados)
       }
       if(tela === 4){
        let matter;
        if(materia){
          const respo = await axios.get(`${url}/api/materia/materialegislativa/${materia}`)
          matter = respo.data
        }
          
        dados = {
          idPanel: _id,
         tela:tela,
         estado,
         materia: matter,
         message,
         registro
         }
        res.status(200).json(dados)
       }
      if(tela === 5){
        let matter;
        if(materia){
          const respo = await axios.get(`${url}/api/materia/materialegislativa/${materia}`)
          matter = respo.data
        }
        dados = {
          idPanel: _id,
        tela:tela,
        estado,
        materia:matter,
        message,
        registro
      }
        res.status(200).json(dados)
      }
      if(tela === 6){
        let matter;
        if(materia){
          const respo = await axios.get(`${url}/api/materia/materialegislativa/${materia}`)
          matter = respo.data
        }
        dados = {
          idPanel: _id,
         tela:tela,
         estado,
         materia:matter,
         message,
         registro
         }
          res.status(200).json(dados)
        }
          

}