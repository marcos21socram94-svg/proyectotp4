import { PrismaClient } from '@prisma/client';

// DATOS DE PRUEBA cargados con Prisma (reemplaza al viejo database.sql).
// Se ejecuta con: npx prisma db seed
// Borra todo y vuelve a cargar los mismos datos, así se puede correr varias veces.
const prisma = new PrismaClient();

async function main() {
  // Se borra en orden inverso a las relaciones (primero los hijos)
  await prisma.detallePedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.proveedor.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.empleado.deleteMany();
  await prisma.companiaEnvio.deleteMany();

  await prisma.proveedor.createMany({
    data: [
      { id: 1, nombre: 'Alimentos del Sur', telefono: '2984001122', correo: 'ventas@alimentosdelsur.com' },
      { id: 2, nombre: 'Bebidas Patagonia', telefono: '2984003344', correo: 'contacto@bebidaspatagonia.com' },
    ],
  });

  await prisma.producto.createMany({
    data: [
      { id: 1, tipo: 'Alimenticio', nombre: 'Fideos Tallarín 500g', precio: 1200, vencimiento: new Date('2027-03-15'), proveedorId: 1 },
      { id: 2, tipo: 'Alimenticio', nombre: 'Arroz Largo Fino 1kg', precio: 1800, vencimiento: new Date('2027-06-30'), proveedorId: 1 },
      { id: 3, tipo: 'Alimenticio', nombre: 'Aceite de Girasol 1L', precio: 2500, vencimiento: new Date('2027-01-20'), proveedorId: 1 },
      { id: 4, tipo: 'Bebida', nombre: 'Gaseosa Cola 2L', precio: 2200, vencimiento: new Date('2027-02-10'), proveedorId: 2 },
      { id: 5, tipo: 'Bebida', nombre: 'Agua Mineral 1.5L', precio: 900, vencimiento: new Date('2027-08-05'), proveedorId: 2 },
    ],
  });

  await prisma.cliente.createMany({
    data: [
      { id: 1, nombreApellido: 'Lucía Fernández', telefono: '2984111111', dni: '30111222', correo: 'lucia.fernandez@ejemplo.com' },
      { id: 2, nombreApellido: 'Martín Gómez', telefono: '2984222222', dni: '28333444', correo: 'martin.gomez@ejemplo.com' },
      { id: 3, nombreApellido: 'Sofía Herrera', telefono: '2984333333', dni: '35555666', correo: 'sofia.herrera@ejemplo.com' },
    ],
  });

  await prisma.empleado.createMany({
    data: [
      { id: 1, dni: '27888999', fechaNacimiento: new Date('1990-04-12'), nombreApellido: 'Carolina Ruiz', correo: 'carolina.ruiz@distribuidora.com', telefono: '2984444444', obraSocial: 'OSDE' },
      { id: 2, dni: '31222333', fechaNacimiento: new Date('1995-09-03'), nombreApellido: 'Diego Navarro', correo: 'diego.navarro@distribuidora.com', telefono: '2984555555', obraSocial: 'Swiss Medical' },
    ],
  });

  await prisma.companiaEnvio.createMany({
    data: [
      { id: 1, nombre: 'Envíos Rápidos', correo: 'info@enviosrapidos.com', telefono: '2984666666' },
      { id: 2, nombre: 'Logística Norte', correo: 'info@logisticanorte.com', telefono: '2984777777' },
    ],
  });

  await prisma.pedido.createMany({
    data: [
      { id: 1, fecha: new Date('2026-09-10'), clienteId: 1, companiaId: 1, empleadoId: 1 },
      { id: 2, fecha: new Date('2026-09-25'), clienteId: 2, companiaId: 2, empleadoId: 2 },
      { id: 3, fecha: new Date('2026-10-05'), clienteId: 1, companiaId: null, empleadoId: 1 },
    ],
  });

  await prisma.detallePedido.createMany({
    data: [
      { id: 1, pedidoId: 1, productoId: 1, cantidad: 10, precioUnitario: 1200 },
      { id: 2, pedidoId: 1, productoId: 4, cantidad: 6, precioUnitario: 2200 },
      { id: 3, pedidoId: 2, productoId: 2, cantidad: 5, precioUnitario: 1800 },
      { id: 4, pedidoId: 2, productoId: 5, cantidad: 12, precioUnitario: 900 },
      { id: 5, pedidoId: 3, productoId: 3, cantidad: 4, precioUnitario: 2500 },
      { id: 6, pedidoId: 3, productoId: 1, cantidad: 8, precioUnitario: 1200 },
    ],
  });

  console.log('Datos de prueba cargados correctamente');
}

main()
  .catch((e) => {
    console.error('Error al cargar los datos de prueba:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
