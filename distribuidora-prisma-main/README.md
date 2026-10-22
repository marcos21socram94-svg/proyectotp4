# Distribuidora - Backend (TP N° 5)

API REST de una distribuidora de alimentos y bebidas. Usa **Node.js, Express, TypeScript y Prisma ORM** con base de datos **MySQL**.

## Cómo ponerlo a andar

1. Abrir XAMPP y encender **MySQL**.
2. Importar `database.sql` (phpMyAdmin > Importar, o `mysql -u root < database.sql`). Crea la base `distribuidora_db` con sus tablas y datos de prueba.
3. Copiar `.env.example` como `.env` (si MySQL tiene clave, cambiarla en `DATABASE_URL`).
4. En la carpeta del proyecto:

```bash
npm install        # instala todo y genera el cliente de Prisma
npm run dev        # arranca el servidor en http://localhost:3000
```

5. Probar: importar `postman_collection.json` en Postman y ejecutar la colección completa (Runner).

> Alternativa sin `database.sql`: `npx prisma db push` crea las tablas desde `prisma/schema.prisma` (sin datos de prueba).

## Estructura

```
prisma/schema.prisma   -> modelo de la base (tablas y relaciones)
database.sql           -> script para recrear la base
esquema_relacional.jpg -> diagrama de tablas
postman_collection.json-> casos de prueba de todos los endpoints
src/
  server.ts            -> enciende el servidor
  app.ts               -> configura Express y registra las rutas
  config/prisma.ts     -> conexión a la base (Connection Pool)
  routes/              -> URL + método HTTP  -> función del controlador
  controllers/         -> validan datos y arman la respuesta
  models/              -> única capa que consulta la base (Prisma)
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
https://github.com/marcos21socram94-svg/proyectotp4