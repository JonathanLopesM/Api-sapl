"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchPainel = void 0;
const PanelModel_1 = __importDefault(require("../../models/PanelModel"));
const PatchPainel = async (req, res) => {
    const { estado, tela, materia, message } = req.body;
    const { id } = req.params;
    const tokenInterlegis = process.env.TOKEN_INTERLEGIS;
    const response = await PanelModel_1.default.findByIdAndUpdate({ _id: id }, {
        estado: estado,
        tela: tela,
        materia: materia,
        message: message
    });
    if (tela === 0) {
        res.status(200).json({ message: "ok " });
    }
    if (tela === 1) {
        res.status(200).json({ response, message: "parlamentares e seus votos  " });
    }
    if (tela === 2) {
        res.status(200).json({ response, message: "resultado de votaçao" });
    }
    if (tela === 3) {
        res.status(200).json({ response, message: "Discurso" });
    }
    if (tela === 4) {
        res.status(200).json({ response, message: "Silêncio" });
    }
    if (tela === 5) {
        res.status(200).json({ response, message: "painel Mensagem" });
    }
};
exports.PatchPainel = PatchPainel;
