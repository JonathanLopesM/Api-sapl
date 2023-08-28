"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserParlamModel_1 = __importDefault(require("../../models/UserParlamModel"));
const UpdatedUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, confirmpassword, active, nivel } = req.body;
    let user;
    user = await UserParlamModel_1.default.findOne({ _id: id });
    if (username) {
        user.username = username;
    }
    if (password) {
        if (password === confirmpassword) {
            // create password
            const salt = await bcrypt_1.default.genSalt(12);
            const passwordHash = await bcrypt_1.default.hash(password, salt);
            user.password = passwordHash;
        }
    }
    if (active) {
        user.active = active;
    }
    if (nivel) {
        user.nivel = nivel;
    }
    await user.save();
    res.status(203).json({ message: "user updated success!" });
};
exports.UpdatedUser = UpdatedUser;
