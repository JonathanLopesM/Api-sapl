"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSessoes = void 0;
const axios_1 = __importDefault(require("axios"));
const GetSessoes = async (req, res) => {
    try {
        const { id } = req.params;
        const url = process.env.URL_INTERLEGIS;
        const responseMatter = await axios_1.default.get(`${url}/api/sessao/ordemdia/?o=-data_ordem&&sessao_plenaria=${id}&&page_size=30`);
        const arrayMatter = responseMatter.data.results;
        const mattersDefinitive = await Promise.all(arrayMatter.map(async (matter) => {
            const respo = await axios_1.default.get(`${url}/api/materia/materialegislativa/${matter.materia}`);
            const data = respo.data;
            return {
                id: data.id,
                __str__: data.__str__,
                metadata: data.metadata,
                numero: data.numero,
                ano: data.ano,
                numero_protocolo: data.numero_protocolo,
                data_apresentacao: data.data_apresentacao,
                tipo_apresentacao: data.tipo_apresentacao,
                data_publicacao: data.data_publicacao,
                numero_origem_externa: data.numero_origem_externa,
                ano_origem_externa: data.ano_origem_externa,
                data_origem_externa: data.data_origem_externa,
                apelido: data.apelido,
                dias_prazo: data.dias_prazo,
                data_fim_prazo: data.data_fim_prazo,
                em_tramitacao: data.em_tramitacao,
                polemica: data.polemica,
                objeto: data.objeto,
                complementar: data.complementar,
                ementa: data.ementa,
                indexacao: data.indexacao,
                texto_original: data.texto_original,
                data_ultima_atualizacao: data.data_ultima_atualizacao,
                ip: data.ip,
                ultima_edicao: data.ultima_edicao,
                tipo: data.tipo,
                regime_tramitacao: data.regime_tramitacao,
                tipo_origem_externa: data.tipo_origem_externa,
                local_origem_externa: data.local_origem_externa,
                user: data.user,
                anexadas: data.anexadas,
                autores: data.autores,
                matterId: matter.id,
                matterStr: matter.__str__,
                resultado: matter.resultado,
                numero_ordem: matter.numero_ordem,
                registro_aberto: matter.registro_aberto,
                sessao_plenaria: matter.sessao_plenaria,
                materia: matter.materia,
                tramitacao: matter.tramitacao,
                data_ordem: matter.data_ordem,
                observacao: matter.observacao,
            };
        }));
        res.status(200).json(mattersDefinitive);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
};
exports.GetSessoes = GetSessoes;
