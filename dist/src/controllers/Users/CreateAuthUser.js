"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthUser = void 0;
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const UserParlamModel_1 = __importDefault(require("../../models/UserParlamModel"));
const CreateAuthUser = async (req, res) => {
    const { username, password, confirmpassword, active, nivel, id } = req.body;
    const url = process.env.URL_INTERLEGIS;
    let parlamentar = null;
    if (!username) {
        return res.status(422).json({ message: 'O Username é obrigatório' });
    }
    if (!password) {
        return res.status(422).json({ message: 'A Senha é obrigatória' });
    }
    if (!active) {
        return res.status(422).json({ message: 'O Active é obrigatório' });
    }
    if (!nivel) {
        return res.status(422).json({ message: 'O Nivel de usuário é obrigatório' });
    }
    if (password !== confirmpassword) {
        return res.status(422).json({ message: 'As senhas não conferem!' });
    }
    // check if User exists 
    if (!id) {
        const userExists = await UserModel_1.default.findOne({ username: username });
        if (userExists) {
            return res.status(422).json({ message: 'Username já vinculado a uma conta!' });
        }
    }
    else {
        const userExists = await UserParlamModel_1.default.findOne({ username: username });
        if (userExists) {
            return res.status(422).json({ message: 'Username já vinculado a uma conta!' });
        }
    }
    if (id) {
        parlamentar = await axios_1.default.get(`${url}/api/parlamentares/parlamentar/${id}`);
    }
    // create password
    const salt = await bcrypt_1.default.genSalt(12);
    const passwordHash = await bcrypt_1.default.hash(password, salt);
    //create User
    let user = {};
    let voting = {};
    if (nivel == 2 || nivel == 5) {
        user = new UserModel_1.default({
            username,
            password: passwordHash,
            active,
            nivel
        });
        await user.save();
    }
    if (nivel == 1) {
        user = new UserParlamModel_1.default({
            id: parlamentar.data.id,
            username,
            password: passwordHash,
            active,
            nivel,
            __str__: parlamentar.data.__str__,
            nome_completo: parlamentar.data.nome_completo,
            nome_parlamentar: parlamentar.data.nome_parlamentar,
            sexo: parlamentar.data.sexo,
            data_nascimento: parlamentar.data.data_nascimento,
            numero_gab_parlamentar: parlamentar.data.numero_gab_parlamentar,
            telefone: parlamentar.data.telefone,
            telefone_celular: parlamentar.data.telefone_celular,
            endereco_web: parlamentar.data.endereco_web,
            profissao: parlamentar.data.profissao,
            email: parlamentar.data.email,
            locais_atuacao: parlamentar.data.locais_atuacao,
            ativo: parlamentar.data.ativo,
            biografia: parlamentar.data.biografia,
            fotografia: parlamentar.data.fotografia,
            cropping: parlamentar.data.cropping,
            nivel_instrucao: parlamentar.data.nivel_instrucao
        });
        await user.save();
    }
    try {
        res.status(201).json({ message: 'usuario criado com sucesso!' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro no servidores' });
    }
};
exports.CreateAuthUser = CreateAuthUser;
