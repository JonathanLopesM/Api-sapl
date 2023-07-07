require('dotenv').config()
import express, { Request, Response} from "express";
import cors from "cors";
import mongoose from "mongoose";
const PORT = 3333;

import { CreateAuthUser } from "./controllers/CreateAuthUser";
import { Login } from "./controllers/Login";
import checkToken from "./middlewares/CheckToken";
import { DataPanel } from "./controllers/Panel/DataPanel";
import { PatchPainel } from "./controllers/Panel/PatchPanel";
import { ReturnPainelDados } from "./controllers/Panel/ReturnDataPanel";
import { Voting } from "./controllers/Panel/VoteParlamentaries/Voting";

const app = express();

app.use(cors());

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World"});
})
//LOGIN users
app.post("/auth/login", Login)

//Create User
app.post("/auth/user", checkToken, CreateAuthUser)


//Control Panel
app.post("/painel/dados", DataPanel)
app.get("/painel/dados", ReturnPainelDados)
app.patch("/painel/dados/:id", PatchPainel)

//Voting
app.patch("/parl/vote/:user", Voting)


mongoose.connect(process.env.DB_URL)
.then(()=> {
app.listen(PORT)
  console.log(`Success Conected database on ${PORT}`)
}).catch((err) => {
  console.log('Erro especificado a baixo')
  console.log(err)
})

