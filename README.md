# 🐶 PABackEnd - API de Adopción de Mascotas

¡Buenas! Bienvenido al backend del sistema de adopciones. Acá vas a encontrar toda la data necesaria para entender cómo funciona la API, qué tecnologías usamos y cómo pegarle a los endpoints sin romper nada.

## 🛠️ Tecnologías

Para armar este proyecto, usamos un stack bastante sólido:

- **Node.js**: El motor que mueve todo.
- **Express**: Framework para manejar las rutas y los middlewares.
- **MongoDB & Mongoose**: Nuestra base de datos NoSQL y el ODM para modelar los datos.
- **Passport & JWT**: Para manejar la autenticación y seguridad de los usuarios (porque la seguridad ante todo, che).
- **Bcrypt**: Para hashear las contraseñas y que nadie se haga el vivo.
- **Faker.js**: Para generar datos de prueba y mockear usuarios/mascotas cuando haga falta.

## 🚀 Cómo levantarlo

Si querés correr esto en tu máquina local, seguí estos pasos:

1.  **Instalá las dependencias**:
    Mandale un `npm install` en la terminal para bajar todo lo necesario.

2.  **Configurá las variables de entorno**:
    Asegurate de tener el archivo `.env` configurado con tus credenciales (puerto, base de datos, etc.).

3.  **Corré el servidor**:
    - Para desarrollo (con nodemon): `npm run dev`
    - Para testear: `npm run test`

El servidor va a levantar (por defecto) en `http://localhost:8080` (o el puerto que hayas puesto en `.env`).

## 📡 Endpoints de la API

Acá tenés la lista de endpoints para que sepas dónde pegar.

### 🐾 Mascotas (`/api/pets`)

Manejo de los bichos disponibles para adoptar.

-   **POST `/`**: Crea una nueva mascota.
-   **GET `/`**: Te trae todas las mascotas.
-   **GET `/:pid`**: Buscás una mascota específica por su ID.
-   **PUT `/:pid`**: Actualizás la data de una mascota.
-   **DELETE `/:id`**: Borrás a la mascota del sistema (¡tratalos bien!).

### 👤 Usuarios (`/api/users`)

Información de la gente registrada.

-   **GET `/`**: Te lista todos los usuarios.

### 🏠 Adopciones (`/api/adoptions`)

Donde ocurre la magia de la adopción.

-   **POST `/:pid/user/:uid`**: Crea una adopción. Necesitás el ID de la mascota (`pid`) y el del usuario (`uid`).
-   **GET `/`**: Ves todas las adopciones realizadas.
-   **GET `/:aid`**: Buscás una adopción puntual por su ID.

### 🔑 Sesión (`/api/session`)

Para registrarse y loguearse.

-   **POST `/register`**: Creás un usuario nuevo.

### 🧪 Mocks (`/api/mocks`)

Si necesitás data falsa para probar cosas.

-   **GET `/mockingpets`**: Genera mascotas mockeadas.
-   **GET `/mockingusers`**: Genera usuarios mockeados.
-   **POST `/generateData/:users/:pets`**: Genera una cantidad específica de usuarios y mascotas falsos.

## 💾 Modelos de Datos

Te cuento un poco cómo guardamos la data en Mongo:

### **Users (Usuarios)**
La gente que usa la app.
- `first_name`, `last_name`: Nombre y apellido.
- `email`: El correo (es único, no se puede repetir).
- `password`: La contraseña encriptada.
- `role`: Puede ser `user` o `admin`.
- `adopted_pets`: Lista de mascotas que ya adoptó.

### **Pets (Mascotas)**
Los protagonistas.
- `name`: Nombre del bicho.
- `species`: Perro, gato, carpincho, etc.
- `birthDate`: Fecha de nacimiento.
- `adopted`: `true` si ya tiene dueño, `false` si busca hogar.
- `owner`: Referencia al usuario que lo adoptó (si tiene).
- `image`: Foto de la mascota.

### **Adoptions (Adopciones)**
El registro de quién se llevó a quién.
- `pet_id`: Referencia a la mascota.
- `owner_user_id`: Referencia al nuevo dueño.

---

¡Y eso es todo! Si tenés dudas, revisá el código o mandá un grito.
