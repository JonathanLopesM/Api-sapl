"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSessoes = void 0;
const axios_1 = __importDefault(require("axios"));
const GetSessoes = async (req, res) => {
    const response = await axios_1.default.get("https://sapl.barramansa.rj.leg.br/api/sessao/sessaoplenaria/?o=-data_inicio&page_size=100");
    console.log(response.data.results, "response");
    res.status(200).json(response.data.results);
};
exports.GetSessoes = GetSessoes;
