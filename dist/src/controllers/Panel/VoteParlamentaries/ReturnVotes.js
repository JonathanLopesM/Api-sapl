"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnVotes = void 0;
const PanelModel_1 = __importDefault(require("../../../models/PanelModel"));
const VoteModel_1 = __importDefault(require("../../../models/VoteModel"));
const ReturnVotes = async (req, res) => {
    const responseVote = await VoteModel_1.default.find();
    const statePanel = await PanelModel_1.default.findOne();
    const { _id, tela, estado, materia } = statePanel;
    const NVote = responseVote.filter(parl => {
        return parl.voto == 'Não Votou';
    });
    const Yes = responseVote.filter(parl => {
        return parl.voto == 'Sim';
    });
    const Not = responseVote.filter(parl => {
        return parl.voto == 'Não';
    });
    const abstain = responseVote.filter(parl => {
        return parl.voto == 'Abster';
    });
    const Presence = responseVote.filter(parl => {
        return parl.presenca == true;
    });
    const totalVotes = NVote.length + Yes.length + Not.length;
    const response = {
        NVote: NVote.length,
        Yes: Yes.length,
        Not: Not.length,
        Presence: Presence.length,
        totalVotes,
        idPanel: _id,
        tela: tela,
        estado,
        materia,
    };
    return res.status(200).json({ response, responseVote });
};
exports.ReturnVotes = ReturnVotes;
