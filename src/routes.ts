import {Request, Response} from "express";

export class Routes {       
    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })   
        // General actions 
        app.route('/api/tasks') 
        // GET endpoint 
        .get((req: Request, res: Response) => {
        // Get all tasks            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })        
        // POST endpoint
        .post((req: Request, res: Response) => {   
        // Create new task         
            res.status(200).send({
                message: 'POST request successfulll!!!!'
            })
        })

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