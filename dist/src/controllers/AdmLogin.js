"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const AdmLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username) {
        return res.status(404).json({ message: 'O Username é obrigatório' });
    }
    if (!password) {
        return res.status(404).json({ message: 'A Senha é obrigatória' });
    }
    let user = {};
    var response = {};
    user = await UserModel_1.default.findOne({ username });
    console.log(user, 'user return findOne');
    if (!user) {
        res.status(404).json({ message: "Usuário não encontrado, verifique Username/Senha" });
    }
    if (user) {
        response = {
            _id: user._id,
            username: user.username,
            active: user.active,
            nivel: user.nivel
        };
    }
    const checkPassword = await bcrypt_1.default.compare(password, user?.password);
    if (!checkPassword) {
        return res.status(404).json({ message: 'Senha Inválida' });
    }
    try {
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
        }, secret);
        res.status(200).json({ response, token });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        });
    }
};
exports.AdmLogin = AdmLogin;
