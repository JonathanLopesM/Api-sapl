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
    const matter = {
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
    try {
        const response = await axios_1.default.post(`${url}/api/sessao/registrovotacao/`, matter, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        if (response.data.id) {
            const votePromises = voteResParl.map(async (par) => {
                const data = {
                    voto: par.voto,
                    ip: "",
                    votacao: response.data.id,
                    parlamentar: par.id,
                    user: 12,
                    ordem,
                    expediente: null
                };
                return axios_1.default.post(`${url}/api/sessao/votoparlamentar/`, data, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
            });
            await Promise.all(votePromises);
        }
        res.status(200).json({ message: "ok, registro com sucesso" });
    }
    catch (error) {
        console.error(error, "Erro durante o registro");
        res.status(500).json({ message: "Erro durante o registro" });
    }
};
exports.RegisterResultVote = RegisterResultVote;
