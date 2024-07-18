import { compare } from 'bcrypt';
import { Request, Response} from 'express';
import { generateJWToken } from "../middlewares/generateJWToken";
import { createDatabaseConnectionPool } from '../db/connect';

const pool = createDatabaseConnectionPool();

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const selectQuery = 'SELECT * FROM users WHERE email = ?';
        const [result]: any = await pool.query(selectQuery, [email]);
        const user = result[0];

        if (!user || user.length === 0) {
            return res.status(401).send({message: 'Invalid credentials'});
        }

        const token = generateJWToken(user.userId, user.email);
        await comparePasswords(password, user.password, res, user, token);
        return console.log('Password match completed');

    } catch (error: any) {
        console.error('Error validating user token:', error.message);
        return res.status(500).send(error.message);
    }
}

const comparePasswords = async (enteredPassword: string, hashedPasswordFromDatabase: string, res: Response, user: any, JWToken: string) => {
    try {
        const passwordMatch = await compare(enteredPassword, hashedPasswordFromDatabase);
    
        if (passwordMatch) {
          console.log(user);
          return res.status(200).send({ JWToken, user });
        } else {
          console.log('Authentication failed: Incorrect password');
          return res.status(401).send({message: 'Invalid credentials'});
        }

      } catch (error: any) {
        console.error('Error during password comparison:', error.message);
        return res.status(500).send({message: error.message});
      }
}