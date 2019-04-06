
import * as mongoose from 'mongoose';
import { TaskSchema } from './models';
import { Request, Response } from 'express';

const Task = mongoose.model('Task', TaskSchema);
export class TaskController{

    /**
     * Sends request for new task
    */
        public addNewTask (req: Request, res: Response) {                
        

        if(!req.body.description || req.body.description == "" )// doing this here to catch empty descriptions
        {
            res.status(400).json({
                "errorType" : "Description must not be null or empty."
            })
        }
        let newTask = new Task();
        newTask.description = req.body.description;
    
        newTask.save((err, task) => {
            
            //Slaps the location to get the thing onto the header
            res.append('Location', "localhost:3000/api/tasks/" + task.id);    
            res.status(201).send();    
        });
    }

    //Gets tasks from the database
    public getTasks (req: Request, res: Response) {    
              
        Task.find({}, (err, task) => {
            res.json(task);
        }).select('-__v');//this gets rid of that uncalled for variable mongo adds
        
    }

    //gets one task from the db
    public getTaskWithID (req: Request, res: Response) {
                  
        Task.findById(mongoose.Types.ObjectId(req.params.id), (err, task) => {
            if(err){
                res.send(err);
            }
            else if (!task)//the server doesn't return err here so I detect the missing task and handle the 404
            {
                res.status(404).json({
                    "errorResponse" : "No task with ID " + req.params.id + " exists"
                }).send();
            }
            else res.json(task);
        }).select('-__v');//this gets rid of that uncalled for variable mongo adds
    }

    //patches a task
    public updateTask (req: Request, res: Response) {   
        
       if(req.body.description == "" || req.body.description == null)// doing this here to catch empty descriptions
        {
            res.status(400).json({
                "errorType" : "Description must not be null or empty."
            }).send();
        }
        else if (req.body.isComplete == null) {
            res.status(400).json({
                "errorType" : "isComplete must not be null."
            }).send();
        }else
        Task.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), req.body, { new: true }, (err, task) => {
            if(err){
                res.status(400).send(err);
            }
            res.status(204).send();
        });
    }
}
