import express, { NextFunction, Request, Response, json } from 'express';
import cors from 'cors';
import { router } from './routes';
import { port } from './constants/env';
import 'express-async-errors';

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.code).send({ error: err.message });
});
app.listen(port, () => console.log(`server listening at port ${port}`));