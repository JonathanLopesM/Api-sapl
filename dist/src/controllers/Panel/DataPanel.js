"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPanel = void 0;
const axios_1 = __importDefault(require("axios"));
const PanelModel_1 = __importDefault(require("../../models/PanelModel"));
const DataPanel = async (req, res) => {
    const { estado, tela, materia } = req.body;
    const tokenInterlegis = process.env.TOKEN_INTERLEGIS;
    const statePainel = await axios_1.default.get("https://sapl.valenca.rj.leg.br/api/painel/painel");
    console.log(statePainel, 'painel');
    const state = new PanelModel_1.default({
        estado: estado,
        tela: tela
    });
    await state.save();
    if (tela === 0) {
        res.status(200).json({ message: `tela ${tela}` });
    }
    if (tela === 1) {
        res.status(200).json({ message: `tela ${tela}` });
    }
    if (tela === 2) {
        res.status(200).json({ message: `tela ${tela}` });
    }
};
exports.DataPanel = DataPanel;
