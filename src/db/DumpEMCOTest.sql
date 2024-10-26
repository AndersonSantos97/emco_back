CREATE DATABASE  IF NOT EXISTS `administrator` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `administrator`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: administrator
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol_description` varchar(10) NOT NULL,
  `rol_state` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin',1),(3,'Usuario',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_description` varchar(100) NOT NULL,
  `task_state` varchar(13) NOT NULL,
  `task_user` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_883666e84e8161f50830045a324` (`task_user`),
  CONSTRAINT `FK_883666e84e8161f50830045a324` FOREIGN KEY (`task_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Levantar escombros','En progreso',2),(2,'Crear Usuarios','En progreso',1),(6,'barrer','Pendiente',3),(7,'barrer','Pendiente',6),(11,'Nueva descripción de la tarea','En progreso',6),(14,'nuevo','Pendiente',2),(15,'Nuevo','En Progreso',3),(16,'mas','Pendiente',1),(17,'Mas aun','Completado',6),(18,'Otra prueba','Completado',6),(19,'Mas','En Progreso',1),(20,'Otrp','completado',2),(24,'Levantar escombrossss','en progreso',6),(25,'Otra prueba','Pendiente',8),(26,'Inicio','En progreso',9);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(8) NOT NULL,
  `user_state` int NOT NULL,
  `user_rol` int NOT NULL,
  `user_pass` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rol_user_idx` (`user_rol`),
  CONSTRAINT `fk_rol_user` FOREIGN KEY (`user_rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'anderson',1,1,'$2b$10$QTgXPcFiWBCM3gzU3gK.MeWYhXxPEAD5qGN.MxF7ZJ4STiw.1MK9W'),(2,'alberts',1,3,'$2b$10$QTgXPcFiWBCM3gzU3gK.MeWYhXxPEAD5qGN.MxF7ZJ4STiw.1MK9W'),(3,'prueba',1,3,'$2b$10$9DOKZVnpGZD/j7P8IxWKX.OatJTrj2YiiMoL64ZcsesMUX2gwbcV2'),(6,'new',1,1,'$2b$10$8NmnTizjpj1WKi8fI.NcRuJ9TaA1weHB03Snsq2UZOsd17/5l/WCe'),(8,'fvazque',1,3,'$2b$10$9NAOlFa995AmJCO7UIdDtOipQvRzCzETsN8n/770KUKAbQw3ykoIK'),(9,'MSERRA',1,3,'$2b$10$tiWrqd6LiW6VRRNQ3Ama5uk5m5W0BBYXVXD1qbG8VIvysxp8caLu2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'administrator'
--

--
-- Dumping routines for database 'administrator'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26 12:55:51
