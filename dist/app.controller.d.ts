import { AppService } from './app.service';
import { Response } from 'express';
interface FindGenRequestModel {
    gen: string;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    findGen(response: Response, model: FindGenRequestModel): Promise<void>;
    private validateGen;
}
export {};
