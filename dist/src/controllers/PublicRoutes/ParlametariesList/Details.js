"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Details = void 0;
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
async function Details(req, res) {
    const { id } = req.params;
    const completParl = await axios_1.default.get(`${url}/api/parlamentares/parlamentar/${id}`);
    let parl;
    let legislation;
    let autor;
    await axios_1.default.get(`${url}/api/parlamentares/mandato/?parlamentar=${id}`)
        .then(async (data) => {
        parl = data.data.results[0];
        await axios_1.default.get(`${url}/api/parlamentares/legislatura/${data.data.results[0].legislatura}`)
            .then(async (data) => {
            legislation = data.data;
            await axios_1.default.get(`${url}/api/base/autor/?object_id=${id}`)
                .then(data => {
                autor = data.data.results[0].id;
            });
        });
    });
    let response = completParl.data;
    response = {
        ...response,
        voto_recebidos: parl.votos_recebidos,
        titular: parl.titular,
        legislatura: legislation.__str__,
        autor: autor
    };
    res.status(200).json(response);
}
exports.Details = Details;
