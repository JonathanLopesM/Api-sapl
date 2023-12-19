"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSpeech = void 0;
const DiscourseModel_1 = __importDefault(require("../../../models/DiscourseModel"));
const GetSpeech = async (req, res) => {
    const response = await DiscourseModel_1.default.find();
    if (!response) {
        const newDisco = new DiscourseModel_1.default({
            "id": 100,
            "name": "Usuário",
            "fotografia": "http://votacao.novace.com.br/novace_logo.png",
            "speechTime": false,
            "speechTimeInit": 450,
            "__v": 0,
            "presenca": false,
            "speechTimeInitBoolean": false,
            "partTime": false,
            "partTimeInit": 120,
            "partTimeInitBoolean": false,
            "orderQuestionTime": false,
            "orderQuestionTimeInit": 60,
            "orderQuestionTimeInitBoolean": false,
            "finalConsiderationsTime": false,
            "finalConsiderationsTimeInit": 300,
            "finalConsiderationsTimeInitBoolean": false,
            "soundPlay": false
        });
        await newDisco.save();
    }
    res.status(200).json({ message: "get response message", response });
};
exports.GetSpeech = GetSpeech;
