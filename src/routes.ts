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
        
        
        /**
         * Get all tasks
         */
        app.route('/api/tasks').get(this.taskController.getTasks)   
        // POST endpoint
        .post(this.taskController.addNewTask);

        // get specific task
        app.route('/api/tasks/:id').get(this.taskController.getTaskWithID)
        
        .patch((req: Request, res: Response) => {
        // Update a contact           
            res.status(200).send({
                message: 'PUT request successfulll!!!!'
            })
        })         
    }
}