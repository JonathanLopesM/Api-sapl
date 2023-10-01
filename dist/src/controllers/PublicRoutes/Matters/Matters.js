"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MattersLegislationFilter = void 0;
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
const MattersLegislationFilter = async (req, res) => {
    try {
        const { page, type, number, subject, year } = req.query;
        // Construa a URL da API com os parâmetros
        const apiUrl = `${url}/api/materia/materialegislativa/?o=-data_apresentacao&page=${page ? page : ''}&tipo=${type ? type : ''}&ementa=${subject ? subject : ''}&numero=${number || ''}&ano=${year ? year : ''}`;
        // console.log(apiUrl);
        // Faça a chamada à API principal
        const materias = await axios_1.default.get(apiUrl);
        // Extrair dados das matérias
        const results = await Promise.all(materias.data.results.map(async (matter) => {
            const autor = await axios_1.default.get(`${url}/api/materia/autoria/?materia=${matter.id}`);
            const autoresArray = autor.data.results.map((autores) => {
                const nameArray = autores.__str__.split(" - ");
                return {
                    id: autores.id,
                    name: nameArray[0],
                    __str__: autores.__str__,
                    primeiro_autor: autores.primeiro_autor,
                    autor: autores.autor,
                    materia: autores.materia,
                };
            });
            return {
                id: matter.id,
                __str__: matter.__str__,
                data_apresentacao: matter.data_apresentacao,
                numero: matter.numero,
                ano: matter.ano,
                ementa: matter.ementa,
                resultado: matter.resultado,
                texto_original: matter.texto_original,
                autores: autoresArray,
            };
        }));
        const response = {
            pagination: materias.data.pagination,
            results: results
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
};
exports.MattersLegislationFilter = MattersLegislationFilter;
