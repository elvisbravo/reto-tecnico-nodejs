# Api-Serverless-NodeJs

Prueba Técnica


## Development

Instalación de dependencias:

```bash
npm install
```

# Configuración IAM

En el archivo `serverless.yml`, asegúrate de configurar correctamente las declaraciones de IAM para acceder a tu tabla de DynamoDB. 

```yaml
provider:
  name: aws
  runtime: nodejs16.x
  region: us-east-1
  iamRoleStatements:
    - Effect: Allow
      Action: 
        - dynamodb:*
      Resource: 
        - arn:aws:table/NombreDeLaBaseDeDatos
```



#### Apis tasks

A continuación se detallan las APIs disponibles para gestionar las tasks:

**Endpoint: /api/tasks**

- `GET /api/tasks`: Obtiene todas las tasks existentes en la base de datos.

  Descripción: Esta solicitud obtiene todas las tasks registradas en la base de datos y devuelve una lista de tasks en formato JSON.
  Ejemplo de respuesta exitosa (código de estado 200):
    ```json
    [
        {
        "id": "1",
        "nombre": "Task 1",
        "descripcion": "Descripción de la Task 1",
        "createdAt": "2023-07-09T10:00:00Z"
        },
        {
        "id": "2",
        "nombre": "Task 2",
        "descripcion": "Descripción de la Task 2",
        "createdAt": "2023-07-09T11:00:00Z"
        },
    
    ]


- `GET /api/tasks/{id} `:Obtiene una Task específica según su ID.
Descripción: Esta solicitud obtiene una Task específica de la base de datos utilizando el ID proporcionado en la URL y devuelve los detalles de la Task en formato JSON.

Ejemplo de respuesta exitosa (código de estado 200):
 ```json
 {
   "id": "1",
   "nombre": "Task 1",
   "descripcion": "Descripción de la Task 1",
   "createdAt": "2023-07-09T10:00:00Z"
}

```
- `POST /api/tasks`: Crea una nueva Task en la base de datos.

  Descripción: Esta solicitud crea una nueva Task en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud en formato JSON.

  Ejemplo de cuerpo de solicitud:

  ```json
  {
    "nombre": "Nueva Task",
    "descripcion": "Descripción de la Nueva Task"             
  }

  Ejemplo de respuesta exitosa (código de estado 200):
 ```json
        {
        "id": "3",
        "nombre": "Nueva Task",
        "descripcion": "Descripción de la Nueva Task",
        "createdAt": "2023-07-09T12:00:00Z"
        }