import { createDatabaseConnectionPool } from "../db/connect"
import { Request, Response} from 'express';

const pool = createDatabaseConnectionPool();

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const {token} = req.params;

        const selectQuery = 'SELECT userId from verifyUsers WHERE token = ? AND tokenExpiry > NOW()';
        const [result]: any = await pool.query(selectQuery, [token]);
        
        if (!result || result.length === 0) {
            return res.status(400).send({message: 'Invalid or expired token'});
        }

        const {userId} = result[0];
        const updateQuery = 'UPDATE users SET isVerified = true WHERE userId = ?';
        await pool.query(updateQuery, [userId]);

        return res.status(200).send({message: 'Email verified successfully'});

    } catch (error: any) {
        console.error('Error validating user token:', error.message);
        return res.status(500).send(error.message);
    }
}