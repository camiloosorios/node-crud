# CRUD NODE - Documentación de API REST

## Descripción

"CRUD NODE" es un backend que permite a los usuarios registrarse para poder crear, ver, editar y eliminar productos, además de comprar productos como usuario, todo basado en el patrón de diseño Modelo-Vista-Controlador (MVC). Las opciones de crear, editar y eliminar productos solo puede ser realizada por usuarios autorizados, por lo que ademas de autenticación se maneja el concepto de autorización dependiendo de la acción a realizar.

## Base URL

La URL base de la API es: `http://localhost:8080`

## Ambiente del Proyecto

### Requisitos Previos

Asegúrate de tener instalados los siguientes componentes antes de comenzar:

- Node.js (versión 16+)
- PostgreSQL (versión 15)
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

La API "CRUD NODE" maneja diferentes roles de usuario para determinar qué acciones pueden realizar en la aplicación. Hay dos roles principales: "user" y "admin". Las acciones permitidas para cada rol son las siguientes:

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

Parámetros en el cuerpo de la solicitud:
- `userId`: ID del usuario que realiza la compra (número, obligatorio).
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

Pasos para poner en funcionamiento la aplicacion:
1. copiar el .env.example y renombrarlo a .env
2. agregar todas las variables de entorno
3. docker-compose build
4. docker-compose up -d