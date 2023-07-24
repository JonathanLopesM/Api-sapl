"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchSpeech = void 0;
const DiscourseModel_1 = __importDefault(require("../../../models/DiscourseModel"));
const PatchSpeech = async (req, res) => {
    const { idparams } = req.params;
    const { id, name, fotografia, presenca, speechTime, speechTimeInit, speechTimeInitBoolean } = req.body;
    console.log(idparams, id, name, fotografia, presenca, speechTime, speechTimeInit, speechTimeInitBoolean, "_id vindo na req");
    const response = await DiscourseModel_1.default.findOne({ _id: idparams });
    console.log(response, "dados de valore");
    if (id) {
        response.id = id;
    }
    if (name) {
        response.name = name;
    }
    if (fotografia) {
        response.fotografia = fotografia;
    }
    if (presenca !== undefined) {
        response.presenca = presenca;
    }
    if (speechTime !== undefined) {
        console.log(speechTime, "speech dentro app");
        response.speechTime = speechTime;
    }
    if (speechTimeInit) {
        response.speechTimeInit = speechTimeInit;
    }
    if (speechTimeInitBoolean) {
        response.speechTimeInitBoolean = speechTimeInitBoolean;
    }
    await response.save();
    res.status(200).json({ message: "ok atualizou", response });
};
exports.PatchSpeech = PatchSpeech;
