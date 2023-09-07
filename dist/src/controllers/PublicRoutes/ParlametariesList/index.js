"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParlamentariesList = void 0;
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
const ParlamentariesList = async (req, res) => {
    const parlamentares = await axios_1.default.get(`${url}/api/parlamentares/parlamentar/search_parlamentares/`);
    const parlamentaresFilter = parlamentares.data.filter((parl) => {
        if (parl.titular == "Sim") {
            return parl;
        }
    });
    let response = [];
    for (let parl of parlamentaresFilter) {
        response.push({
            id: parl.id,
            nome_parlamentar: parl.nome_parlamentar,
            fotografia_cropped: url + parl.fotografia_cropped,
            fotografia: parl.fotografia,
            ativo: parl.ativo,
            partido: parl.partido,
            titular: parl.titular
        });
    }
    res.status(200).json(response);
};
exports.ParlamentariesList = ParlamentariesList;
