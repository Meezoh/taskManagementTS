"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const myTokenKey = process.env.JWT_TOKEN_KEY;
const generateJWToken = (userId, email) => {
    try {
        const user = {
            userId,
            email
        };
        const token = jsonwebtoken_1.default.sign(user, myTokenKey, {
            expiresIn: '30d',
        });
        return token;
    }
    catch (error) {
        console.error('Error generating JWToken:', error.message);
        return error.message;
    }
};
exports.generateJWToken = generateJWToken;
//# sourceMappingURL=generateJWToken.js.map