"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserId = void 0;
const VoteModel_1 = __importDefault(require("../models/VoteModel"));
const GetUserId = async (req, res) => {
    const { id } = req.params;
    const response = await VoteModel_1.default.findOne({ id: id });
    console.log(response);
    res.status(200).json(response);
};
exports.GetUserId = GetUserId;
