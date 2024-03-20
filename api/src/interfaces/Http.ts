import { IGenericObject } from "./Utilities"

export interface HttpRequest {
    body: IGenericObject,
    headers: IGenericObject,
    params: IGenericObject,
    query: IGenericObject
}

export interface HttpResponse {
    status(status: number): HttpResponse,
    send(data: IGenericObject | any): void,
    locals: Record<string, any>
}

export interface IHttpError {
    code: number,
    message: string,
    error?: IGenericObject
}

export type NextFunction = (err?: any) => void;