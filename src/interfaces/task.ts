import { APIGatewayProxyEvent } from 'aws-lambda';

export interface MyTask extends APIGatewayProxyEvent{

    pathParameters: {

        id:string;
        nombre: string;
        descripcion:string;
       
    };
}


export interface TaskData {
    id: string;
    nombre: string;
    descripcion: string;
    createAt: number;
  }