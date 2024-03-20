import { INVALID_DATA_FORMAT } from "../helpers/httpResponses/generic";
import { Validator } from "../helpers/validator";
import { HttpRequest, HttpResponse, NextFunction } from "../interfaces/Http";
import { createUserSchema, loginUserSchema, updatePasswordSchema } from "../utils/schemas/userSchemas";

export class UserMiddleware {
    constructor(private validator: Validator){ }

    public async validateSignUpPayload(req: HttpRequest, res: HttpResponse, next: NextFunction){
        const validation = await this.validator.validate(req.body, createUserSchema);
        if(!validation) return res.status(INVALID_DATA_FORMAT.code).send({ message: INVALID_DATA_FORMAT.message });

        next();
    }

    public async validateSignInPayload(req: HttpRequest, res: HttpResponse, next: NextFunction){
        const validation = await this.validator.validate(req.body, loginUserSchema);
        if(!validation) return res.status(INVALID_DATA_FORMAT.code).send({ message: INVALID_DATA_FORMAT.message });

        next();
    }

    public async validateUpdatePasswordPayload(req: HttpRequest, res: HttpResponse, next: NextFunction) {
        const validation = await this.validator.validate(req.body, updatePasswordSchema);
        if(!validation) return res.status(INVALID_DATA_FORMAT.code).send({ message: INVALID_DATA_FORMAT.message });

        next();
    }
}