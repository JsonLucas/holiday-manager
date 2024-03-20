import { StatusCodes } from "../enums/statusCodes";

export const CREATED_TASK = {
    code: StatusCodes.SUCCESSFULY_CREATED,
    message: "Task successfuly created."
}

export const UPDATED_TASK = {
    code: StatusCodes.REQUEST_OK,
    message: "Task successfuly updated."
}

export const TASK_NOT_FOUND = {
    code: StatusCodes.NOT_FOUND,
    message: "Task not found."
}

export const DELETED_TASK = {
    code: StatusCodes.NO_CONTENT,
    message: "Task successfuly deleted."
}