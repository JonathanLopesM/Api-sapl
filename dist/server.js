"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = 3333;
const CreateAuthUser_1 = require("./controllers/CreateAuthUser");
const Login_1 = require("./controllers/Login");
const CheckToken_1 = __importDefault(require("./middlewares/CheckToken"));
const DataPanel_1 = require("./controllers/Panel/DataPanel");
const PatchPanel_1 = require("./controllers/Panel/PatchPanel");
const ReturnDataPanel_1 = require("./controllers/Panel/ReturnDataPanel");
const Voting_1 = require("./controllers/Panel/VoteParlamentaries/Voting");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.json({ message: "Hello World" });
});
//LOGIN users
app.post("/auth/login", Login_1.Login);
//Create User
app.post("/auth/user", CheckToken_1.default, CreateAuthUser_1.CreateAuthUser);
//Control Panel
app.post("/painel/dados", DataPanel_1.DataPanel);
app.get("/painel/dados", ReturnDataPanel_1.ReturnPainelDados);
app.patch("/painel/dados/:id", PatchPanel_1.PatchPainel);
//Voting
app.patch("/parl/vote/:user", Voting_1.Voting);
mongoose_1.default.connect(process.env.DB_URL)
    .then(() => {
    app.listen(PORT);
    console.log(`Success Conected database on ${PORT}`);
}).catch((err) => {
    console.log('Erro especificado a baixo');
    console.log(err);
});
