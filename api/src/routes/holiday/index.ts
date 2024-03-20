import { NextFunction, Request, Response, Router } from 'express';
import { Factory } from '../../helpers/factory';

export const holidayRouter = Router();
const factory = new Factory();

holidayRouter.post('/holiday',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayMiddleware().validateCreateHolidayPayload(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().create(req, res, next),
);

holidayRouter.get('/holiday',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().getAll(req, res, next)
);

holidayRouter.post('/holiday/delete',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayMiddleware().validateMassDelete(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().massDelete(req, res, next)
);

holidayRouter.get('/holiday/:id',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response) => await factory.createHolidayController().getById(req, res)
);

holidayRouter.put('/holiday/:id',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayMiddleware().validateUpdateHolidayPayload(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().getById(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().update(req, res, next)
);

holidayRouter.delete('/holiday/:id',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().getById(req, res, next),
    async (req: Request, res: Response) => await factory.createHolidayController().delete(req, res)
);

holidayRouter.post('/holiday/:id/task',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().getById(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createTaskMiddleware().validateCreateTaskPayload(req, res, next),
    async (req: Request, res: Response) => await factory.createTaskController().create(req, res)
);

holidayRouter.post('/holiday/:id/task/delete',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().getById(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayMiddleware().validateMassDelete(req, res, next),
    async (req: Request, res: Response) => await factory.createTaskController().massDelete(req, res)
);

holidayRouter.get('/holiday/:id/task',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().getById(req, res, next),
    async (req: Request, res: Response) => await factory.createTaskController().getAll(req, res)
);

holidayRouter.put('/holiday/:id/task/:taskId',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().getById(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createTaskMiddleware().validateUpdateTaskPayload(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createTaskController().getById(req, res, next),
    async (req: Request, res: Response) => await factory.createTaskController().update(req, res)
);

holidayRouter.delete('/holiday/:id/task/:taskId',
    async (req: Request, res: Response, next: NextFunction) => await factory.createAuthMiddleware().verificateValidSession(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createHolidayController().getById(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => await factory.createTaskController().getById(req, res, next),
    async (req: Request, res: Response) => await factory.createTaskController().delete(req, res)
);