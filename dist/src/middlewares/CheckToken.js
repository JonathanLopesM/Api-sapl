"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function checkToken(req, res, next) {
    const authHeader = await req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" });
    }
    try {
        const secret = process.env.SECRET;
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err)
                return res.status(401).send({ error: 'Token invalid' });
            // console.log(decoded)
            req.userId = decoded.id;
            return next();
        });
    }
    catch (error) {
        res.status(400).json({ msg: "Token Inválido !" });
    }
}
exports.default = checkToken;
