// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();



class App {

    public app: express.Application;
    public mongoUrl: string = process.env.URL + 'homework?retryWrites=true';//causes it to look to the proper databse on a mongo setup

    public routePrv: Routes = new Routes();

    //The below just build things
    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();           
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);    
    }

}

export default new App().app;