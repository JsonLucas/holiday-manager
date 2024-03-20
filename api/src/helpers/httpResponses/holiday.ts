import { StatusCodes } from "../enums/statusCodes";

export const SUCCESSFULY_GET_HOLIDAYS = {
    code: StatusCodes.REQUEST_OK,
    message: "Successfuly retrieved the holidays."
}

export const HOLIDAY_ALREADY_CREATED = {
    code: StatusCodes.NO_CONTENT,
    message: "The holiday is already created."
}

export const CREATED_HOLIDAY = {
    code: StatusCodes.SUCCESSFULY_CREATED,
    message: "Holiday successfuly created."
}

export const UPDATED_HOLIDAY = {
    code: StatusCodes.REQUEST_OK,
    message: "Holiday successfuly updated."
}

export const DELETED_HOLIDAY = {
    code: StatusCodes.NO_CONTENT,
    message: "Holiday successfuly deleted."
}

export const HOLIDAY_NOT_FOUND = {
    code: StatusCodes.NOT_FOUND,
    message: "Holiday not found."
}