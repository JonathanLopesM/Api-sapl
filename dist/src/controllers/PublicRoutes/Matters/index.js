"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MattersLegis = void 0;
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
const MattersLegis = async (req, res) => {
    const { id } = req.params;
    const materias = await axios_1.default.get(`${url}/api/materia/materialegislativa/?o=-data_apresentacao&page=${id}`);
    let resu = materias.data.results;
    let response = [];
    for (let matter of materias.data.results) {
        let autor = await axios_1.default.get(`${url}/api/materia/autoria/?materia=${matter.id}`);
        let autoresArray = [];
        for (let autores of autor.data.results) {
            let nameArray = autores.__str__.split(" - ");
            autoresArray.push({
                id: autores.id,
                name: nameArray[0],
                __str__: autores.__str__,
                primeiro_autor: autores.primeiro_autor,
                autor: autores.autor,
                materia: autores.materia
            });
        }
        response.push({
            id: matter.id,
            __str__: matter.__str__,
            numero: matter.numero,
            ano: matter.ano,
            ementa: matter.ementa,
            resultado: matter.resultado,
            texto_original: matter.texto_original,
            autores: autoresArray
        });
    }
    res.status(200).json(response);
};
exports.MattersLegis = MattersLegis;
