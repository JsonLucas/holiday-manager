import Joi from 'joi';
import { IGenericObject, IValidator } from "../interfaces/Utilities";

export class Validator implements IValidator<Joi.ObjectSchema, Joi.AsyncValidationOptions> {
    public async validate(payload: IGenericObject, schema: Joi.ObjectSchema, options?: Joi.AsyncValidationOptions): Promise<boolean> {
        try{
            await schema.validateAsync(payload, options);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
}