'use strict';
import { v4 as uuidv4 } from 'uuid';

import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { getAllTasks, getTaskById, saveTask } from '../model/model-task';
import * as validator from '../validator/uuidRegex';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

//INTERFACE
import {MyTask,TaskData} from '../interfaces/task'


/**
* Funcion cosumo-api: Maneja la lógica para pode realizar peticiones get de todas las task
* 
*/

export const serviceGetAllTasks = async (): Promise<APIGatewayProxyResult> => {
  try {
    console.log('GetTasks INIT');
    const tasks = await getAllTasks();
    console.log('Lista de tasks ', tasks);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Datos Cargados Correctamente',
        data: tasks
      })
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Error al cargar los datos de la Task',
        error: error
      })
    };
  }
};

/**
* Funcion cosumo-api: Maneja la lógica para pode realizar peticiones get de una Task Especifica
* 
*/

export const serviceGetTask = async (event: MyTask): Promise<APIGatewayProxyResult> => {
  try {
    console.log('GetTask INIT');

    const { id } = event.pathParameters;

    // Validar si el ID es un UUID válido
    if (!validator.validateUUID(id)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'El ID ingresado no es válido'
        })
      };
    }

    // Obtener la task desde la base de datos
    const result = await getTaskById(id);

    console.log('Data ', result);

    // Validar si la task existe
    if (!result) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'La task no existe'
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Datos Cargados Correctamente',
        data: result
      })
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Error al cargar los datos',
        error: error
      })
    };
  }
};

/**
* Funcion cosumo-api: Maneja la lógica para poder guardar las tasks
* 
*/


export const servicePostTask = async (event: MyTask): Promise<APIGatewayProxyResult> => {

  try {
    console.log('postTask INIT');

     // Verificar si event.body existe y no es null
     if (!event.body) {
      throw new Error('Cuerpo de la solicitud faltante');
    }
    
    const parsedBody: TaskData = JSON.parse(event.body);
    const { nombre, descripcion } = parsedBody;

    if (!event.body || !nombre || !descripcion) {
      throw new Error('Parámetros faltantes o incorrectos');
    }

    console.log('Data de Input ', nombre, descripcion);

    const createAt = new Date().getTime();
    const id = uuidv4();
    console.log('ID ', id);

    const task:TaskData = {
      id:id,
      nombre:nombre,
      descripcion:descripcion,
      createAt:createAt
    };

    // GUARDAR LOS DATOS
    await saveTask(task);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Almacenado Correctamente',
        data: task
      })
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Error al guardar los datos',
        error: error
      })
    };
  }
};



