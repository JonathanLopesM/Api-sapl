"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroVote = void 0;
const PanelModel_1 = __importDefault(require("../../../models/PanelModel"));
const VoteModel_1 = __importDefault(require("../../../models/VoteModel"));
const ZeroVote = async (req, res) => {
    await VoteModel_1.default.updateMany({
        voto: "Não Votou",
    });
    const statePanel = await PanelModel_1.default.findOne();
    // consnt { _id, tela, estado, materia, message, registro} = statePanel;
    if (statePanel.materia) {
        statePanel.materia = undefined;
    }
    if (statePanel.registro) {
        statePanel.registro = false;
    }
    statePanel.save();
    res.status(200).json({ message: "ok" });
};
exports.ZeroVote = ZeroVote;
