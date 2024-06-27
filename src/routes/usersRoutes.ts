import express, { Router } from 'express';
import { getUsers } from '../controllers/getUsers';
import { registerUser } from '../controllers/registerUser';

const router: Router = express.Router();

router.get('/users', getUsers);
router.post('/register', registerUser)

export default router;