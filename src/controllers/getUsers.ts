import { createDatabaseConnectionPool } from "../db/connect"
import { Request, Response} from 'express';


const pool = createDatabaseConnectionPool();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        res.send(users);
    } catch (error) {
        console.log('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
}


// app.get("/", (req: Request, res: Response) => {
//     res.send("Hello my man, how you doing???");
// })