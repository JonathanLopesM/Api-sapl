"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    id: { type: Number },
    username: { type: String },
    password: String,
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    active: { type: Number },
    nivel: { type: Number },
    __str__: { type: String },
    metadata: { type: Object },
    nome_completo: { type: String },
    nome_parlamentar: { type: String },
    sexo: { type: String },
    data_nascimento: { type: String },
    numero_gab_parlamentar: { type: String },
    telefone: { type: String },
    telefone_celular: { type: String },
    endereco_web: { type: String },
    profissao: { type: String },
    email: { type: String },
    locais_atuacao: { type: String },
    ativo: { type: Boolean },
    biografia: { type: String },
    fotografia: { type: String },
    cropping: { type: String },
    nivel_instrucao: { type: Number }
});
exports.default = mongoose_1.default.model('UsersParl', userSchema, 'usersparl');
