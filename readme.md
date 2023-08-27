# CRUD NODE - Documentación de API REST

## Descripción

"CRUD NODE" es un backend que permite a los usuarios registrarse para poder crear, ver, editar y eliminar productos, además de la posibilidad de comprar productos. Las opciones de crear, editar y eliminar productos solo puede ser realizada por usuarios autorizados, por lo que se maneja tambien el concepto de autorización por medio de roles.

## Base URL

La URL base de la API es: `http://localhost:8080`

## Ambiente del Proyecto

### Requisitos Previos

Tener instalados los siguientes componentes antes de comenzar:

- Docker y Docker Compose

### Pasos para Configurar el Ambiente

1. **Clonar el Repositorio:**

   ```shell
   git clone https://github.com/camiloosorios/node-crud

2. **Configurar las variables de entorno:**
    Crear un archivo .env en el directorio raíz de tu proyecto y configura las variables de entorno necesarias. Utilizar el archivo .env.example como referencia.
   ```shell
    APP_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_PORT=
    JWT_EXPIRATION_TIME=
    SECRET_KEY=

3. **Construir la imagen del contenedor:**

   ```shell
   docker-compose build

4. **Levantar la aplicación:**

    ```shell
    docker-compose up -d

## Autenticación

Para acceder a las funcionalidades de la API, los usuarios deben autenticarse y obtener un token de acceso. Para ello, envía una solicitud POST a `/api/auth/login` con las credenciales (correo electrónico y contraseña) se obtendrá un token de acceso válido.

## Autorización Basada en Roles

La API "CRUD NODE" maneja roles de usuario para determinar qué acciones pueden realizar en la aplicación. Hay dos roles principales: "user" y "admin". Las acciones permitidas para cada rol son las siguientes:

- **Usuario ("user"):** Puede realizar las siguientes acciones:
  - Registrar una cuenta nueva.
  - Iniciar sesión para obtener un token de acceso.
  - Obtener la lista de productos.
  - Realizar compras de productos.

- **Administrador ("admin"):** Además de las acciones permitidas para el rol "user", un administrador también puede:
  - Crear nuevos productos.
  - Editar detalles de productos existentes.
  - Eliminar productos.

Para acceder a las funcionalidades adicionales disponibles para administradores, el usuario debe tener el rol "admin" si un usuario con rol "user" intenta realizar acciones que requieren el rol "admin", recibirá una respuesta con el código de estado "403 Forbidden" indicando que no tiene los permisos necesarios.

## Endpoints

### Registro de usuarios

#### `POST /api/auth/register`

Descripción: Registro de usuario y obtención de token.

Parámetros en el cuerpo de la solicitud:
- `name`: Nombre del usuario (cadena, obligatorio).
- `money`: Cantidad de dinero que tiene el usuario (numérico, obligatorio).
- `email`: Correo electrónico del usuario (cadena, obligatorio).
- `password`: Contraseña del usuario (cadena, obligatorio).

Respuesta:
- `201 Created`: Usuario creado correctamente, se devuelve un token de acceso.

### Autenticación de usuarios

#### `POST /api/auth/login`

Descripción: Iniciar sesión y obtener un token de acceso.

Parámetros en el cuerpo de la solicitud:
- `email`: Correo electrónico del usuario (cadena, obligatorio).
- `password`: Contraseña del usuario (cadena, obligatorio).

Respuesta:
- `200 OK`: Usuario autenticado correctamente, se devuelve un token de acceso.

### Productos

#### `GET /api/products`

Descripción: Obtener la lista de productos.

Encabezados de solicitud:
- `token`: Token de acceso del usuario (cadena, obligatorio).

Respuesta:
- `200 OK`: Lista de productos.

#### `POST /api/products`

Descripción: Crear un nuevo producto.

Encabezados de solicitud:
- `token`: Token de acceso del usuario (cadena, obligatorio).

Parámetros en el cuerpo de la solicitud:
- `name`: Nombre del producto (cadena, obligatorio).
- `category`: Categoria del producto (cadena, obligatorio).
- `price`: Precio del producto (número, obligatorio).
- `quantity`: Cantidad del producto (número, obligatorio).

Respuesta:
- `201 Created`: Producto creado satisfactoriamente.

#### `PATCH /api/products/:id`

Descripción: Editar un producto.

Encabezados de solicitud:
- `token`: Token de acceso del usuario (cadena, obligatorio).

