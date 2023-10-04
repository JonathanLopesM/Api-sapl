"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Legislation = void 0;
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
const Legislation = async (req, res) => {
    const { page, year, type, ementa, number, per_page } = req.query;
    const getUrl = `${url}/api/norma/normajuridica/?o=-data&page=${page ? page : 1}&ano=${year ? year : ''}&tipo=${type ? type : ''}&ementa__icontains=${ementa ? ementa : ''}&numero=${number ? number : ''}&page_size=${per_page ? per_page : 4}`;
    const respo = await axios_1.default.get(getUrl);
    const response = respo.data;
    res.status(200).json(response);
};
exports.Legislation = Legislation;
