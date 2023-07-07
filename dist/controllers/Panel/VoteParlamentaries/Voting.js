"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voting = void 0;
const VoteModel_1 = __importDefault(require("../../../models/VoteModel"));
const Voting = async (req, res) => {
    const { user } = req.params;
    const { voto } = req.body;
    // console.log(user, 'id do votante')
    const response = await VoteModel_1.default.findOneAndUpdate({ user: user }, {
        voto: voto
    });
    console.log(response, 'response do voto');
    res.status(200).json({ message: `ok`, response });
};
exports.Voting = Voting;
