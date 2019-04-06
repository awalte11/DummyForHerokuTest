import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    description: {
        type: String,
        required: 'Describe the task'
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    dateCreated : {
        type: Date,
        default: Date.now
    },
    dateCompleted : {
        type: Date,
        default: null
    }
});