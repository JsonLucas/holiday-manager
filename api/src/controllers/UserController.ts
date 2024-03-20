import { CREATED_USER, SUCCESSFULY_LOGGED_IN, UPDATED_PASSWORD, USER_NOT_FOUND } from "../helpers/httpResponses/user";
import { HttpRequest, HttpResponse, NextFunction } from "../interfaces/Http";
import { IUserUseCases, User } from "../interfaces/User";

export class UserController {
    constructor(private userUseCases: IUserUseCases){ }

    public async signUp(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const token = await this.userUseCases.create(req.body as User);

        return res.status(CREATED_USER.code).send({ token });
    }

    public async login(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const token = await this.userUseCases.login(req.body.email, req.body.password);
        if(token) return res.status(SUCCESSFULY_LOGGED_IN.code).send({ token });
        
        res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    } 

    public async updatePassword(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { password } = req.body;
        const { user_id } = res.locals;
        await this.userUseCases.updatePassword(user_id, password);

        res.status(UPDATED_PASSWORD.code).send({ message: UPDATED_PASSWORD.message });
    }
}