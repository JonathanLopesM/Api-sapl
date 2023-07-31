require('dotenv').config()
import express, { Request, Response} from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import socketIO, { Server, Socket } from "socket.io";
const PORT = 3333;

import checkToken from "./middlewares/CheckToken";

import { CreateAuthUser } from "./controllers/Users/CreateAuthUser";
import { Login } from "./controllers/Login";
import { DataPanel } from "./controllers/Panel/DataPanel";
import { PatchPainel } from "./controllers/Panel/PatchPanel";
import { ReturnPainelDados } from "./controllers/Panel/ReturnDataPanel";
import { Voting } from "./controllers/Panel/VoteParlamentaries/Voting";
import PanelModel from "./models/PanelModel";
import VoteModel from "./models/VoteModel";
import { ReturnVotes } from "./controllers/Panel/VoteParlamentaries/ReturnVotes";
import { GetUsers } from "./controllers/Users/GetUsers";
import { GetUserId } from "./controllers/Users/GetUserId";
import { Presence } from "./controllers/Panel/VoteParlamentaries/Presence";
import { SpeechParl } from "./controllers/Panel/SpeechParl";
import { DeleteUser } from "./controllers/Users/DeleteUser";
import { UpdatedUser } from "./controllers/Users/UpdatedUser";
import { GetSpeech } from "./controllers/Panel/SpeechParl/GetSpeech";
import { PatchSpeech } from "./controllers/Panel/SpeechParl/PatchSpeech";
import { GetSessoes } from "./controllers/Sessoes/GetSessoes";
import { GetMaterias } from "./controllers/Materias";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "welcome api Novace 1.0.3"});
})
//LOGIN users
app.post("/auth/login", Login)

//Create User
app.post("/auth/users", CreateAuthUser)
app.get("/auth/users", GetUsers)
app.patch("/auth/users/:id", UpdatedUser)
app.delete("/auth/users/:id", DeleteUser)



//Control Panel
app.post("/painel/dados", DataPanel)
app.get("/painel/dados", ReturnPainelDados)

app.patch("/painel/dados/:id", PatchPainel)
// Socket io - Return do dados Sockets 
//Voting

app.get("/parl/vote", ReturnVotes)
app.get("/parl/vote/:id", GetUserId)
app.patch("/parl/vote/:user", Voting)
app.patch("/parl/presence/:user", Presence)

app.post("/speech/timer", SpeechParl)
app.get("/speech/timer", GetSpeech )
app.patch("/speech/timer/:idparams", PatchSpeech)

app.get("/api/sessao/sessaoplenaria/", GetSessoes)

app.get("/api/materia/materialegislativa/", GetMaterias)
// io.on('connection', (socket: Socket) => {
//   console.log('Novo cliente conectado:', socket.id);
//   const transmitirDadosAtualizados = async () => {
//     try {
//       const statePanel = await PanelModel.findOne();
  
//       const { tela, estado, materia} = statePanel;
//       console.log(tela, estado, materia,"painel no io ");
    
//             let dados= {};
//             if(tela === 0){
//               let obj = {
//                 tela, 
//                 view :'Bem vindos a casa do Povo!',
//               };
//               dados = obj
//               socket.emit('dados-atualizados', dados);
//             }
//             if(tela === 1){
//               const stateVote = await VoteModel.find()
            
//               dados = {
//                 tela,
//                 stateVote
//               }
//               socket.emit("dados-atualizados", dados)
//             }
//             if(tela === 2){
              
//                dados = tela
//                socket.emit("dados-atualizados", dados)
//             }
//     }catch (error) {
//       console.error('Erro ao buscar dados atualizados:', error);
//       socket.emit('erro', 'Erro ao buscar dados atualizados');
//     }}

//     socket.on('obter-dados-atualizados', transmitirDadosAtualizados);

//   // Iniciar a transmissão dos dados atualizados quando o cliente se conectar
//   transmitirDadosAtualizados();

// // Lidar com desconexão do cliente
// socket.on('disconnect', () => {
// console.log('Cliente desconectado:', socket.id);
// });
// });
mongoose.connect(process.env.DB_URL)
.then(()=> {
server.listen(PORT)
  console.log(`Success Conected database on ${PORT}`)
}).catch((err) => {
  console.log('Erro especificado a baixo')
  console.log(err)
})

