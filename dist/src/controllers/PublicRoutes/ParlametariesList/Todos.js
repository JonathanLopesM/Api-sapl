"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todos = void 0;
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
async function Todos(req, res) {
    const completParl = await axios_1.default.get(`${url}/api/parlamentares/parlamentar/?page_size=100`);
    let parl;
    let legislation;
    let autor;
    await axios_1.default.get(`${url}/api/parlamentares/mandato/?page_size=100`)
        .then(async (data) => {
        parl = data.data;
        await axios_1.default.get(`${url}/api/parlamentares/legislatura/${data.data.results[0].legislatura}`)
            .then(async (data) => {
            legislation = data.data;
            await axios_1.default.get(`${url}/api/base/autor/`)
                .then(data => {
                autor = data;
            });
        });
    });
    let response = [];
    let responseData = completParl.data.results;
    for (let Res of responseData) {
        for (let parlament of parl.results) {
            if (Res.id == parlament.id) {
                response.push({
                    ...completParl.data,
                    voto_recebidos: parlament.votos_recebidos,
                    titular: parlament.titular,
                    legislatura: legislation.__str__,
                    autor: autor
                });
            }
        }
    }
    res.status(200).json(response);
}
exports.Todos = Todos;
