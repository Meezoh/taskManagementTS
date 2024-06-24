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
exports.getUsers = void 0;
const connect_1 = require("../db/connect");
const pool = (0, connect_1.createDatabaseConnectionPool)();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [users] = yield pool.query('SELECT * FROM users');
        res.send(users);
    }
    catch (error) {
        console.log('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getUsers = getUsers;
//# sourceMappingURL=getUsers.js.map