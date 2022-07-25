-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tulugar
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `idadmin` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idadmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','123');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `product_id` int unsigned NOT NULL,
  `wifi` tinyint unsigned NOT NULL DEFAULT '0',
  `room_service` tinyint unsigned NOT NULL DEFAULT '0',
  `breakfast` tinyint unsigned NOT NULL DEFAULT '0',
  `pets` tinyint unsigned NOT NULL DEFAULT '0',
  `garage` tinyint unsigned NOT NULL DEFAULT '0',
  `linens` tinyint unsigned NOT NULL DEFAULT '0',
  `heating` tinyint unsigned NOT NULL DEFAULT '0',
  `air_conditioning` tinyint unsigned NOT NULL DEFAULT '0',
  `pool` tinyint unsigned NOT NULL DEFAULT '0',
  `grill` tinyint unsigned NOT NULL DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `uidx_amenities_pid` (`product_id`),
  CONSTRAINT `fk_amenities_pid` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (1,1,0,0,1,0,1,1,1,0,1,'2022-07-03 00:31:27'),(2,1,0,0,1,0,1,1,1,0,1,'2022-07-03 00:31:27'),(3,1,0,0,1,0,1,1,1,0,1,'2022-07-03 00:31:27'),(4,1,0,0,1,0,1,1,1,0,1,'2022-07-03 00:31:27'),(5,1,0,0,1,0,1,1,1,0,1,'2022-07-03 00:31:27'),(6,1,1,1,0,0,1,1,1,1,0,'2022-07-03 00:31:27'),(7,1,1,1,0,1,1,1,1,1,0,'2022-07-03 01:28:29'),(8,0,0,0,0,0,0,0,0,0,0,'2022-07-03 22:25:58'),(9,0,0,0,0,0,0,0,0,0,0,'2022-07-03 22:48:06'),(10,1,0,0,1,1,1,1,1,1,1,'2022-07-07 12:39:09'),(11,1,0,1,0,0,1,0,0,0,1,'2022-07-07 23:22:16'),(12,1,1,1,0,1,1,0,1,1,0,'2022-07-07 23:28:29'),(13,1,1,1,0,1,1,1,1,1,0,'2022-07-07 23:38:10'),(14,1,1,1,0,1,1,1,1,1,0,'2022-07-07 23:44:07'),(15,1,0,1,0,0,1,1,1,0,0,'2022-07-07 23:52:16'),(16,1,1,1,0,1,1,1,1,1,0,'2022-07-07 23:57:58'),(17,1,1,1,0,0,1,1,1,1,0,'2022-07-08 00:05:08');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `checkin` date NOT NULL,
  `checkout` date NOT NULL,
  `price` int DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_bookings_uid_pid` (`user_id`,`product_id`),
  KEY `fk_bookings_pid` (`product_id`),
  CONSTRAINT `fk_bookings_pid` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_bookings_uid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `product_id` int unsigned NOT NULL,
  `image1` varchar(255) DEFAULT 'default.jpg',
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `image4` varchar(255) DEFAULT NULL,
  `image5` varchar(255) DEFAULT NULL,
  `image6` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `uidx_images_pid` (`product_id`),
  CONSTRAINT `fk_images_pid` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'1652738134776-1.webp','1652738134779-2.webp','1652738134780-3.webp','1652738134782-4.webp','1652738134783-5.webp','1652738134785-6.webp','2022-07-03 00:31:27'),(2,'img0.JPG','img1.JPG','img2.JPG','img5.webp','img6.webp','img7.webp','2022-07-03 00:31:27'),(3,'img12.webp','img13.webp','img14.webp','img15.webp','img16.webp','img17.webp','2022-07-03 00:31:27'),(4,'img10.webp','img9.webp','img19.webp','img20.webp','img4.webp','img8.webp','2022-07-03 00:31:27'),(5,'img25.webp','img22.webp','img23.webp','img26.webp','img29.webp','img28.webp','2022-07-03 00:31:27'),(6,'1653495706380-img35.webp','1653495706386-img34.webp','1653495706387-img33.webp','1653495706390-img32.webp','1653495706397-img31.webp','1653495706399-img30.webp','2022-07-03 00:31:27'),(7,'1656811709577-1120x7005.webp','1656811709584-1120x7004.webp','1656811709586-1120x7003.webp','1656811709587-1120x7002.webp','1656811709590-1120x7001.webp','1656811709591-1120x700.webp','2022-07-03 01:28:29'),(8,'default.jpg',NULL,NULL,NULL,NULL,NULL,'2022-07-03 22:25:58'),(9,'default.jpg',NULL,NULL,NULL,NULL,NULL,'2022-07-03 22:48:06'),(10,'1657197549187-126819452.jpg','1657197549189-126819447.jpg','1657197549191-126819465.jpg','1657197549193-208190395.jpg','1657197549195-126819454.jpg','1657197549198-205540982.jpg','2022-07-07 12:39:09'),(11,'1657236136004-1120x700.webp','1657236136006-1120x7002.webp','1657236136008-1120x7003.webp','1657236136009-1120x7004.webp','1657236136010-1120x7005.webp','1657236136011-1120x7006.webp','2022-07-07 23:22:16'),(12,'1657236509535-1120x700.webp','1657236509538-1120x7002.webp','1657236509539-1120x7003.webp','1657236509541-1120x7004.webp','1657236509542-1120x7005.webp','1657236509543-1120x7006.webp','2022-07-07 23:28:29'),(13,'1657237090683-1120x700.webp','1657237090684-1120x7002.webp','1657237090686-1120x7003.webp','1657237090687-1120x7004.webp','1657237090689-1120x7005.webp','1657237090690-1120x7006.webp','2022-07-07 23:38:10'),(14,'1657237447301-1120x700.webp','1657237447302-1120x7003.webp','1657237447304-1120x7002.webp','1657237447305-1120x7004.webp','1657237447306-1120x7005.webp','1657237447336-1120x7006.webp','2022-07-07 23:44:07'),(15,'1657237935930-1120x700.webp','1657237935935-1120x7003.webp','1657237935935-1120x7002.webp','1657237935937-1120x7004.webp','1657237935937-1120x7005.webp','1657237935938-1120x7006.webp','2022-07-07 23:52:16'),(16,'1657238278627-1120x7006.webp','1657238278628-1120x7005.webp','1657238278630-1120x7004.webp','1657238278632-1120x7002.webp','1657238278634-1120x700.webp','1657238278635-1120x7003.webp','2022-07-07 23:57:58'),(17,'1657238708446-1120x700.webp','1657238708447-1120x7002.webp','1657238708448-1120x7003.webp','1657238708450-1120x7004.webp','1657238708451-1120x7005.webp','1657238708452-1120x7006.webp','2022-07-08 00:05:08');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `max_guests` tinyint unsigned DEFAULT NULL,
  `price` int unsigned NOT NULL,
  `description` text,
  `province` varchar(45) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_uid` (`user_id`),
  CONSTRAINT `fk_products_uid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,5,23200,'Una casita de campo minimalista, moderna, aislada del ruido de la ciudad. Ideal para disfrutar un fin de semana en familia de tranquilidad en la naturaleza.','Entre Ríos','Victoria','Las Caleras','Casa','2022-07-03 00:31:27','2022-07-03 00:31:27',NULL),(2,2,2,35000,'RODEADO DE NATURALEZA, EN CAN CLOTAS ENCONTRARÁ LA MÁS EXCLUSIVA EXPERIENCIA DE CAMPO EN EL ALT EMPORDÀ - GIRONA . PUEDE ELEGIR ENTRE ALOJARSE EN UNA HABITACIÓN DE LA MASÍA-HOTEL O EN UNA CASA INDEPENDIENTE CON UN JARDÍN PRIVADO.','Misiones','Puerto Iguazú ','Can Clotas','Habitación','2022-07-03 00:31:27','2022-07-03 00:31:27',NULL),(3,3,4,27500,'Este apartamento cuenta con aire acondicionado, 2 dormitorios, TV de pantalla plana y cocina con nevera y horno. Se proporcionan toallas y ropa de cama.','Río Negro','San Carlos de Bariloche','Aguila Mora Suites & Spa','Departamento','2022-07-03 00:31:27','2022-07-03 00:31:27',NULL),(4,4,6,20850,'Cabañas Chesa Engadina se sitúa en San Carlos de Bariloche. Ofrece wi-fi gratis en zonas comunes, estacionamiento gratis y recepción 24 hrs, además de jardín.Los huéspedes podrán cocinar en la comodidad de su alojamiento, en su asador.Entre las comodidades se destacan seguridad 24 hrs, toallas, sábanas y recepción con horario limitado. Los huéspedes también podrán disfrutar de calefacción en zonas comunes. Por un cargo, la propiedad cuenta con servicio de lavandería.','Río Negro','Bariloche','Cabañas Chesa Engadina','Cabaña','2022-07-03 00:31:27','2022-07-03 00:31:27',NULL),(5,5,2,17650,'Contará con departamentos de 1 dormitorio con más de 60 m2 propios, departamentos de 2 y 3 dormitorios con más de 100 m2 propios, cumpliendo así con la misión de nuestra empresa: elevar el nivel y la calidad de la oferta desarrollista en la región. Puerta del Sol 3 es una prueba fehaciente de la calidad en materiales, técnicas de construcción y la gratificación demostrada por sus propietarios en sus antecesores Altos de Belgrano y Puerta del Sol 1 y 2.','Buenos Aires','Río Cuarto','Puerta del Sol 3','Habitación','2022-07-03 00:31:27','2022-07-03 00:31:27',NULL),(6,6,2,12500,'Valle Grande Hotel de Montaña está localizado en San Rafael. Dispone de piscina al aire libre de temporada, wi-fi gratis en zonas comunes y servicio de spa, además de sauna.\r\n\r\nNecesitas saber:\r\n• Accesible para personas con movilidad reducida\r\n• Menú apto para celíacos\r\n• Mascotas: no se admiten\r\n\r\nEl alojamiento sirve diariamente el desayuno, el cual se ofrece en el restaurante. También dispone de bar. Los huéspedes podrán cocinar en la comodidad de su alojamiento, en su asador.\r\n\r\nEntre las comodidades se destacan servicio de masajes, estacionamiento gratis, cancha de fútbol y cancha polideportiva. Los huéspedes también podrán disfrutar de recepción 24 hrs y piscina infantil. Por un suplemento, la propiedad cuenta con servicio de lavandería.','Mendoza','San Rafael','Valle Grande Hotel de Montaña Ruta 173, KM 35 ','Habitación','2022-07-03 00:31:27','2022-07-03 00:31:27',NULL),(7,9,2,12000,'Hotel Spa Termas De Reyes está localizado en San Salvador de Jujuy. Ofrece piscina al aire libre todo el año, wi-fi gratis en zonas comunes y bañera / tina de hidromasaje, además de servicio de spa.\r\n\r\nNecesitas saber:\r\n• Accesible para personas con movilidad reducida\r\n• Mascotas: no se admiten\r\n\r\nEl alojamiento sirve diariamente el desayuno, el cual se ofrece en el restaurante. También dispone de bar. El personal de la propiedad proporcionará servicio a la habitación.\r\n\r\nEntre las comodidades se destacan sauna, servicio de masajes, estacionamiento gratis y salón de juegos. Los huéspedes también podrán disfrutar de gimnasio y recepción 24 hrs. Por un suplemento, la propiedad cuenta con servicio de lavandería.',' Jujuy','San Salvador de Jujuy','Ruta Provincial Nro. 4 KM 9, Termas de Reyes ','Habitación','2022-07-03 01:28:29','2022-07-03 01:28:29',NULL),(8,9,0,0,'',NULL,NULL,'',NULL,'2022-07-03 22:25:58','2022-07-03 22:25:58','2022-07-03 22:26:54'),(9,9,0,0,'',NULL,NULL,'',NULL,'2022-07-03 22:48:06','2022-07-03 22:48:06','2022-07-03 22:48:24'),(10,11,10,19500,'La Quinta en Pilar se encuentra en Del Viso y ofrece alojamiento con piscina privada, patio y vistas a la piscina. \r\nEste agroturismo cuenta con reproductor de DVD, cocina con microondas, nevera y horno, sala de estar con zona de estar y zona de comedor, 4 dormitorios y 3 baños con bañera y bañera de hidromasaje. Hay TV de pantalla plana por cable.\r\nEl establecimiento cuenta con zona de barbacoa, jardín, piscina al aire libre y zona de salón.','Buenos Aires','pilar','3370 Las Calendulas, 1669 Del Viso, Argentina','Quinta','2022-07-07 12:39:09','2022-07-07 12:39:09',NULL),(11,12,15,2200,'Hostal Casa de Barro ofrece todos los días el desayuno con costo adicional. Los huéspedes podrán cocinar en la comodidad de su alojamiento, en su cocina compartida y asador disponible.',' Jujuy','San Salvador de Jujuy','OTERO 294, Barrio Centro, Argentina ','Hostel','2022-07-07 23:22:16','2022-07-07 23:22:16',NULL),(12,12,3,23600,'Con servicio de traslado gratuito al centro de El Calafate, situado a 3.5 km, el Xelena Hotel & Suites dispone de piscina climatizada in out con vista al Lago y desayuno buffet.','Santa Cruz','El Calafate','René Favaloro 3548, Argentina ','Hotel','2022-07-07 23:28:29','2022-07-07 23:28:29',NULL),(13,14,2,33450,'Howard Johnson Resort Spa está localizado en Merlo. Dispone de piscina climatizada, wi-fi gratis en zonas comunes y bañera / tina de hidromasaje, además de servicio de spa. ','San Luis','Merlo','Ruta Provincial 1, 5881 Merlo, San Luis, Argentina, Argentina ','Habitación','2022-07-07 23:38:10','2022-07-07 23:38:10',NULL),(14,14,12,14560,'El Tucumán Center Hotel Suites & Business se encuentra en San Miguel de Tucumán y dispone de piscina al aire libre y Wi-Fi gratuito.','Tucumán','San Miguel De Tucuman','25 de Mayo 230, Centro histórico, Argentina ','Hotel','2022-07-07 23:44:07','2022-07-07 23:44:07',NULL),(15,15,11,3000,'De Paso Hostel dispone de wi-fi gratis en zonas comunes, salón de juegos, recepción de paquetes gratis, jardín, desayuno, tv en zonas comunes, toallas, sábanas y aire acondicionado. ','Neuquén','Neuquen','Sargento Cabral 975, 8300 Neuquén, Argentina ','Hostel','2022-07-07 23:52:16','2022-07-07 23:52:16',NULL),(16,15,2,19800,'Huinid Obelisco Hotel se sitúa en Buenos Aires. Dispone de wi-fi gratis en zonas comunes, bañera / tina de hidromasaje y gimnasio, así como recepción 24 hrs\r\n','Ciudad Autónoma de Buenos Aires','Ciudad De Buenos Aires','Calle Sarmiento 1431. A 457 m del centro ','Habitación','2022-07-07 23:57:58','2022-07-07 23:57:58',NULL),(17,15,2,23500,'Ubicado en Puerto Iguazú, el Iguazu Grand Resort Spa & Casino incluye recepción 24h trilingüe y Wi-Fi gratis.','Misiones','Puerto Iguazu','Puerto Iguazú, Argentina. A 855 m del centro ','Habitación','2022-07-08 00:05:08','2022-07-08 00:05:08',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `type` varchar(14) DEFAULT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'default.jpg',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uidx_users_email` (`email`),
  UNIQUE KEY `uidx_users_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'calamardo','calamardo@gmail.com','$2a$10$HH0UqXL.uA6NEuL9s4iTMuaiz5mJbm7gbUaZwmT.zhdB.0qvcmoye','Anfitrion','1653249697643-calamardo.jpg','2022-06-15 21:33:45','2022-06-15 21:33:45'),(2,'yodita','yoditaConFernet@hotmail.com','$2a$10$XUKWF26cpFxygH7S3OmxN.aq7H6UIhUCpoShGdUiOfTuSwfD9IeDu','Anfitrion','1653232386548-jodaConFenert.jpg','2022-06-15 21:33:45','2022-06-15 21:33:45'),(3,'Chuwe','chuew@hotmail.com','$2a$10$BvXK3JEAf9Mgk88G0Id9wObm3h1D3/UfveqFPHERDdQ4Rz1lEZFm.','Huesped','1653235578563-chuwe.webp','2022-06-15 21:33:45','2022-06-15 21:33:45'),(4,'tyron','tyron@gmail.com','$2a$10$VIJ1L8TQUztoxP14erWKQeMANth.7yO5rVuC4dkolGozhfCPExl0C','Anfitrion','1653236172369-tyron.jpg','2022-06-15 21:33:45','2022-06-15 21:33:45'),(5,'sheldon','sheldon@gmail.com','$2a$10$LPT8EMRsMWQyqxR2lcXt3.uB0WuR98QNdeJuK2eHE208y/8atpZ2W','Huesped','1653249078545-sheldon.jpg','2022-06-15 21:33:45','2022-06-15 21:33:45'),(6,'juannieves','juan@gmail.com','$2a$10$1GxmLSg..sDmtvjGqQWqluUWcqZxlymlersWnGeN76tMbkUCK2Zie','Anfitrion','1653445729464-js.webp','2022-06-15 21:33:45','2022-06-15 21:33:45'),(7,'pepegrillo','pepegrillo@gmail.com','$2a$10$1/EWfavZ8CewUb2T2GxaneU0oOgmegD1L8.JWwbTScHahNAm9MRSG','Huesped','1653447866826-pepegrillo.jpg','2022-06-15 21:33:45','2022-06-15 21:33:45'),(8,'Erlich','Erlich@gmail.com','$2a$10$AMY7lzD.YIBop55dulfOrecR7qtpR55jqMzsbp5lTD5G9uk7nZBvS','Anfitrion','1653492233971-Erlich.jpg','2022-06-15 21:33:45','2022-06-15 21:33:45'),(9,'vero','vero@gmail.com','$2a$10$1A.z7XbzYp42pDRimtUV5u17qHO8jDSTJa7I60WFSIMSrYZObzqa.','Anfitrion','1656808119808-fotoVero.png','2022-07-03 00:28:40','2022-07-03 00:28:40'),(10,'Antonio','antonio.88@hotmail.com','$2a$10$zd.bSDkw2Iosn0URua4fd.sESYHR1Tukk.mcfMv51j3WyngVbvshS','Huesped','1657196239207-man-with-arms-crossed.jpg','2022-07-07 12:17:19','2022-07-07 12:17:19'),(11,'Oscar','oscarIsaac@gmail.com','$2a$10$ywHOhUL3hbjipgbf/YEukOErwRKqswQiB1.fSsQvkTFU68Mak0xji','Anfitrion','1657196803994-oscar-isaac-2639531.webp','2022-07-07 12:26:44','2022-07-07 12:26:44'),(12,'LisaK','lisak@hotmail.com','$2a$10$7GnH6U6ps6XSRHisvA93YurKJN1iM2bcHLEnGr9yJHdVNXkuO6sDW','Anfitrion','1657235589582-R454PZRW35LQVFVBOS7XFJNYGM.jpg','2022-07-07 23:13:09','2022-07-07 23:13:09'),(13,'Berni','berni@gmail.com','$2a$10$Jm5hdLDVN2Ze2GNj.tLdLOtqRR/QCh5KEUIUwnJ05E3VLJPOfh63u','Huesped','1657236666046-R454PZRW35LQVFVBOS7XFJNYGM.jpg','2022-07-07 23:31:06','2022-07-07 23:31:06'),(14,'Deep','Profundo@gmail.com','$2a$10$s1LOK90xOLXeHx5dPakLoOzpJog9zUR../BzVn58rqHEo7Kx1U8w6','Anfitrion','1657236796555-image3-6.webp','2022-07-07 23:33:16','2022-07-07 23:33:16'),(15,'PMaker','PMaker@hotmail.com','$2a$10$4URDh4K8twBOfG2WLF5EQuZ3rgC/3gbF6rGnXlVfEiiZI9iRniOBa','Anfitrion','1657237597056-R454PZRW35LQVFVBOS7XFJNYGM.jpg','2022-07-07 23:46:37','2022-07-07 23:46:37'),(16,'Minion','Minion@hotmail.com','$2a$10$ofhZ30Mjay7qr1knZNm8yeYBsj4oH4XkL2opsLYdNsLzOMfmJ.5YS','Huesped','1658406216062-103e9c2a8984ed61c71f6f5a10331c7a.jpg','2022-07-21 12:23:36','2022-07-21 12:23:36'),(17,'BurroShrek','burro@hotmail.com','$2a$10$jSqdyg3DR8lrwgA.LKUVWu5nrI8OLHTYSqydMIZK.NgcgsVEgAFOO','Huesped','1658406347466-103e9c2a8984ed61c71f6f5a10331c7a.jpg','2022-07-21 12:25:47','2022-07-21 12:25:47'),(18,'kingpin','wilsonFisk@gmail.com','$2a$10$SYzFS1m8BMVjyrBvU13M.OvCu7EIe4SDXQg1.NJmo8nBNLxQh8GNa','Huesped','1658406566113-103e9c2a8984ed61c71f6f5a10331c7a.jpg','2022-07-21 12:29:26','2022-07-21 12:29:26');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-22 11:57:31
