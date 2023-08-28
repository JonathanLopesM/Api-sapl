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
    const parlamentares = await axios_1.default.get(`${url}/api/parlamentares/parlamentar/?page_size=100`);
    const table = await axios_1.default.get(`${url}/api/parlamentares/composicaomesa/?mesa_diretora=${idtable}`);
    let response = [];
    for (let parl of parlamentares.data.results) {
        for (let tab of table.data.results) {
            if (parl.id == tab.parlamentar) {
                let cargo = tab.__str__.split(" - ");
                console.log(cargo, "cargo");
                response.push({
                    id: parl.id,
                    __str__: parl.__str__,
                    fotografia: parl.fotografia,
                    mesa_diretora: tab.mesa_diretora,
                    cargo: tab.cargo,
                    cargo_str: cargo[1]
                });
            }
        }
    }
    res.status(200).json(response);
};
exports.BoardOfDirect = BoardOfDirect;
