import { APIGatewayProxyEvent } from 'aws-lambda';

export interface MyparamtersApi extends APIGatewayProxyEvent{

    pathParameters: {
        codigo: string;
    };
}