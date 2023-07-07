"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnPainelDados = void 0;
const PanelModel_1 = __importDefault(require("../../models/PanelModel"));
const VoteModel_1 = __importDefault(require("../../models/VoteModel"));
const ReturnPainelDados = async (req, res) => {
    const { id } = req.params;
    const statePanel = await PanelModel_1.default.findOne();
    const { tela, estado, materia } = statePanel;
    console.log(tela, estado, materia, "painel");
    if (tela === 0) {
        res.status(200).json({ message: `Bem vindos a casa do Povo!` });
    }
    if (tela === 1) {
        const stateVote = await VoteModel_1.default.find();
        console.log(stateVote, 'votante');
        res.status(200).json({ message: `tela ${tela}`, stateVote });
    }
    if (tela === 2) {
        res.status(200).json({ message: `tela ${tela}` });
    }
};
exports.ReturnPainelDados = ReturnPainelDados;
