# F35---EA3
## Enunciado:
La universidad Digital de Antioquia necesita llevar el control de los equipos de cómputo
(computadores (escritorio y portátiles), mouse, teclado, monitores, etc.), móviles (celulares, 
tabletas, parlantes, etc.), etc. Para ello requiere contar con una aplicación web en donde se 
registren los datos de los distintos equipos que tienen actualmente en su inventario para tener un 
mejor control de dichos equipos. El sistema deberá contar con los siguientes 4 módulos:

### Módulo de tipo de equipo
Este módulo permitirá registrar los tipos de equipos que tendrá el sistema. En el requerimiento se 
definen dos (2) (computo, móviles), pero podrán existir más en la medida que el sistema se 
coloque en marcha. Para este módulo se necesitará guardar la siguiente información por cada tipo 
de computo:
I. Nombre.
II. Estado (Activo o inactivo).
III. Fecha creación.
IV. Fecha de actualización.
El sistema permitirá la creación y edición de los tipos de equipo.

### Módulo de estado de equipo
Este módulo permitirá registrar los estados en los cuales se podrá encontrar un equipo en un 
determinado momento (en uso, en bodega, depreciado, etc.). Para este módulo se necesitará 
guardar la siguiente información por cada tipo de computo:
V. Nombre.
VI. Estado (Activo o inactivo).
VII. Fecha creación.
VIII. Fecha de actualización.
El sistema permitirá la creación y edición de los tipos de equipo.

### Módulo de usuarios
Este módulo permitirá registrar los distintos usuarios que tendrán a cargo los equipos del inventario.
Para este módulo se necesitará guardar la siguiente información por cada usuario:
I. Nombre.
II. Email.
III. Estado (Activo o inactivo).
IV. Fecha creación.
V. Fecha de actualización.
El sistema permitirá la creación y edición de usuarios.
Elaborado por Adrián López Morales

### Módulo de marcas
Este módulo permitirá registrar las distintas marcas de los equipos. Para este módulo se necesitará 
guardar la siguiente información para cada marca:
I. Nombre.
II. Estado (Activo o inactivo).
III. Fecha creación.
IV. Fecha de actualización.
El sistema permitirá la creación y edición de las marcas.

### Módulo de inventario
Este módulo se encargará de registrar los distintos equipos del inventario. Para este módulo se 
necesitará guardar la siguiente información:
I. Serial: campo único.
II. Modelo: campo único.
III. Descripción.
V. Color.
VI. Fecha de compra.
VII. Precio.
VIII. Usuario a cargo. El sistema deberá permitir la selección de sólo los usuarios activos definidos
en el modelo de usuarios.
IX. Marca. El sistema deberá permitir la selección de solo las marcas activas definidas en el
módulo de marcas.
X. Estado del equipo. El sistema deberá permitir la selección de solo los estados definidos en 
el módulo de estados de equipo.
XI. Tipo de equipo. El sistema deberá permitir la selección de solo los tipos definidos en el 
módulo de tipos de equipo.
El sistema permitirá la creación y edición de los equipos del inventario