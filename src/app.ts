import express, { Express, Request, Response, NextFunction } from 'express';
import usersRoutes from './routes/usersRoutes'
// import { createTables } from './db/createTables';

const app: Express = express();

app.use(express.json());
app.use('/api/v1', usersRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 8080;
const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        // createTables();
    } catch (error) {
        console.log(error);
    }
};

start();