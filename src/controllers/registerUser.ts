import { createDatabaseConnectionPool } from "../db/connect"
import { Request, Response} from 'express';
import { hash } from 'bcrypt';


interface UserBody {
    username: string,
    email: string,
    password: string
}

const saltRounds = 10;
const pool = createDatabaseConnectionPool();

export const registerUser = async (req: Request<UserBody>, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await hash(password, saltRounds);

        // Perfome the database insertion
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result]: any = await pool.query(insertQuery, [username, email, hashedPassword]);

        // Query the newly created user
        const id: number = result.insertId;
        const [user] = await pool.query('SELECT * FROM users WHERE userId = ?', [id])

        res.send(user);
    } catch (error) {
        console.error('something is wrong:', error);
        res.status(500).send('Internal Server Error');
    }
}