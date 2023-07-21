"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voting = void 0;
const VoteModel_1 = __importDefault(require("../../../models/VoteModel"));
const Voting = async (req, res) => {
    const { user } = req.params;
    const { voto, presenca } = req.body;
    const respo = await VoteModel_1.default.findOne({ user: user });
    console.log(respo, "updadted ");
    if (!respo.presenca) {
        res.status(404).json({ message: "É preciso estar presente para votar" });
    }
    const response = await VoteModel_1.default.findOneAndUpdate({ user: user }, {
        voto: voto
    });
    res.status(200).json({ message: `ok`, response });
};
exports.Voting = Voting;
