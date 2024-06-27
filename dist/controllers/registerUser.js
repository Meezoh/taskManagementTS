"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const connect_1 = require("../db/connect");
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
const pool = (0, connect_1.createDatabaseConnectionPool)();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = yield (0, bcrypt_1.hash)(password, saltRounds);
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = yield pool.query(insertQuery, [username, email, hashedPassword]);
        const id = result.insertId;
        const [user] = yield pool.query('SELECT * FROM users WHERE userId = ?', [id]);
        res.send(user);
    }
    catch (error) {
        console.error('something is wrong:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.registerUser = registerUser;
//# sourceMappingURL=registerUser.js.map