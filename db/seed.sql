INSERT INTO
    TipoEquipo (nombre, estado)
VALUES
    ('Laptop', 'Activo'),
    ('Proyector', 'Activo'),
    ('Impresora', 'Activo');

INSERT INTO
    EstadoEquipo (nombre, estado)
VALUES
    ('En uso', 'Activo'),
    ('Fuera de servicio', 'Activo'),
    ('En reparación', 'Activo');

INSERT INTO
    Usuario (nombre, email, password, rol, estado)
VALUES
    (
        'Admin',
        'admin@example.com',
        '$2a$10$lN8wdjvsTwtjNMCpGMBxz.8MQ2OprOUrE6QMFFlsZz0OWLrL4w1Xi',
        'administrador',
        'Activo'
    ),
    (
        'Docente',
        'docente@example.com',
        '$2a$10$lN8wdjvsTwtjNMCpGMBxz.8MQ2OprOUrE6QMFFlsZz0OWLrL4w1Xi',
        'docente',
        'Activo'
    );

INSERT INTO
    Marca (nombre, estado)
VALUES
    ('HP', 'Activo'),
    ('Dell', 'Activo'),
    ('Epson', 'Activo');

INSERT INTO
    Inventario (
        serial,
        modelo,
        descripcion,
        color,
        fecha_compra,
        precio,
        usuario_id,
        marca_id,
        estado_equipo_id,
        tipo_equipo_id
    )
VALUES
    (
        'ABC123',
        'Modelo1',
        'Descripción del equipo 1',
        'Negro',
        '2023-01-01',
        1200.00,
        1,
        1,
        1,
        1
    ),
    (
        'DEF456',
        'Modelo2',
        'Descripción del equipo 2',
        'Blanco',
        '2023-02-01',
        800.00,
        2,
        2,
        2,
        2
    ),
    (
        'GHI789',
        'Modelo3',
        'Descripción del equipo 3',
        'Rojo',
        '2023-03-01',
        1500.00,
        1,
        3,
        1,
        3
    )