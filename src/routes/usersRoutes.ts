import express, { Router } from 'express';
import { getUsers } from '../controllers/getUsers';
import { registerUser } from '../controllers/registerUser';
import { verifyUser } from '../controllers/verifyUser';

const router: Router = express.Router();

router.get('/users', getUsers);
router.post('/register', registerUser);
router.get('/verify-email/:token', verifyUser);

export default router;