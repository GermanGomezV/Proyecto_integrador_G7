CREATE DATABASE AllMeetok;
USE AllMeetok;

CREATE TABLE IF NOT EXISTS categorias (
  id_categoria int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  PRIMARY KEY (id_categoria),
  UNIQUE KEY nombre_UNIQUE (nombre)
);

INSERT INTO `categorias` VALUES (1, "Bebida"), (2, "Picada"), (3, "Previa");

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(50) NOT NULL,
  apellido varchar(50) NOT NULL,
  correo varchar(100) NOT NULL,
  contrasena varchar(200) NOT NULL,
  direccion varchar(200) DEFAULT NULL,
  telefono bigint(20) DEFAULT NULL,
  fecha_nacimiento date NOT NULL,
  imagen varchar(100) DEFAULT NULL,
  PRIMARY KEY (id_usuario)
);
-- INSERT INTO usuarios (id_usuario, nombre, apellido, correo, contrasena, direccion, telefono, fecha_nacimiento,imagen ) VALUES (null );

CREATE TABLE IF NOT EXISTS compras (
  id_compra int(11) NOT NULL AUTO_INCREMENT,
  id_usuario_FK int(11) NOT NULL,
  fecha_compra datetime NOT NULL,
  PRIMARY KEY (id_compra),
  KEY compras_id_FK_idx (id_usuario_FK),
  CONSTRAINT id_usuario_FK FOREIGN KEY (id_usuario_FK) REFERENCES usuarios (id_usuario) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS productos (
  id_producto int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(50) NOT NULL,
  descripcion varchar(5000) DEFAULT NULL,
  precio int(11) NOT NULL,
  descuento int(11) DEFAULT NULL,
  id_categoria_FK int(11) DEFAULT NULL,
  imagen varchar(100) DEFAULT NULL,
  PRIMARY KEY (id_producto),
  KEY id_categoria_FK_idx (id_categoria_FK),
  CONSTRAINT id_categoria_FK FOREIGN KEY (id_categoria_FK) REFERENCES categorias (id_categoria) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO `productos` VALUES (1, "Fernet Branca", "El fernet es una bebida alcohólica amarga del tipo amaro elaborada a partir de varios tipos de hierbas (mirra, ruibarbo, manzanilla, cardamomo y azafrán, entre otras), que son maceradas en alcohol de uva, filtradas y añejadas en toneles de roble durante un período que puede ser de seis a doce meses.", 600, 10, 1, "product-1622663376784.jpg"), (2, "Coca Cola 2L", "Coca-Cola es la bebida más vendida en la historia desde 1886. Es la marca más famosa del mundo. Bien fría, hace disfrutar cada instante de la vida ya que añade magia a casa momento. ", 200, 10, 1, "product-1622653652971.jpg"), (3, "Vodka Absolut 1L", "Absolut Vodka se hace exclusivamente a partir de ingredientes naturales y, a diferencia de lo que ocurre con muchos otros vodkas, no contiene azúcar añadido.", 1143, 35, 1, "absolut.jpg"), (4, "Aperol Sprit 1L", "Aperol esta compuesto de naranja amarga, ruibarbo, gentiana, cinchona. Aunque sabe y huele muy similar al Campari, Aperol tiene una graduación alcohólica de 11%, menos de la mitad que Campari. Sin embargo, es más suave y menos amargo, mientras que el Campari es más oscuro de color.", 503, 20, 1, "aperol.jpg"), (5, "Red Bull", "Red Bull Energy Drink es reconocida mundialmente por los mejores atletas, estudiantes y profesiones de alta demanda, incluso durante largas jornadas de manejo.", 120, 50, 1, "redbull.PNG"), (6, "Citric Naranja", "Jugo De Naranja Valencia Tardia Citric 1,5lt.", 170, 10, 1, "citric.PNG"), (7, "Sprite Zero", "Sprite Zero es una versión sin calorías y baja en sodio que ofrece hidratación con el mismo sabor natural lima-limón más famoso del mundo.", 138, 10, 1, "spritezero.PNG"), (8, "Sprite Lima Limón", "Bebida sin alcohol artificial dietética gasificada con sabor a lima-limón.", 120, 20, 1, "spritelimalimon.PNG"), (9, "Santa Julia Magna", "La linea Magna esta elaborada a partir de uvas seleccionadas en viñedos de altura, de muy bajo rendimientos y crianza de más de 10 meses en barricas de roble fránces.", 269, 3, 1, "magna.png"), (10, "Fernet Branca Menta", "El fernet es una bebida alcohólica amarga elaborada a partir de varios tipos de hierbas, que son maceradas en alcohol de uva, filtradas y añejadas en toneles de roble durante un período que puede ser de 6 a 12 meses.", 650, 3, 1, "branca-menta-750.png"), (11, "Speed Unlimited", "Speed Unlimited Energy Drink es una bebida sin alcohol, que contiene Cafeína, Taurina y Vitaminas. Speed Unlimited Energy Drink ayuda a estimular el metabolismo de la energía, facilita la eliminación de toxinas, contribuye a mejorar el estado de animo, la concentración y la recuperación.", 70, 5, 1, "speed.PNG");

CREATE TABLE IF NOT EXISTS compras_productos (
  id_compras_productos int(11) NOT NULL AUTO_INCREMENT,
  id_compra_FK int(11) NOT NULL,
  id_producto_FK int(11) NOT NULL,
  cantidad int(11) NOT NULL,
  subtotal int(11) NOT NULL,
  PRIMARY KEY (id_compras_productos),
  KEY id_producto_FK_idx (id_producto_FK),
  KEY id_compra_FK_idx (id_compra_FK),
  CONSTRAINT id_compra_FK FOREIGN KEY (id_compra_FK) REFERENCES compras (id_compra) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT id_producto_FK FOREIGN KEY (id_producto_FK) REFERENCES productos (id_producto) ON DELETE NO ACTION ON UPDATE NO ACTION
);





