
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
        else //stops passing bad desc
        {
            let newTask = new Task();
            newTask.description = req.body.description;//makes sure *only* the description is passed in..
        
            newTask.save((err, task) => {
                
                //Slaps the location to get the thing onto the header
                res.append('Location', "localhost:3000/api/tasks/" + task.id);    
                res.status(201).send();    
            });
        }
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

            if (!task)//catch invalid id
            {
                res.status(404).json({
                    "errorType" : "No task with ID " + req.params.id + " exists"
                }).send();
            }
            else res.json(task);
        }).select('-__v');//this gets rid of that uncalled for variable mongo adds
    }

    //patches a task
    public updateTask (req: Request, res: Response) {   
        
       if(req.body.description == "" || req.body.description == null)// catch empty descriptions
        {
            res.status(400).json({
                "errorType" : "Description must not be null or empty."
            }).send();
        }
        else if (req.body.isComplete == null) { //catch null is-complete
            res.status(400).json({
                "errorType" : "isComplete must not be null."
            }).send();
        }
        else
        {
            if (req.body.isComplete) // if project completed, add date completed
            {
                req.body.dateCompleted = Date.now();
            }
            Task.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), req.body, { new: true }, (err, task) => {
                if (!task)
                {
                    res.status(404).json({
                        "errorType" : "No task with ID " + req.params.id + " exists"
                    }).send();
                }
                else res.status(204).send();
            });
        }   
    }
}
