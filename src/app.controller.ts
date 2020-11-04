import {Controller, Get, Param, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

interface FindGenRequestModel {
  gen: string;
}

interface ValidationResult {
  valid: boolean;
  errorMessage: string;
}

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService
  ) {}

  @Get('/genes/find/:gen')
  async findGen(
      @Res() response: Response,
      @Param() model: FindGenRequestModel
  ): Promise<void> {
    const validationResult = this.validateGen(model);
    if(!validationResult.valid){
      response.status(400);
      response.json({
        status: 'Failed',
        message: validationResult.errorMessage
      })
      return;
    }

    const wasGenFound = this.appService.getGen(model.gen);
    if(wasGenFound){
      response.status(200);
      response.json({
        status: 'Success',
        message: 'Found'
      })
    } else {
      response.status(404);
      response.json({
        status: 'Success',
        message: 'Not found'
      })
    }
  }

  private validateGen(params: FindGenRequestModel): ValidationResult {
    const result = {
      valid: true,
      errorMessage: ''
    }
    if(!params.gen.startsWith(this.appService.prefix)){
      result.valid = false
      result.errorMessage = "Gen provided doesn't have correct prefix"
    }

    return result;
  }
}
