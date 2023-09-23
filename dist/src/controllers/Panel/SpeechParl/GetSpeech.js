"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSpeech = void 0;
const DiscourseModel_1 = __importDefault(require("../../../models/DiscourseModel"));
const GetSpeech = async (req, res) => {
    const response = await DiscourseModel_1.default.find();
    res.status(200).json({ message: "get response message", response });
};
exports.GetSpeech = GetSpeech;
