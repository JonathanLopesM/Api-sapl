"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const PORT = 3333;
const CreateAuthUser_1 = require("./controllers/Users/CreateAuthUser");
const Login_1 = require("./controllers/Login");
const DataPanel_1 = require("./controllers/Panel/DataPanel");
const PatchPanel_1 = require("./controllers/Panel/PatchPanel");
const ReturnDataPanel_1 = require("./controllers/Panel/ReturnDataPanel");
const Voting_1 = require("./controllers/Panel/VoteParlamentaries/Voting");
const ReturnVotes_1 = require("./controllers/Panel/VoteParlamentaries/ReturnVotes");
const GetUsers_1 = require("./controllers/Users/GetUsers");
const GetUserId_1 = require("./controllers/Users/GetUserId");
const Presence_1 = require("./controllers/Panel/VoteParlamentaries/Presence");
const SpeechParl_1 = require("./controllers/Panel/SpeechParl");
const DeleteUser_1 = require("./controllers/Users/DeleteUser");
const UpdatedUser_1 = require("./controllers/Users/UpdatedUser");
const GetSpeech_1 = require("./controllers/Panel/SpeechParl/GetSpeech");
const PatchSpeech_1 = require("./controllers/Panel/SpeechParl/PatchSpeech");
const GetSessoes_1 = require("./controllers/Sessoes/GetSessoes");
const Materias_1 = require("./controllers/Materias");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
app.get("/", (req, res) => {
    return res.json({ message: "welcome api Novace 1.0.2" });
});
//LOGIN users
app.post("/auth/login", Login_1.Login);
//Create User
app.post("/auth/users", CreateAuthUser_1.CreateAuthUser);
app.get("/auth/users", GetUsers_1.GetUsers);
app.patch("/auth/users/:id", UpdatedUser_1.UpdatedUser);
app.delete("/auth/users/:id", DeleteUser_1.DeleteUser);
//Control Panel
app.post("/painel/dados", DataPanel_1.DataPanel);
app.get("/painel/dados", ReturnDataPanel_1.ReturnPainelDados);
app.patch("/painel/dados/:id", PatchPanel_1.PatchPainel);
// Socket io - Return do dados Sockets 
//Voting
app.get("/parl/vote", ReturnVotes_1.ReturnVotes);
app.get("/parl/vote/:id", GetUserId_1.GetUserId);
app.patch("/parl/vote/:user", Voting_1.Voting);
app.patch("/parl/presence/:user", Presence_1.Presence);
app.post("/speech/timer", SpeechParl_1.SpeechParl);
app.get("/speech/timer", GetSpeech_1.GetSpeech);
app.patch("/speech/timer/:idparams", PatchSpeech_1.PatchSpeech);
app.get("/api/sessao/sessaoplenaria/", GetSessoes_1.GetSessoes);
app.get("/api/materia/materialegislativa/", Materias_1.GetMaterias);
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
mongoose_1.default.connect(process.env.DB_URL)
    .then(() => {
    server.listen(PORT);
    console.log(`Success Conected database on ${PORT}`);
}).catch((err) => {
    console.log('Erro especificado a baixo');
    console.log(err);
});
