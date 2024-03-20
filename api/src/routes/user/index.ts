import { NextFunction, Request, Response, Router } from 'express';
import { Factory } from '../../helpers/factory';

export const userRouter = Router();
const factory = new Factory();

userRouter.post('/login',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateUserExists(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createUserMiddleware().validateSignInPayload(req, res, next),
    async (req: Request, res: Response) => await factory.createUserController().login(req, res)
);

userRouter.post('/signup', 
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateUserNotExists(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createUserMiddleware().validateSignUpPayload(req, res, next),
    async (req: Request, res: Response) => await factory.createUserController().signUp(req, res)
);

userRouter.patch('/forgot-password', 
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateUserNotExists(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createUserMiddleware().validateUpdatePasswordPayload(req, res, next),
    async (req: Request, res: Response) => await factory.createUserController().updatePassword(req, res)
);