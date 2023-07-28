"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechParl = void 0;
const DiscourseModel_1 = __importDefault(require("../../../models/DiscourseModel"));
const SpeechParl = async (req, res) => {
    const { id, user, name, fotografia, presenca, speechTime, speechTimeInit, } = req.body;
    const response = new DiscourseModel_1.default({
        id,
        name,
        fotografia,
        presenca,
        speechTime,
        speechTimeInit
    });
    await response.save();
    res.status(200).json({ message: "ok atualizou", response });
};
exports.SpeechParl = SpeechParl;
