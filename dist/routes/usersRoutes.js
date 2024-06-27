"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUsers_1 = require("../controllers/getUsers");
const registerUser_1 = require("../controllers/registerUser");
const router = express_1.default.Router();
router.get('/users', getUsers_1.getUsers);
router.post('/register', registerUser_1.registerUser);
exports.default = router;
//# sourceMappingURL=usersRoutes.js.map