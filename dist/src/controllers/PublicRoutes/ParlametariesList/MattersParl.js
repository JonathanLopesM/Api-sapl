"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MattersParlAutor = void 0;
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
const MattersParlAutor = async (req, res) => {
    try {
        const { parlId, page, selectedValue, year, number, perPage } = req.query;
        const getUrl = `${url}/api/materia/materialegislativa/?autores=${parlId}&page=${page}&tipo=${selectedValue ? selectedValue : ''}&numero=${number ? number : ''}&ano=${year ? year : ''}&page_size=${perPage}`;
        const materiasResponse = await axios_1.default.get(getUrl);
        const pagination = materiasResponse.data.pagination;
        const materias = materiasResponse.data.results;
        res.status(200).json({ pagination, materias });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
};
exports.MattersParlAutor = MattersParlAutor;
