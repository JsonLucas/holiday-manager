import { StatusCodes } from "../enums/statusCodes"

export const SUCCESSFULY_LOGGED_IN = {
    code: StatusCodes.REQUEST_OK,
    message: "Successfuly logged in."
}

export const CREATED_USER = {
    code: StatusCodes.SUCCESSFULY_CREATED,
    message: "Successfuly created user."
}

export const ACTION_NOT_ALLOWED = {
    code: StatusCodes.NOT_ALLOWED,
    message: "You don\'t have permissions to do this action."
}

export const USER_NOT_FOUND = {
    code: StatusCodes.NOT_FOUND,
    message: "User not found."
}

export const EMAIL_CONFLICT = {
    code: StatusCodes.CONFLICT,
    message: "This email is already in use."
}

export const UPDATED_PASSWORD = {
    code: StatusCodes.REQUEST_OK,
    message: "Password successfuly updated."
}