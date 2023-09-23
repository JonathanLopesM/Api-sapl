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
        // Obter informações completas do parlamentar
        const completParl = await axios_1.default.get(`${url}/api/parlamentares/parlamentar/${id}`);
        const parlamentarData = completParl.data;
        // Obter informações do mandato do parlamentar
        const mandatoData = await axios_1.default.get(`${url}/api/parlamentares/mandato/?parlamentar=${id}`);
        const mandato = mandatoData.data.results[0];
        // Obter informações da legislatura
        const legislaturaData = await axios_1.default.get(`${url}/api/parlamentares/legislatura/${mandato.legislatura}`);
        const legislatura = legislaturaData.data;
        // Obter informações do autor
        const autorData = await axios_1.default.get(`${url}/api/base/autor/?object_id=${id}`);
        const autor = autorData.data.results[0].id;
        // Construir a resposta
        const response = {
            ...parlamentarData,
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
