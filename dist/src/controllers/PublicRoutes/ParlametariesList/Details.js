"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Details = void 0;
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
async function Details(req, res) {
    try {
        const { id } = req.params;
        // Fazer todas as chamadas em paralelo
        const [completParlResponse, mandatoResponse, autorResponse] = await Promise.all([
            axios_1.default.get(`${url}/api/parlamentares/parlamentar/${id}`),
            axios_1.default.get(`${url}/api/parlamentares/mandato/?parlamentar=${id}`),
            axios_1.default.get(`${url}/api/base/autor/?object_id=${id}`),
        ]);
        const parlamentarData = completParlResponse.data;
        const mandato = mandatoResponse.data.results[0];
        const autor = autorResponse.data.results[0].id;
        // Obter informações da legislatura
        const legislaturaData = await axios_1.default.get(`${url}/api/parlamentares/legislatura/${mandato.legislatura}`);
        const legislatura = legislaturaData.data;
        // Construir a resposta
        const response = {
            __str__: parlamentarData.__str__,
            nome_completo: parlamentarData.nome_completo,
            nome_parlamentar: parlamentarData.nome_parlamentar,
            fotografia: parlamentarData.fotografia,
            sexo: parlamentarData.sexo,
            email: parlamentarData.email,
            voto_recebidos: mandato.votos_recebidos,
            titular: mandato.titular,
            legislatura: legislatura.__str__,
            autor: autor,
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
}
exports.Details = Details;
