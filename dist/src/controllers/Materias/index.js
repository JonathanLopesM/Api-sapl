"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMaterias = void 0;
const axios_1 = __importDefault(require("axios"));
const GetMaterias = async (req, res) => {
    const url = process.env.URL_INTERLEGIS;
    console.log(`${url}/api/materia/materialegislativa/?o=-data_apresentacao&page_size=100`);
    const response = await axios_1.default.get(`${url}/api/materia/materialegislativa/?o=-data_apresentacao&page_size=100`);
    // console.log(response.data.results, "result")
    res.status(200).json(response.data.results);
};
exports.GetMaterias = GetMaterias;
