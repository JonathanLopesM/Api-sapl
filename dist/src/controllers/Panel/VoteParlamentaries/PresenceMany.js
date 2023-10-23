"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceMany = void 0;
const VoteModel_1 = __importDefault(require("../../../models/VoteModel"));
const PresenceMany = async (req, res) => {
    const { presence } = req.body;
    console.log(presence, 'user e presenca');
    if (presence == null || presence == undefined) {
        res.status(404).json({ message: "Presença não foi cadastrada!" });
    }
    const response = await VoteModel_1.default.updateMany({
        presenca: presence
    });
    res.status(200).json({ message: `ok`, response });
};
exports.PresenceMany = PresenceMany;
