import {Request, Response} from "express";
import {TaskController } from "./controller";

export class Routes {  
    public taskController: TaskController = new TaskController();     
    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })   
        // General actions 
        
        // GET endpoint 
        /**
         * Get all tasks
         */
        app.route('/api/tasks').get(this.taskController.getTasks)   
        // POST endpoint
        .post(this.taskController.addNewTask);

        // task detail
        app.route('/api/tasks/:Id')
        // get specific task
        .get((req: Request, res: Response) => {
        // Get a single task detail            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        .patch((req: Request, res: Response) => {
        // Update a contact           
            res.status(200).send({
                message: 'PUT request successfulll!!!!'
            })
        })         
    }
}