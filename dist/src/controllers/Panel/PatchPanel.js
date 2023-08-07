"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchPainel = void 0;
const PanelModel_1 = __importDefault(require("../../models/PanelModel"));
const PatchPainel = async (req, res) => {
    const { estado, tela, materia, message, registro } = req.body;
    const { id } = req.params;
    const tokenInterlegis = process.env.TOKEN_INTERLEGIS;
    const response = await PanelModel_1.default.findByIdAndUpdate({ _id: id }, {
        estado: estado,
        tela: tela,
        materia: materia,
        message: message,
        registro: registro
    });
    res.status(200).json({ response, message: "ok " });
};
exports.PatchPainel = PatchPainel;
