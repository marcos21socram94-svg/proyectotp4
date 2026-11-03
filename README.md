# Distribuidora - Backend (TP N° 5)

API REST de una distribuidora de alimentos y bebidas. Usa **Node.js, Express, TypeScript y Prisma ORM** con base de datos **MySQL**.

## Cómo ponerlo a andar

La base de datos se crea **desde el ORM (Prisma)**, a partir de `prisma/schema.prisma`. No hace falta importar ningún archivo `.sql`.

1. Abrir XAMPP y encender **MySQL** (no hace falta crear la base a mano: Prisma la crea).
2. Copiar `.env.example` como `.env`. Si MySQL tiene clave, cambiarla en `DATABASE_URL`:

```
DATABASE_URL="mysql://USUARIO:CLAVE@localhost:3306/distribuidora_db?connection_limit=10&pool_timeout=20"
```

3. Instalar las dependencias (también genera el cliente de Prisma):

```bash
npm install
```

4. Crear la base y las tablas desde el esquema de Prisma:

```bash
npx prisma db push
```

Este comando lee `prisma/schema.prisma`, crea la base `distribuidora_db` si no existe y arma todas las tablas, relaciones e índices.

5. Cargar los datos de prueba (proveedores, productos, clientes, empleados, compañías y pedidos):

```bash
npx prisma db seed
```

Ejecuta `prisma/seed.ts`. Se puede correr las veces que haga falta: borra los datos y los vuelve a cargar.

> Atajo: `npm run db:setup` hace los pasos 4 y 5 juntos.

6. Arrancar el servidor:

```bash
npm run dev        # http://localhost:3000
```

7. Probar: importar `postman_collection.json` en Postman y ejecutar la colección completa (Runner). Antes de cada corrida conviene volver a cargar los datos con `npx prisma db seed`.

Para ver las tablas y los datos en el navegador: `npx prisma studio`.

## Capa de validación

Todas las rutas que reciben datos pasan primero por un middleware de validación (`src/validations`) antes de llegar al controlador:

- `validador.ts`: reglas genéricas (texto, entero, decimal, fecha AAAA-MM-DD, correo, DNI de 7 u 8 números, teléfono) y los middlewares `validarBody`, `validarId` y `validarCon`.
- `<recurso>Validation.ts`: las reglas de cada recurso, con los mismos largos que el esquema de Prisma.

Si algo no cumple, la API responde **400** con la lista completa de errores, por ejemplo:

```json
{
  "status": "error",
  "mensaje": "Datos inválidos",
  "errores": ["dni debe tener 7 u 8 números, sin puntos", "correo no es un correo válido"]
}
```

También rechaza campos que no existen en el recurso y, en los pedidos, **un mismo producto repetido en el detalle** (se carga una sola vez con la cantidad total). Además, la base tiene un índice único `(id_pedido, id_producto)` como segunda barrera.

## Respuestas

Al crear, actualizar o eliminar, la API devuelve un mensaje para mostrar en el frontend, junto con el registro:

```json
{ "status": "ok", "mensaje": "Cliente creado con éxito", "data": { "id": 4, "nombreApellido": "Ana Pérez", "...": "..." } }
```

Los errores siempre tienen la forma `{ "status": "error", "mensaje": "..." }`.

## Estructura

```
prisma/schema.prisma   -> modelo de la base (tablas y relaciones); de acá se crea la base
prisma/seed.ts         -> datos de prueba (npx prisma db seed)
esquema_relacional.jpg -> diagrama de tablas
postman_collection.json-> casos de prueba de todos los endpoints
src/
  server.ts            -> enciende el servidor
  app.ts               -> configura Express y registra las rutas
  config/prisma.ts     -> conexión a la base (Connection Pool)
  routes/              -> URL + método HTTP  -> función del controlador
  controllers/         -> validan datos y arman la respuesta
  models/              -> única capa que consulta la base (Prisma)
  validations/         -> capa de validación (middlewares antes del controlador)
  middlewares/errorHandler.ts -> manejo global de errores
  utils/helpers.ts     -> validaciones chicas
```

## Endpoints

Recursos: `/api/proveedores`, `/api/productos`, `/api/clientes`, `/api/empleados`, `/api/envios`, `/api/pedidos`. Todos tienen:

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/api/<recurso>` | Lista (con filtros opcionales por URL) |
| GET | `/api/<recurso>/:id` | Un registro con sus relaciones |
| POST | `/api/<recurso>` | Crea |
| PUT | `/api/<recurso>/:id` | Actualiza |
| DELETE | `/api/<recurso>/:id` | Elimina |
| GET | `/api/<recurso>/estadisticas` | Agregaciones (conteos, promedios, grupos) |

Extras con **SQL puro**: `GET /api/informes/ventas?desde=AAAA-MM-DD&hasta=AAAA-MM-DD` (`$queryRaw`) y `PATCH /api/productos/ajustar-precios` (`$executeRaw`).

## Subir a GitHub

```bash
git init
git add .
git commit -m "TP5: Express + TypeScript + Prisma"
git branch -M main
git remote add origin <URL-DEL-REPOSITORIO>
git push -u origin main
```
