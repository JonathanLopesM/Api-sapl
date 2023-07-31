"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const UserParlamModel_1 = __importDefault(require("../../models/UserParlamModel"));
const DeleteUser = async (req, res) => {
    const { id } = req.params;
    console.log(id, "id no params");
    try {
        let response;
        response = await UserModel_1.default.findByIdAndDelete(id);
        console.log(response, "se encotntrou no userModel");
        if (!response) {
            response = await UserParlamModel_1.default.findByIdAndDelete(id);
            console.log(response, "se encotntrou no UserParl");
        }
        res.status(204).json({ message: "user delete success ", response });
    }
    catch (error) {
        console.log(error, "server not delete");
    }
};
exports.DeleteUser = DeleteUser;
