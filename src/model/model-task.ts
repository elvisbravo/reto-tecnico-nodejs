import * as AWS from 'aws-sdk';
import {MyTask,TaskData} from '../interfaces/task'
// Función para poder consultar todos los datos de la tabla MarcaTable
const getAllTasks = async () => {

     
  const params = {
    TableName: 'TaskTable',
  };

  const dynamodb=new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(params).promise();
  const marcas = result.Items;
  return marcas as TaskData[];

  


};

// Función para poder consultar una marca específica por ID
const getTaskById = async (id: string) => {

  const dynamodb=new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.get({
    TableName: 'TaskTable',
    Key: {
      id: id
    }
  }).promise();

  return result.Item as TaskData;


};

// Función para poder guardar los datos en la tabla
const saveTask = async (marca: TaskData) => {
  const dynamodb=new AWS.DynamoDB.DocumentClient();

  await dynamodb.put({
    TableName:'TaskTable',
    Item:marca
 }).promise()
};

export { getAllTasks, getTaskById, saveTask };
