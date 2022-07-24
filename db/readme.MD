<!-- ### Montar el schema
Para crear la base de datos corra el script "schema.sql".

#### Tabla de usuarios
Para poblar la tabla de usuarios utilice cualquier herramienta que permita insertar valores en una tabla desde el archivo "users.json" (por ejemplo, MySQL Workbench)


#### Tabla de productos
Para poblar la tabla de productos, amenidades e imágenes, ejecute con node el archivo "populate.js". -->

#### Base de Datos final:
Para poblar todas las tablas estos son los pasos a seguir al usar MySQL Workbench:

- Ir a Create Schema, seleccionar un nombre (por ejemplo tulugar), y apretar el boton apply hasta crearla.
- Ir a Server, clickear en Data Import, y seleccionar el archivo Tu-Lugar.sql desde la opcion que figura como Import from self-contained file. Ahi mismo donde dice Default Schema to be imported to, elegir el nombre que definieron anteriormente (por ejemplo tulugar). Por ultimo ver de seleccionar la opcion Dump Structure and Dat (suele estar puesta por defecto), y darle al boton Strat Import.
- Darle al boton de actualizar y listo.
(Ver nombre de data base en el config)
#### Password usuarios:
Para la gran mayoria de usuarios (en especial los ultimos creados) el password es 12345Vg!.

#### Administrador:
Para ingresar al dashboar como admin el password es 123.