//   /lib/controllers/crmController.ts
import * as mongoose from 'mongoose';
import { TaskSchema } from './models';
import { Request, Response } from 'express';
import { url } from 'inspector';

const Task = mongoose.model('Task', TaskSchema);
export class TaskController{

    public addNewTask (req: Request, res: Response) {                
        let newTask = new Task(req.body);
    
        newTask.save((err, task) => {
            if(err){
                
                res.status(400).json({
                    "errorResponse" : err.message
                }).send();
            }
            var newUrl : string = "dummy";
            res.append('Location', "localhost:3000/api/tasks/:id?" + task.id);    
            res.status(201).send();//TODO figure out header     
        });
    }

    public getTasks (req: Request, res: Response) {    
        console.log('called get all');   
        if (req.params)
        {
            console.log(req.params);
        }       
        Task.find({}, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        }).select('-__v');
        
    }
    public getTaskWithID (req: Request, res: Response) {
        console.log('called get singular');           
        Task.findById(mongoose.Types.ObjectId(req.params.id), (err, task) => {
            if(err){
                res.send(err);
            }
            if (!task)
            {
                res.status(404).json({
                    "errorResponse" : "No task with ID " + req.params.id + "exists"
                }).send();
            }
            else res.json(task);
        }).select('-__v');
    }

    public updateTask (req: Request, res: Response) {    
        console.log('called patch singular');          
        Task.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), req.body, { new: true }, (err, task) => {
            if(err){
                res.status(400).send(err);
            }
            res.status(204).send(task);
        });
    }
}
