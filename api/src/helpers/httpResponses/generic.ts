import { StatusCodes } from "../enums/statusCodes";

export const BAD_REQUEST = {
    code: StatusCodes.BAD_REQUEST,
    message: "Something went wrong on this request"
}

export const INVALID_PARAM = {
    code: StatusCodes.BAD_REQUEST,
    message: "Invalid param data format."
}

export const INVALID_DATA_FORMAT = {
    code: StatusCodes.INVALID_DATA,
    message: "The sent object is invalid."
}

export const INTERNAL_SERVER_ERROR = {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "An uncaught error has occurred."
}