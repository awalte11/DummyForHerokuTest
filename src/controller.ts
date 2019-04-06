//   /lib/controllers/crmController.ts
import * as mongoose from 'mongoose';
import { TaskSchema } from './models';
import { Request, Response } from 'express';

const Task = mongoose.model('Task', TaskSchema);
export class TaskController{

public addNewTask (req: Request, res: Response) {                
        let newTask = new Task(req.body);
    
        newTask.save((err, task) => {
            if(err){
                res.send(err);
            }    
            res.json(task);
        });
    }
}