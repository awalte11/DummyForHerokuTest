import {Request, Response} from "express";
import {TaskController } from "./controller";

export class Routes {  
    public taskController: TaskController = new TaskController();     
    public routes(app): void {          

        
        
        /**
         *  get specific task
         */
        app.route('/api/tasks/:id').get(this.taskController.getTaskWithID)

        /**
         * update task
        */
        .patch(this.taskController.updateTask);  
        
        /**
         * Get all tasks
         */
        app.route('/api/tasks').get(this.taskController.getTasks)   
        
        
        /**
         * create Task
         */
        .post(this.taskController.addNewTask);


    }
}