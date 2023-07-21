"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const UserParlamModel_1 = __importDefault(require("../models/UserParlamModel"));
const VoteModel_1 = __importDefault(require("../models/VoteModel"));
const Login = async (req, res) => {
    const { username, password } = req.body;
    if (!username) {
        return res.status(422).json({ message: 'O Username é obrigatório' });
    }
    if (!password) {
        return res.status(422).json({ message: 'A Senha é obrigatória' });
    }
    let user = {};
    var response = {};
    user = await UserModel_1.default.findOne({ username });
    console.log(user, 'user return findOne');
    if (user) {
        response = {
            _id: user._id,
            username: user.username,
            active: user.active,
            nivel: user.nivel
        };
    }
    if (!user) {
        user = await UserParlamModel_1.default.findOne({ username: username });
        console.log(user, 'user parl');
        if (!user) {
            return res.status(422).json({ msg: 'Usuário não encontrado, verifique Email/Senha' });
        }
        let votante = await VoteModel_1.default.findOne({ id: user.id });
        if (!votante) {
            votante = new VoteModel_1.default({
                id: user.id,
                user: user._id,
                name: user.nome_parlamentar,
                fotografia: user.fotografia,
                presenca: false,
                voto: 'Não Votou'
            });
        }
        if (votante) {
            await VoteModel_1.default.findByIdAndUpdate(user._id, {
                name: user.nome_parlamentar,
                fotografia: user.fotografia,
                presenca: true,
                voto: 'Não Votou'
            }, { new: true });
            const { _id, id, active, nivel, __str__, nome_completo, nome_parlamentar, sexo, data_nascimento, profissao, ativo, biografia, fotografia, cropping, nivel_instrucao, } = user;
            response = {
                user: {
                    _id, id,
                    username: user.username,
                    active, nivel, __str__,
                    nome_completo, nome_parlamentar,
                    sexo, data_nascimento, profissao, ativo,
                    biografia, fotografia, cropping, nivel_instrucao,
                }
            };
        }
        votante.save();
    }
    const checkPassword = await bcrypt_1.default.compare(password, user.password);
    if (!checkPassword) {
        return res.status(422).json({ message: 'Senha Inválida' });
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
exports.Login = Login;
