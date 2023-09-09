"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterResultVote = void 0;
const axios_1 = __importDefault(require("axios"));
const token = process.env.TOKEN_INTERLEGIS;
const url = process.env.URL_INTERLEGIS;
const RegisterResultVote = async (req, res) => {
    const { sessionId, voteResParl, numero_votos_sim, numero_votos_nao, numero_abstencoes, observacao, ip, tipo_resultado_votacao, materia, ordem, expediente, user } = req.body;
    let matter = {
        numero_votos_sim,
        numero_votos_nao,
        numero_abstencoes,
        observacao,
        ip,
        tipo_resultado_votacao,
        materia,
        ordem,
        expediente,
        user
    };
    const response = await axios_1.default.post(`${url}/api/sessao/registrovotacao/`, matter, {
        headers: {
            'Authorization': `Token${token}`
        }
    });
    // 
    //   response.data, "Requisião response do valor ")
    let respo;
    if (response.data.id) {
        for (let par of voteResParl) {
            let data = {
                voto: par.voto,
                ip: "",
                votacao: response.data.id,
                parlamentar: par.id,
                user: 12,
                ordem: ordem,
                expediente: null
            };
            // console.log(data, "data teste")
            respo = await axios_1.default.post(`${url}/api/sessao/votoparlamentar/`, data, {
                headers: {
                    'Authorization': `Token${token}`
                }
            });
            // console.log(respo.data, "respo do voto de cada")
        }
    }
    console.log(respo, "respo ");
    res.status(200).json({ message: "ok, registro com sucesso" });
};
exports.RegisterResultVote = RegisterResultVote;
