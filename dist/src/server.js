"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
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
const SaplVote_1 = require("./controllers/SaplVote");
const axios_1 = __importDefault(require("axios"));
const ZeroVote_1 = require("./controllers/Panel/VoteParlamentaries/ZeroVote");
const ParlametariesList_1 = require("./controllers/PublicRoutes/ParlametariesList");
const BoardOfDirect_1 = require("./controllers/PublicRoutes/BoardOfDirect");
const Matters_1 = require("./controllers/PublicRoutes/Matters");
const AdmLogin_1 = require("./controllers/AdmLogin");
const Details_1 = require("./controllers/PublicRoutes/ParlametariesList/Details");
const Todos_1 = require("./controllers/PublicRoutes/ParlametariesList/Todos");
const ZeroPresence_1 = require("./controllers/Panel/VoteParlamentaries/ZeroPresence");
const RegisterResultVote_1 = require("./controllers/RegisterResultVote");
const Matters_2 = require("./controllers/PublicRoutes/Matters/Matters");
const Legislation_1 = require("./controllers/PublicRoutes/Legislation");
const url = process.env.URL_INTERLEGIS;
const token = process.env.TOKEN_INTERLEGIS;
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    methods: '*', // Permitir todos os métodos
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
// export const io = new Server(server, {
//   cors: {
//   origin: '*', // Permitir todas as origens
//   methods: '*', // Permitir todos os métodos
//   }
// })
app.get("/", (req, res) => {
    return res.json({ message: "welcome api Novace 1.0.4" });
});
//LOGIN users
app.post("/auth/login", Login_1.Login);
//Login Admin
app.post("/auth/login/admin", AdmLogin_1.AdmLogin);
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
//Register Vote 
app.post("/api/sessao/registrovotacao/", RegisterResultVote_1.RegisterResultVote);
//timers speech
app.post("/speech/timer", SpeechParl_1.SpeechParl);
app.get("/speech/timer", GetSpeech_1.GetSpeech);
app.patch("/speech/timer/:idparams", PatchSpeech_1.PatchSpeech);
// ordem do dia Sessoes
app.get("/api/sessao/sessaoplenaria/:id", GetSessoes_1.GetSessoes);
//save vote on database and reload or cancel vote parl
app.post("/api/sessao/votacao", SaplVote_1.votesapl);
app.get("/api/sessao/zerar", ZeroVote_1.ZeroVote);
// save data vote 
app.get("/api/sessao/presencezero", ZeroPresence_1.ZeroPresence);
//Get materias legislativas 
app.get("/api/materia/", Materias_1.GetMaterias);
app.get("/api/materia/materialegislativa/", Matters_2.MattersLegislationFilter);
// Public Routes
app.get("/api/parlamentaries/list", ParlametariesList_1.ParlamentariesList);
app.get("/api/norma/legislativa", Legislation_1.Legislation);
//Teste PArl List
app.get("/api/parlamentaries/listodos", Todos_1.Todos);
app.get("/api/parlamentaries/details/:id", Details_1.Details);
app.get("/api/parlamentaries/board", BoardOfDirect_1.BoardOfDirect);
app.get("/api/materias/autoria/", Matters_1.MattersLegis);
// delete all votes database testing 
app.delete("/api/delete/massa/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // 1. Obtenha os votos parlamentares com base na ordem (id)
        const response = await axios_1.default.get(`${url}/api/sessao/votoparlamentar/?ordem=${id}&page_size=100`);
        console.log(response.data.results, "respo do delete");
        const Pars = response.data.results;
        // 2. Delete os votos parlamentares em paralelo
        await Promise.all(Pars.map(par => {
            return axios_1.default.delete(`${url}/api/sessao/votoparlamentar/${par.id}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
        }));
        res.status(200).json({ message: "ok delete " });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
});
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
