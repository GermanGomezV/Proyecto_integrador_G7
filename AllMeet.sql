CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `compras` (
  `id_compra` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_FK` int(11) NOT NULL,
  `fecha_compra` datetime NOT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `compras_id_FK_idx` (`id_usuario_FK`),
  CONSTRAINT `id_usuario_FK` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `compras_productos` (
  `id_compras_productos` int(11) NOT NULL AUTO_INCREMENT,
  `id_compra_FK` int(11) NOT NULL,
  `id_producto_FK` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  PRIMARY KEY (`id_compras_productos`),
  KEY `id_producto_FK_idx` (`id_producto_FK`),
  KEY `id_compra_FK_idx` (`id_compra_FK`),
  CONSTRAINT `id_compra_FK` FOREIGN KEY (`id_compra_FK`) REFERENCES `compras` (`id_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_producto_FK` FOREIGN KEY (`id_producto_FK`) REFERENCES `productos` (`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `descuento` int(11) DEFAULT NULL,
  `id_categoria_FK` int(11) DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria_FK_idx` (`id_categoria_FK`),
  CONSTRAINT `id_categoria_FK` FOREIGN KEY (`id_categoria_FK`) REFERENCES `categorias` (`id_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(200) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
