"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presence = void 0;
const VoteModel_1 = __importDefault(require("../../../models/VoteModel"));
const Presence = async (req, res) => {
    const { user } = req.params;
    const { presence } = req.body;
    if (presence == null || presence == undefined) {
        res.status(404).json({ message: "Presença não foi cadastrada!" });
    }
    const response = await VoteModel_1.default.findOneAndUpdate({ _id: user }, {
        presenca: presence
    });
    res.status(200).json({ message: `ok`, response });
};
exports.Presence = Presence;
