import joi from 'joi';
import { Holiday } from '../../interfaces/Holiday';
import { Task } from '../../interfaces/Task';

export const holidaySchema = joi.object<Holiday>({
    title: joi.string().required(),
    description: joi.string().empty(''),
    date: joi.date().required(),
    coordinates: joi.string().required()
});

export const taskSchema = joi.object<Task>({
    title: joi.string().required(),
    description: joi.string().empty('')
});