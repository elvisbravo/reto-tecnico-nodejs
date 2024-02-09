import axios from 'axios';
import Config from '../context/config';
import {translateFields} from '../translate/translate';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {MyparamtersApi} from '../interfaces/parametersApi'

/**
* Funcion cosumo-api: Maneja la lógica para consumir el api de GETSWAPI- Devuelve todos la data de person
* 
*/

export const servicioALLGETSWAPI = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
      console.log('getclienteInfoAll INIT');

      let url = Config.SWAPI_PEOPLE_ALL;
      console.log('Url del api ' + url);

      const response = await axios.get(url);
      console.log('Data ' + JSON.stringify(response.data));

      const data = translateFields(response.data.results, false);

      return {
          statusCode: 200,
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              message: 'Datos obtenidos correctamente',
              data: data
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
              message: 'Error al cargar los datos',
              error: error
          })
      };
  }
};

/**
* Funcion cosumo-api: Maneja la lógica para consumir el api de GETSWAPI- Devuelve un dato en especifico
* 
*/

export const servicioGETSWAPI = async (event: MyparamtersApi): Promise<APIGatewayProxyResult> => {
  try {
      console.log('getclienteInfo INIT');

      const { codigo } = event.pathParameters;

      let url = Config.SWAPI_PEOPLE;
      url = url.replace("[CODE]", codigo);
      console.log('Url del api ' + url);

      const response = await axios.get(url);
      console.log('Data ' + JSON.stringify(response.data));

      const data = translateFields(response.data, true);

      return {
          statusCode: 200,
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              message: 'Datos obtenidos correctamente',
              data: data
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
              message: 'Error al cargar los datos',
              error: error
          })
      };
  }
};