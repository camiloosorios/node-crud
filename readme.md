# CRUD NODE - Documentación de API REST

![CRUD NODE Logo](link-to-your-logo.png)

## Descripción

"CRUD NODE" es un backend que permite a los usuarios registrarse para poder crear, ver, editar y eliminar productos, además de comprar productos como usuario, todo basado en el patrón de diseño Modelo-Vista-Controlador (MVC). Las opciones de crear, editar y eliminar productos solo puede ser realizada por usuarios autorizados, por lo que ademas de autenticación se maneja el concepto de autorización dependiendo de la acción a realizar.

## Base URL

La URL base de la API es: `http://localhost:8080`

## Autenticación

Para acceder a las funcionalidades de la API, los usuarios deben autenticarse y obtener un token de acceso. Para ello, envía una solicitud POST a `/api/auth/login` con las credenciales (correo electrónico y contraseña) y obtendrás un token de acceso válido.

## Endpoints

### Autenticación

#### `POST /api/auth/login`

Descripción: Iniciar sesión y obtener un token de acceso.

Parámetros en el cuerpo de la solicitud:
- `email`: Correo electrónico del usuario (cadena, obligatorio).
- `password`: Contraseña del usuario (cadena, obligatorio).

Respuesta:
- `200 OK`: Inicio de sesión exitoso, se devuelve un token de acceso.

### Productos

#### `GET /api/products`

Descripción: Obtener la lista de productos.

Parámetros de consulta:
- `page`: Número de página (opcional).
- `limit`: Número máximo de elementos por página (opcional).

Respuesta:
- `200 OK`: Lista de productos.

#### `POST /api/products`

Descripción: Crear un nuevo producto.

Parámetros en el cuerpo de la solicitud:
- `name`: Nombre del producto (cadena, obligatorio).
- `price`: Precio del producto (número, obligatorio).
- ...

Respuesta:
- `201 Created`: Producto creado exitosamente.
- `400 Bad Request`: Error en los datos proporcionados.

Y así sucesivamente para los endpoints de edición, eliminación y detalles de productos.

### Compras

#### `POST /api/purchases`

Descripción: Realizar una compra de productos.

Parámetros en el cuerpo de la solicitud:
- `userId`: ID del usuario que realiza la compra (número, obligatorio).
- `products`: Array de objetos con detalles de productos y cantidades.

Respuesta:
- `200 OK`: Compra realizada exitosamente.

## Ejemplos

Aquí hay algunos ejemplos de cómo interactuar con la API:

### Ejemplo: Iniciar sesión y obtener token de acceso

```shell
curl -X POST http://localhost:8080/api/auth/login -d "email=usuario@example.com&password=contraseña"


Pasos para poner en funcionamiento la aplicacion:
1. copiar el .env.example y renombrarlo a .env
2. agregar todas las variables de entorno
3. docker-compose build
4. docker-compose up -d