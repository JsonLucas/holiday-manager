import { HolidayController } from "../controllers/HolidayController";
import { TaskController } from "../controllers/TaskController";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { HolidayMiddleware } from "../middlewares/HolidayMiddleware";
import { TaskMiddleware } from "../middlewares/TaskMiddleware";
import { UserMiddleware } from "../middlewares/UserMiddleware";
import { HolidayRepository } from "../repositories/HolidayRepository";
import { SessionRepository } from "../repositories/SessionRepository";
import { TaskRepository } from "../repositories/TaskRepository";
import { UserRepository } from "../repositories/UserRepository";
import { HolidayUseCases } from "../usecases/HolidayUseCases";
import { TaskUseCases } from "../usecases/TaskUseCases";
import { UserUseCases } from "../usecases/UserUseCases";
import { Crypto } from "./crypto";
import { Validator } from "./validator";

export class Factory {
    public createUserMiddleware () {
        return new UserMiddleware(new Validator());
    }

    public createAuthMiddleware() {
        return new AuthMiddleware(new UserUseCases(new UserRepository(), new SessionRepository(), new Crypto()));
    }

    public createUserController () {
        return new UserController(new UserUseCases(new UserRepository(), new SessionRepository(), new Crypto()));
    }

    public createHolidayMiddleware() {
        return new HolidayMiddleware(new Validator());
    }

    public createHolidayController() {
        return new HolidayController(new HolidayUseCases(new HolidayRepository()));
    }

    public createTaskMiddleware() {
        return new TaskMiddleware(new Validator());
    }

    public createTaskController() {
        return new TaskController(new TaskUseCases(new TaskRepository()));
    }
}