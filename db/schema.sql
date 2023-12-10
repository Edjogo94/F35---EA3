CREATE TABLE
    TipoEquipo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        estado ENUM ('Activo', 'Inactivo') NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    EstadoEquipo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        estado ENUM ('Activo', 'Inactivo') NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    rol ENUM('administrador', 'docente') NOT NULL,
    estado ENUM('Activo', 'Inactivo') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE
    Marca (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        estado ENUM ('Activo', 'Inactivo') NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    Inventario (
        serial VARCHAR(255) PRIMARY KEY,
        modelo VARCHAR(255) NOT NULL,
        descripcion TEXT,
        color VARCHAR(255),
        fecha_compra DATE,
        precio DECIMAL(10, 2),
        usuario_id INT,
        marca_id INT,
        estado_equipo_id INT,
        tipo_equipo_id INT,
        FOREIGN KEY (usuario_id) REFERENCES Usuario (id),
        FOREIGN KEY (marca_id) REFERENCES Marca (id),
        FOREIGN KEY (estado_equipo_id) REFERENCES EstadoEquipo (id),
        FOREIGN KEY (tipo_equipo_id) REFERENCES TipoEquipo (id)
    )