Parámetros en la URL de la solicitud:
- `id`: ID del producto (cadena, obligatorio).

Respuesta:
- `200 OK`: Producto Actualizado correctamente.

#### `DELETE /api/products/:id`

Descripción: Eliminar un producto.

Encabezados de solicitud:
- `token`: Token de acceso del usuario (cadena, obligatorio).

Parámetros en el cuerpo de la solicitud:
- `id`: ID del producto (cadena, obligatorio).

Respuesta:
- `200 OK`: Producto eliminado correctamente.

### Compras

#### `POST /api/purchases`

Descripción: Realizar una compra de productos.

Encabezados de solicitud:
- `token`: Token de acceso del usuario (cadena, obligatorio).

Parámetros en el cuerpo de la solicitud:
- `products`: Array de objetos con el ID y la cantidad de productos.

Respuesta:
- `200 OK`: Compra realizada exitosamente.

#### Ejemplo de como debe lucir el arreglo de products

```shell
products = [
    { 
        "id": 1, 
        "quantity": 5 
    },
    { 
        "id": 2, 
        "quantity": 3 
    }
]
```
## Documentación de Respuestas de Errores

A continuación se detallan las posibles respuestas de error que la API puede devolver en caso de problemas. Estas respuestas estarán acompañadas de códigos de estado HTTP y mensajes descriptivos para ayudar en la depuración de problemas.

### Códigos de Estado Comunes

- `400 Bad Request`: Indica que la solicitud del cliente es incorrecta o inválida.
- `401 Unauthorized`: Indica que la solicitud no incluye la autenticación o la autenticación es inválida.
- `403 Forbidden`: Indica que el cliente no tiene permiso para acceder a un recurso o realizar una acción.
- `404 Not Found`: Indica que el recurso solicitado no se ha encontrado en el servidor.
- `500 Internal Server Error`: Indica que se ha producido un error en el servidor.

## Ejemplos de uso de Autorización

### Ejemplo de Solicitud para Crear un Nuevo Producto (Administrador Autenticado)

1. Abrir Postman y crear una nueva solicitud POST.
2. Ingresar la URL del endpoint para crear un nuevo producto: `http://localhost:8080/api/products`
3. En la sección "Headers", agregar un nuevo encabezado con la clave "token" y el valor "tu_token_de_acceso".
4. En la sección "Body", seleccionar "raw" y elige el formato "JSON (application/json)".
5. Ingresar los detalles del nuevo producto en formato JSON, por ejemplo:

```json
{
  "name": "Nuevo Producto",
  "category": "Categoria Producto",
  "price": 1000,
  "quantity": 50
}
```
6. Finalmente dar click en el botón enviar, si todo se hizo de forma correcta debera obtener un resultado como este:

```json
{
  "message": "Producto creado satisfactoriamente",
}
```

### Ejemplo de Solicitud para editar Producto (Administrador Autenticado)

1. Abrir Postman y crear una nueva solicitud PATCH.
2. Ingresar la URL del endpoint para crear un nuevo producto: `http://localhost:8080/api/products`
3. Agregar el ID del producto que desea actualizar, por ejemplo `http://localhost:8080/api/products/1`
4. En la sección "Headers", agregar un nuevo encabezado con la clave "token" y el valor "tu_token_de_acceso".
5. En la sección "Body", seleccionar "raw" y elegir el formato "JSON (application/json)".
6. Ingresar solamente los campos que quieres actualizar, por ejemplo:

```json
{
  "name": "Nuevo nombre de Producto",
}
```
7. Finalmente dar click en el botón enviar, si todo se hizo de forma correcta debera obtener un resultado como este:

```json
{
  "message": "Producto creado satisfactoriamente",
}
```

### Ejemplo de Solicitud para eliminar Producto (Administrador Autenticado)

1. Abrir Postman y crear una nueva solicitud DELETE.
2. Ingresar la URL del endpoint para crear un nuevo producto: `http://localhost:8080/api/products`
3. Agregar el ID del producto que desea eliminar, por ejemplo `http://localhost:8080/api/products/1`
4. En la sección "Headers", agregar un nuevo encabezado con la clave "token" y el valor "tu_token_de_acceso".
5. En la sección "Body", seleccionar "raw" y elegir el formato "JSON (application/json)".
6. Finalmente dar click en el botón enviar, si todo se hizo de forma correcta debera obtener un resultado como este:

```json
{
  "message": "Producto eliminado correctamente",
}
```
