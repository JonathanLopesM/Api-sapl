"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardOfDirect = void 0;
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
const idtable = process.env.MESA_ATUAL;
const BoardOfDirect = async (req, res) => {
    try {
        const parlamentaresResponse = await axios_1.default.get(`${url}/api/parlamentares/parlamentar/search_parlamentares/?page_size=50`);
        const mesaDiretoraResponse = await axios_1.default.get(`${url}/api/parlamentares/composicaomesa/?mesa_diretora=${idtable}`);
        const parlamentares = parlamentaresResponse.data;
        const mesaDiretora = mesaDiretoraResponse.data.results;
        const response = parlamentares.map(parl => {
            const tab = mesaDiretora.find(tab => parl.id === tab.parlamentar);
            if (tab) {
                const cargo = tab.__str__.split(" - ");
                return {
                    id: parl.id,
                    __str__: parl.__str__,
                    fotografia: url + parl.fotografia_cropped,
                    mesa_diretora: tab.mesa_diretora,
                    cargo: tab.cargo,
                    cargo_str: cargo[1]
                };
            }
            return null;
        }).filter(Boolean);
        res.status(200).json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
};
exports.BoardOfDirect = BoardOfDirect;
