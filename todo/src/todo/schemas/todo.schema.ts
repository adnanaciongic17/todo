import * as mongoose from 'mongoose';

export const toDoSchema = new mongoose.Schema({
        checked: Boolean,
        text: String,

});