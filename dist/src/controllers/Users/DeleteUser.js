"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = void 0;
const VoteModel_1 = __importDefault(require("../../models/VoteModel"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const UserParlamModel_1 = __importDefault(require("../../models/UserParlamModel"));
const DeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        let response;
        response = await UserModel_1.default.findByIdAndDelete(id);
        if (!response) {
            response = await UserParlamModel_1.default.findByIdAndDelete(id);
            await VoteModel_1.default.findOneAndDelete({ user: id });
        }
        res.status(204).json({ message: "user delete success ", response });
    }
    catch (error) {
        console.log(error, "server not delete");
    }
};
exports.DeleteUser = DeleteUser;
