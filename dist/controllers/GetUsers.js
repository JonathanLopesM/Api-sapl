"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsers = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const UserParlamModel_1 = __importDefault(require("../models/UserParlamModel"));
const GetUsers = async (req, res) => {
    const response = await UserModel_1.default.find();
    const resParl = await UserParlamModel_1.default.find();
    res.status(200).json({ response, resParl });
};
exports.GetUsers = GetUsers;
