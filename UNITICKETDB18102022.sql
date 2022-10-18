-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: uniticketdb
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `areaId` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `description` varchar(120) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`areaId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Cajas','Atencion para pagos a la universidad',1,'2022-10-10 12:54:12',NULL,1,NULL),(2,'Bienestar universitario','Atencion de quejas, problemas e informacion para estudiantes',1,'2022-10-10 12:54:12',NULL,1,NULL);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignation`
--

DROP TABLE IF EXISTS `asignation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignation` (
  `employeeId` int NOT NULL,
  `tableId` tinyint NOT NULL,
  `startDate` date NOT NULL,
  `finishDate` date DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `crateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`employeeId`,`tableId`),
  KEY `fk_employee_has_table_table1_idx` (`tableId`),
  KEY `fk_employee_has_table_employee1_idx` (`employeeId`),
  CONSTRAINT `fk_employee_has_table_employee1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`employeeId`),
  CONSTRAINT `fk_employee_has_table_table1` FOREIGN KEY (`tableId`) REFERENCES `´table´` (`tableId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignation`
--

LOCK TABLES `asignation` WRITE;
/*!40000 ALTER TABLE `asignation` DISABLE KEYS */;
INSERT INTO `asignation` VALUES (2,1,'2020-10-15',NULL,1,'2022-10-10 12:54:12',NULL,1,NULL),(3,2,'2020-10-16',NULL,1,'2022-10-10 12:54:12',NULL,1,NULL);
/*!40000 ALTER TABLE `asignation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attention`
--

DROP TABLE IF EXISTS `attention`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attention` (
  `attentionId` int NOT NULL AUTO_INCREMENT,
  `startTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `finishtime` datetime DEFAULT NULL,
  `attentionType` tinyint NOT NULL DEFAULT '0' COMMENT '0 normal attention\n1 transfer attention',
  `ticketId` int DEFAULT NULL,
  `employeeId` int NOT NULL,
  `tableId` tinyint NOT NULL,
  `transferId` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  PRIMARY KEY (`attentionId`),
  KEY `fk_attention_ticket1_idx` (`ticketId`),
  KEY `fk_attention_asignation1_idx` (`employeeId`,`tableId`),
  KEY `fk_attention_transfer1_idx` (`transferId`),
  CONSTRAINT `fk_attention_asignation1` FOREIGN KEY (`employeeId`, `tableId`) REFERENCES `asignation` (`employeeId`, `tableId`),
  CONSTRAINT `fk_attention_ticket1` FOREIGN KEY (`ticketId`) REFERENCES `ticket` (`ticketId`),
  CONSTRAINT `fk_attention_transfer1` FOREIGN KEY (`transferId`) REFERENCES `transfer` (`transferId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attention`
--

LOCK TABLES `attention` WRITE;
/*!40000 ALTER TABLE `attention` DISABLE KEYS */;
INSERT INTO `attention` VALUES (1,'2022-10-10 12:54:22','2022-10-10 12:37:19',1,1,2,1,NULL,1),(2,'2022-10-10 12:54:22',NULL,1,2,3,2,1,1);
/*!40000 ALTER TABLE `attention` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attentionplace`
--

DROP TABLE IF EXISTS `attentionplace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attentionplace` (
  `attentionPlaceId` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `campusId` tinyint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`attentionPlaceId`),
  KEY `fk_attentionPlace_campus1_idx` (`campusId`),
  CONSTRAINT `fk_attentionPlace_campus1` FOREIGN KEY (`campusId`) REFERENCES `campus` (`campusId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attentionplace`
--

LOCK TABLES `attentionplace` WRITE;
/*!40000 ALTER TABLE `attentionplace` DISABLE KEYS */;
INSERT INTO `attentionplace` VALUES (1,'bienestar universitario',1,1,'2022-10-10 12:54:12','2022-10-10 12:54:12',1,1),(2,'Cajas',1,1,'2022-10-10 12:54:12',NULL,1,NULL);
/*!40000 ALTER TABLE `attentionplace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attentionplace_area`
--

DROP TABLE IF EXISTS `attentionplace_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attentionplace_area` (
  `attentionPlaceId` tinyint NOT NULL,
  `areaId` tinyint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`attentionPlaceId`,`areaId`),
  KEY `fk_attentionPlace_has_area_area1_idx` (`areaId`),
  KEY `fk_attentionPlace_has_area_attentionPlace1_idx` (`attentionPlaceId`),
  CONSTRAINT `fk_attentionPlace_has_area_area1` FOREIGN KEY (`areaId`) REFERENCES `area` (`areaId`),
  CONSTRAINT `fk_attentionPlace_has_area_attentionPlace1` FOREIGN KEY (`attentionPlaceId`) REFERENCES `attentionplace` (`attentionPlaceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attentionplace_area`
--

LOCK TABLES `attentionplace_area` WRITE;
/*!40000 ALTER TABLE `attentionplace_area` DISABLE KEYS */;
INSERT INTO `attentionplace_area` VALUES (1,1,1,'2022-10-10 12:54:12',NULL,1,NULL),(2,2,1,'2022-10-10 12:54:12',NULL,1,NULL);
/*!40000 ALTER TABLE `attentionplace_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attentiontype`
--

DROP TABLE IF EXISTS `attentiontype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attentiontype` (
  `attentionTypeId` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `importance` tinyint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`attentionTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attentiontype`
--

LOCK TABLES `attentiontype` WRITE;
/*!40000 ALTER TABLE `attentiontype` DISABLE KEYS */;
INSERT INTO `attentiontype` VALUES (1,'Atencion General',1,1,'2022-10-10 12:54:22',NULL,1,NULL),(2,'Atencion a Mujere Embrazadas',2,1,'2022-10-10 12:54:22',NULL,1,NULL),(3,'Atencion a Tercera Edad',3,1,'2022-10-10 12:54:22',NULL,1,NULL);
/*!40000 ALTER TABLE `attentiontype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus`
--

DROP TABLE IF EXISTS `campus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campus` (
  `campusId` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(120) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `cityId` tinyint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`campusId`),
  KEY `fk_campus_city1_idx` (`cityId`),
  CONSTRAINT `fk_campus_city1` FOREIGN KEY (`cityId`) REFERENCES `city` (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus`
--

LOCK TABLES `campus` WRITE;
/*!40000 ALTER TABLE `campus` DISABLE KEYS */;
INSERT INTO `campus` VALUES (1,'Campus Tiquipaya','campus principal de cochbamba',-17.33120670,-66.22820310,1,1,'2022-10-10 12:54:12',NULL,1,NULL);
/*!40000 ALTER TABLE `campus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `cityId` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Cochabamba',-17.39388310,-66.23391690,1,'2022-10-10 12:54:12',NULL,1,NULL);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complain`
--

DROP TABLE IF EXISTS `complain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complain` (
  `complainId` int NOT NULL AUTO_INCREMENT,
  `complainType` tinyint NOT NULL DEFAULT '0' COMMENT '0 inPlace complain\n1 online complain',
  `description` varchar(244) DEFAULT NULL COMMENT 'complain content for online users',
  `complainReasonId` tinyint NOT NULL,
  `attentionId` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`complainId`),
  KEY `fk_complain_complainReason1_idx` (`complainReasonId`),
  KEY `fk_complain_attention1_idx` (`attentionId`),
  CONSTRAINT `fk_complain_attention1` FOREIGN KEY (`attentionId`) REFERENCES `attention` (`attentionId`),
  CONSTRAINT `fk_complain_complainReason1` FOREIGN KEY (`complainReasonId`) REFERENCES `complainreason` (`complainReasonId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complain`
--

LOCK TABLES `complain` WRITE;
/*!40000 ALTER TABLE `complain` DISABLE KEYS */;
INSERT INTO `complain` VALUES (1,0,NULL,1,1,1,'2022-10-10 12:54:22',NULL,4,NULL),(2,1,'Tarda mucho timepo en atender',1,2,1,'2022-10-10 12:56:23',NULL,4,NULL);
/*!40000 ALTER TABLE `complain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complainreason`
--

DROP TABLE IF EXISTS `complainreason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complainreason` (
  `complainReasonId` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `description` varchar(120) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`complainReasonId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complainreason`
--

LOCK TABLES `complainreason` WRITE;
/*!40000 ALTER TABLE `complainreason` DISABLE KEYS */;
INSERT INTO `complainreason` VALUES (1,'Largos Timepos de Espera','El usuario lleva mucho tiempo esperando a ser atendido',1,'2022-10-10 12:54:22',NULL,1,NULL);
/*!40000 ALTER TABLE `complainreason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employeeId` int NOT NULL,
  `ci` varchar(15) NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `homeLat` decimal(10,8) NOT NULL,
  `homeLon` decimal(11,8) NOT NULL,
  `role` tinyint NOT NULL DEFAULT '0' COMMENT '0 atendant\n1 admin',
  PRIMARY KEY (`employeeId`),
  CONSTRAINT `fk_employee_user` FOREIGN KEY (`employeeId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'34881234','76541234',-17.40542550,-66.13824830,1),(2,'87652345','67234521',-17.43337900,-66.22022830,0),(3,'43235678','87239034',-17.32783200,-66.14829470,0);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `onlineticket`
--

DROP TABLE IF EXISTS `onlineticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `onlineticket` (
  `ticketId` int NOT NULL,
  `reservationTime` datetime NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`ticketId`),
  KEY `fk_onlineTicket_user1_idx` (`userId`),
  CONSTRAINT `fk_onlineTicket_ticket1` FOREIGN KEY (`ticketId`) REFERENCES `ticket` (`ticketId`),
  CONSTRAINT `fk_onlineTicket_user1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `onlineticket`
--

LOCK TABLES `onlineticket` WRITE;
/*!40000 ALTER TABLE `onlineticket` DISABLE KEYS */;
INSERT INTO `onlineticket` VALUES (2,'2022-10-10 11:30:45',4);
/*!40000 ALTER TABLE `onlineticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `ticketId` int NOT NULL AUTO_INCREMENT,
  `number` smallint NOT NULL,
  `ticketType` tinyint NOT NULL DEFAULT '0' COMMENT '0 inPlace ticket\n1 online ticket',
  `attentionTypeId` tinyint NOT NULL,
  `userTypeId` tinyint DEFAULT NULL,
  `attentionPlaceId` tinyint NOT NULL,
  `areaId` tinyint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`ticketId`),
  KEY `fk_ticket_attentionType1_idx` (`attentionTypeId`),
  KEY `fk_ticket_userType1_idx` (`userTypeId`),
  KEY `fk_ticket_attentionPlace_Area1_idx` (`attentionPlaceId`,`areaId`),
  CONSTRAINT `fk_ticket_attentionPlace_Area1` FOREIGN KEY (`attentionPlaceId`, `areaId`) REFERENCES `attentionplace_area` (`attentionPlaceId`, `areaId`),
  CONSTRAINT `fk_ticket_attentionType1` FOREIGN KEY (`attentionTypeId`) REFERENCES `attentiontype` (`attentionTypeId`),
  CONSTRAINT `fk_ticket_userType1` FOREIGN KEY (`userTypeId`) REFERENCES `usertype` (`userTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,1,0,1,1,1,1,1,'2022-10-10 12:54:22',NULL,4,NULL),(2,2,1,1,NULL,1,1,1,'2022-10-10 12:54:22',NULL,4,NULL);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfer` (
  `transferId` int NOT NULL AUTO_INCREMENT,
  `transferTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ticketId` int NOT NULL,
  `originEmployeeId` int NOT NULL,
  `originTableId` tinyint NOT NULL,
  `destinationAttentionPlaceId` tinyint NOT NULL,
  `destinationAreaId` tinyint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `updateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`transferId`),
  KEY `fk_transfer_ticket1_idx` (`ticketId`),
  KEY `fk_transfer_asignation1_idx` (`originEmployeeId`,`originTableId`),
  KEY `fk_transfer_attentionPlace_Area1_idx` (`destinationAttentionPlaceId`,`destinationAreaId`),
  CONSTRAINT `fk_transfer_asignation1` FOREIGN KEY (`originEmployeeId`, `originTableId`) REFERENCES `asignation` (`employeeId`, `tableId`),
  CONSTRAINT `fk_transfer_attentionPlace_Area1` FOREIGN KEY (`destinationAttentionPlaceId`, `destinationAreaId`) REFERENCES `attentionplace_area` (`attentionPlaceId`, `areaId`),
  CONSTRAINT `fk_transfer_ticket1` FOREIGN KEY (`ticketId`) REFERENCES `ticket` (`ticketId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer`
--

LOCK TABLES `transfer` WRITE;
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
INSERT INTO `transfer` VALUES (1,'2022-10-10 12:54:22',1,2,1,2,2,1,NULL);
/*!40000 ALTER TABLE `transfer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(60) NOT NULL,
  `firstSurname` varchar(60) NOT NULL,
  `secondSurname` varchar(60) DEFAULT NULL,
  `userName` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `role` tinyint NOT NULL DEFAULT '0' COMMENT '0 normal user\n1 employee',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'juan','perez',NULL,'jPerez','c888754b83f9d7c449811365e232d1f6','jperez@gmail.com',1,1,'2022-10-10 12:54:02',NULL,1,NULL),(2,'martina','martinez','figueroa','mmfigueroa','d876173c5d448a4d43e7901c8a32a629','mmfigueroa@gmail.com',1,1,'2022-10-10 12:54:02',NULL,1,NULL),(3,'manuel','montoya','ruiz','mrmanuel','797fe50dc758103e9b06dc71128ca87f','mrmanuel@gmail.com',1,1,'2022-10-10 12:54:02',NULL,1,NULL),(4,'jose','lopez',NULL,'jLopez','5943c1ad2a4f47b34608b77bf667ca53','jLopez@gmail.com',0,1,'2022-10-10 12:54:02',NULL,1,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `userTypeId` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(120) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`userTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES (1,'Familiar','Personas con perentezco familiar con el estudiante',1,'2022-10-10 12:54:22',NULL,1,NULL);
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `viewattentionplaces`
--

DROP TABLE IF EXISTS `viewattentionplaces`;
/*!50001 DROP VIEW IF EXISTS `viewattentionplaces`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `viewattentionplaces` AS SELECT 
 1 AS `attentionplaceID`,
 1 AS `Nombre`,
 1 AS `Sede`,
 1 AS `Estado`,
 1 AS `Responable de Registro`,
 1 AS `Fecha de Registro`,
 1 AS `Responsable de Ultima Modificación`,
 1 AS `Ultima Modificación`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `viewcampus`
--

DROP TABLE IF EXISTS `viewcampus`;
/*!50001 DROP VIEW IF EXISTS `viewcampus`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `viewcampus` AS SELECT 
 1 AS `campusId`,
 1 AS `Nombre`,
 1 AS `Ciudad`,
 1 AS `Latitud`,
 1 AS `Longitud`,
 1 AS `Estado`,
 1 AS `Responable de Registro`,
 1 AS `Fecha de Registro`,
 1 AS `Responsable de Ultima Modificación`,
 1 AS `Ultima Modificación`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `viewemployees`
--

DROP TABLE IF EXISTS `viewemployees`;
/*!50001 DROP VIEW IF EXISTS `viewemployees`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `viewemployees` AS SELECT 
 1 AS `userId`,
 1 AS `Nombre`,
 1 AS `Apellido Paterno`,
 1 AS `Apellido Materno`,
 1 AS `CI`,
 1 AS `Correo`,
 1 AS `Telefono`,
 1 AS `Latitud`,
 1 AS `Longitud`,
 1 AS `Cargo`,
 1 AS `Estado`,
 1 AS `Responsable de Registro`,
 1 AS `Fecha de Registro`,
 1 AS `Responsable de Ultima Modificación`,
 1 AS `Ultima Modificación`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `viewusers`
--

DROP TABLE IF EXISTS `viewusers`;
/*!50001 DROP VIEW IF EXISTS `viewusers`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `viewusers` AS SELECT 
 1 AS `userId`,
 1 AS `Nombre`,
 1 AS `Apellido Paterno`,
 1 AS `Apellido Materno`,
 1 AS `Correo`,
 1 AS `Estado`,
 1 AS `Responsable de Registro`,
 1 AS `Fecha de Registro`,
 1 AS `Responsable de Ultima Modificación`,
 1 AS `Ultima Modificación`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `´table´`
--

DROP TABLE IF EXISTS `´table´`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `´table´` (
  `tableId` tinyint NOT NULL AUTO_INCREMENT,
  `number` tinyint NOT NULL,
  `attentionPlaceId` tinyint NOT NULL,
  `areaId` tinyint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1 active\n0 inactive',
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT NULL,
  `userIdCreate` int NOT NULL,
  `userIdMod` int DEFAULT NULL,
  PRIMARY KEY (`tableId`),
  KEY `fk_table_attentionPlace_Area1_idx` (`attentionPlaceId`,`areaId`),
  CONSTRAINT `fk_table_attentionPlace_Area1` FOREIGN KEY (`attentionPlaceId`, `areaId`) REFERENCES `attentionplace_area` (`attentionPlaceId`, `areaId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `´table´`
--

LOCK TABLES `´table´` WRITE;
/*!40000 ALTER TABLE `´table´` DISABLE KEYS */;
INSERT INTO `´table´` VALUES (1,1,1,1,1,'2022-10-10 12:54:12',NULL,1,NULL),(2,1,2,2,1,'2022-10-10 12:54:12',NULL,1,NULL);
/*!40000 ALTER TABLE `´table´` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'uniticketdb'
--

--
-- Final view structure for view `viewattentionplaces`
--

/*!50001 DROP VIEW IF EXISTS `viewattentionplaces`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `viewattentionplaces` AS select `ap`.`attentionPlaceId` AS `attentionplaceID`,`ap`.`name` AS `Nombre`,`c`.`name` AS `Sede`,if((`ap`.`status` = 1),'Activo','Inactivo') AS `Estado`,(select concat(`user`.`firstName`,' ',`user`.`firstSurname`) from `user` where (`user`.`userId` = `ap`.`userIdCreate`)) AS `Responable de Registro`,`ap`.`createDate` AS `Fecha de Registro`,ifnull((select concat(`user`.`firstName`,' ',`user`.`firstSurname`) from `user` where (`user`.`userId` = `ap`.`userIdMod`)),'Ninguno') AS `Responsable de Ultima Modificación`,ifnull(`ap`.`updateDate`,'Ninguna') AS `Ultima Modificación` from (`attentionplace` `ap` join `campus` `c` on((`c`.`campusId` = `ap`.`campusId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `viewcampus`
--

/*!50001 DROP VIEW IF EXISTS `viewcampus`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`uniticketDev`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `viewcampus` AS select `c`.`campusId` AS `campusId`,`c`.`name` AS `Nombre`,`ci`.`name` AS `Ciudad`,`c`.`latitude` AS `Latitud`,`c`.`longitude` AS `Longitud`,if((`c`.`status` = 1),'Activo','Inactivo') AS `Estado`,(select concat(`user`.`firstName`,' ',`user`.`firstSurname`) from `user` where (`user`.`userId` = `c`.`userIdCreate`)) AS `Responable de Registro`,`c`.`createDate` AS `Fecha de Registro`,ifnull((select concat(`user`.`firstName`,' ',`user`.`firstSurname`) from `user` where (`user`.`userId` = `c`.`userIdMod`)),'Ninguno') AS `Responsable de Ultima Modificación`,ifnull(`c`.`updateDate`,'Ninguna') AS `Ultima Modificación` from (`campus` `c` join `city` `ci` on((`c`.`cityId` = `ci`.`cityId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `viewemployees`
--

/*!50001 DROP VIEW IF EXISTS `viewemployees`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`uniticketDev`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `viewemployees` AS select `u`.`userId` AS `userId`,`u`.`firstName` AS `Nombre`,`u`.`firstSurname` AS `Apellido Paterno`,ifnull(`u`.`secondSurname`,'') AS `Apellido Materno`,`e`.`ci` AS `CI`,`u`.`email` AS `Correo`,`e`.`phoneNumber` AS `Telefono`,`e`.`homeLat` AS `Latitud`,`e`.`homeLon` AS `Longitud`,if((`e`.`role` = 1),'Administrador','Empleado') AS `Cargo`,if((`u`.`status` = 1),'Activo','Inactivo') AS `Estado`,(select concat(`user`.`firstName`,' ',`user`.`firstSurname`) from `user` where (`user`.`userId` = `u`.`userIdCreate`)) AS `Responsable de Registro`,`u`.`createDate` AS `Fecha de Registro`,ifnull((select concat(`user`.`firstName`,' ',`user`.`firstSurname`) from `user` where (`user`.`userId` = `u`.`userIdMod`)),'Ninguno') AS `Responsable de Ultima Modificación`,ifnull(`u`.`updateDate`,'Ninguna') AS `Ultima Modificación` from (`employee` `e` join `user` `u` on((`e`.`employeeId` = `u`.`userId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `viewusers`
--

/*!50001 DROP VIEW IF EXISTS `viewusers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`uniticketDev`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `viewusers` AS select `u`.`userId` AS `userId`,`u`.`firstName` AS `Nombre`,`u`.`firstSurname` AS `Apellido Paterno`,ifnull(`u`.`secondSurname`,'') AS `Apellido Materno`,`u`.`email` AS `Correo`,if((`u`.`status` = 1),'Activo','Inactivo') AS `Estado`,(select concat(`user`.`firstName`,' ',`user`.`firstSurname`) from `user` where (`user`.`userId` = `u`.`userIdCreate`)) AS `Responsable de Registro`,`u`.`createDate` AS `Fecha de Registro`,ifnull((select concat(`user`.`firstName`,' ',`user`.`firstSurname`) from `user` where (`user`.`userId` = `u`.`userIdMod`)),'Ninguno') AS `Responsable de Ultima Modificación`,ifnull(`u`.`updateDate`,'Ninguna') AS `Ultima Modificación` from `user` `u` where (`u`.`role` = 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-18 10:23:43
