"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSessoes = void 0;
const axios_1 = __importDefault(require("axios"));
const GetSessoes = async (req, res) => {
    const { id } = req.params;
    const url = process.env.URL_INTERLEGIS;
    const responseMatter = await axios_1.default.get(`${url}/api/sessao/ordemdia/?o=-data_ordem&&sessao_plenaria=${id}&&page_size=30`);
    let mattersDefinitive = [];
    let arrayMatter = responseMatter.data.results;
    for (let matter of arrayMatter) {
        await axios_1.default.get(`${url}/api/materia/materialegislativa/${matter.materia}`)
            .then(respo => {
            mattersDefinitive.push({
                id: respo.data.id,
                __str__: respo.data.__str__,
                metadata: respo.data.metadata,
                numero: respo.data.numero,
                ano: respo.data.ano,
                numero_protocolo: respo.data.numero_protocolo,
                data_apresentacao: respo.data.data_apresentacao,
                tipo_apresentacao: respo.data.tipo_apresentacao,
                data_publicacao: respo.data.data_publicacao,
                numero_origem_externa: respo.data.numero_origem_externa,
                ano_origem_externa: respo.data.ano_origem_externa,
                data_origem_externa: respo.data.data_origem_externa,
                apelido: respo.data.apelido,
                dias_prazo: respo.data.dias_prazo,
                data_fim_prazo: respo.data.data_fim_prazo,
                em_tramitacao: respo.data.em_tramitacao,
                polemica: respo.data.polemica,
                objeto: respo.data.objeto,
                complementar: respo.data.complementar,
                ementa: respo.data.ementa,
                indexacao: respo.data.indexacao,
                texto_original: respo.data.texto_original,
                data_ultima_atualizacao: respo.data.data_ultima_atualizacao,
                ip: respo.data.ip,
                ultima_edicao: respo.data.ultima_edicao,
                tipo: respo.data.tipo,
                regime_tramitacao: respo.data.regime_tramitacao,
                tipo_origem_externa: respo.data.tipo_origem_externa,
                local_origem_externa: respo.data.local_origem_externa,
                user: respo.data.user,
                anexadas: respo.data.anexadas,
                autores: respo.data.autores,
                matterId: matter.id,
                matterStr: matter.__str__,
                resultado: matter.resultado,
                numero_ordem: matter.numero_ordem,
                registro_aberto: matter.registro_aberto,
                sessao_plenaria: matter.sessao_plenaria,
                materia: matter.materia,
                tramitacao: matter.tramitacao,
                data_ordem: matter.data_ordem,
                observacao: matter.observacao
            });
        });
    }
    // console.log(mattersDefinitive, "mater respo")
    res.status(200).json(mattersDefinitive);
};
exports.GetSessoes = GetSessoes;
