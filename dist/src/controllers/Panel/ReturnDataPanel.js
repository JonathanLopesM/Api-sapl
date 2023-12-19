"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnPainelDados = void 0;
const PanelModel_1 = __importDefault(require("../../models/PanelModel"));
const VoteModel_1 = __importDefault(require("../../models/VoteModel"));
const DiscourseModel_1 = __importDefault(require("../../models/DiscourseModel"));
const axios_1 = __importDefault(require("axios"));
const url = process.env.URL_INTERLEGIS;
const ReturnPainelDados = async (req, res) => {
    const statePanel = await PanelModel_1.default.findOne();
    if (!statePanel) {
        const panel = new PanelModel_1.default({
            estado: true,
            tela: 0,
            materia: '',
            message: '',
            registro: false
        });
        await panel.save();
    }
    const { _id, tela, estado, materia, message, registro } = statePanel;
    let dados = {};
    if (tela === 0) {
        //bem vindos a casa do Povo
        let obj = {
            idPanel: _id,
            tela,
            estado,
            materia,
            message,
            view: 'Bem vindos a casa do Povo!',
            registro
        };
        dados = obj;
        res.status(200).json(dados);
    }
    if (tela === 1) {
        // presença e votação
        const stateVote = await VoteModel_1.default.find();
        let result;
        let matter;
        if (materia) {
            const respo = await axios_1.default.get(`${url}/api/materia/materialegislativa/${materia}`);
            matter = respo.data;
        }
        if (registro) {
            const resultResp = await axios_1.default.get(`${url}/api/sessao/registrovotacao/?materia=${materia}`);
            result = resultResp.data.results[0];
        }
        const NVote = stateVote.filter(parl => {
            if (parl.presenca === true) {
                return parl.voto == 'Não Votou';
            }
            return;
        });
        const Yes = stateVote.filter(parl => {
            return parl.voto == 'Sim';
        });
        const Not = stateVote.filter(parl => {
            return parl.voto == 'Não';
        });
        const Abstain = stateVote.filter(parl => {
            return parl.voto == 'Abster';
        });
        const Presence = stateVote.filter(parl => {
            return parl.presenca == true;
        });
        const totalVotes = NVote.length + Yes.length + Not.length;
        const response = {
            NVote: NVote.length,
            Yes: Yes.length,
            Not: Not.length,
            Abstain: Abstain.length,
            Presence: Presence.length,
            totalVotes
        };
        dados = {
            idPanel: _id,
            tela: tela,
            estado,
            materia: matter,
            message,
            stateVote,
            response,
            registro,
            result
        };
        res.status(200).json(dados);
    }
    if (tela === 2) {
        const responseVote = await VoteModel_1.default.find();
        let matter;
        if (materia) {
            const respo = await axios_1.default.get(`${url}/api/materia/materialegislativa/${materia}`);
            matter = respo.data;
        }
        const NVote = responseVote.filter(parl => {
            if (parl.presenca === true) {
                return parl.voto == 'Não Votou';
            }
            return;
        });
        const Yes = responseVote.filter(parl => {
            return parl.voto == 'Sim';
        });
        const Not = responseVote.filter(parl => {
            return parl.voto == 'Não';
        });
        const Abstain = responseVote.filter(parl => {
            return parl.voto == 'Abster';
        });
        const Presence = responseVote.filter(parl => {
            return parl.presenca == true;
        });
        const totalVotes = NVote.length + Yes.length + Not.length;
        const response = {
            NVote: NVote.length,
            Yes: Yes.length,
            Not: Not.length,
            Abstain: Abstain.length,
            Presence: Presence.length,
            totalVotes
        };
        dados = {
            idPanel: _id,
            tela: tela,
            estado,
            materia: matter,
            message,
            response,
            registro
        };
        res.status(200).json(dados);
    }
    if (tela === 3) {
        const speechParl = await DiscourseModel_1.default.findOne();
        let matter;
        if (materia) {
            const respo = await axios_1.default.get(`${url}/api/materia/materialegislativa/${materia}`);
            matter = respo.data;
        }
        dados = {
            idPanel: _id,
            tela: tela,
            estado,
            materia: matter,
            message,
            speechParl,
            registro
        };
        res.status(200).json(dados);
    }
    if (tela === 4) {
        let matter;
        if (materia) {
            const respo = await axios_1.default.get(`${url}/api/materia/materialegislativa/${materia}`);
            matter = respo.data;
        }
        dados = {
            idPanel: _id,
            tela: tela,
            estado,
            materia: matter,
            message,
            registro
        };
        res.status(200).json(dados);
    }
    if (tela === 5) {
        let matter;
        if (materia) {
            const respo = await axios_1.default.get(`${url}/api/materia/materialegislativa/${materia}`);
            matter = respo.data;
        }
        dados = {
            idPanel: _id,
            tela: tela,
            estado,
            materia: matter,
            message,
            registro
        };
        res.status(200).json(dados);
    }
    if (tela === 6) {
        let matter;
        if (materia) {
            const respo = await axios_1.default.get(`${url}/api/materia/materialegislativa/${materia}`);
            matter = respo.data;
        }
        dados = {
            idPanel: _id,
            tela: tela,
            estado,
            materia: matter,
            message,
            registro
        };
        res.status(200).json(dados);
    }
};
exports.ReturnPainelDados = ReturnPainelDados;
