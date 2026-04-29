CREATE DATABASE  IF NOT EXISTS `alcohol_store` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `alcohol_store`;
-- MySQL dump 10.13  Distrib 8.0.46, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: alcohol_store
-- ------------------------------------------------------
-- Server version	9.6.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '781f7612-4232-11f1-babb-9c7472de057b:1-147';

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `Status` varchar(50) DEFAULT NULL,
  `Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
INSERT INTO `Cart` VALUES (1,'Pending','2026-04-28 12:23:35',1),(2,'Pending','2026-04-28 12:23:35',2),(3,'Pending','2026-04-28 12:23:35',3),(4,'Pending','2026-04-28 12:23:35',4),(5,'Pending','2026-04-28 12:23:35',5),(6,'Pending','2026-04-28 12:23:35',6),(7,'Pending','2026-04-28 12:23:35',7),(8,'Pending','2026-04-28 12:23:35',8),(9,'Pending','2026-04-28 12:23:35',9),(10,'Pending','2026-04-28 12:23:35',10),(11,'Pending','2026-04-28 12:23:35',11),(12,'Pending','2026-04-28 12:23:35',12),(13,'Pending','2026-04-28 12:23:35',13),(14,'Pending','2026-04-28 12:23:35',14),(15,'Pending','2026-04-28 12:23:35',15),(16,'Pending','2026-04-28 12:24:59',1),(17,'Pending','2026-04-28 12:26:25',1),(18,'Pending','2026-04-28 12:26:31',1),(19,'Pending','2026-04-28 12:26:34',1),(20,'Pending','2026-04-28 12:26:40',1),(21,'Pending','2026-04-28 12:26:54',1),(22,'Pending','2026-04-28 12:27:01',1);
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `TypeOfAlcohol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'Wine'),(2,'Champagne'),(3,'Whisky'),(4,'Spirits'),(5,'Soju'),(6,'Cognac');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order_Product`
--

DROP TABLE IF EXISTS `Order_Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order_Product` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int DEFAULT NULL,
  `ProductID` int DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `OrderID` (`OrderID`),
  KEY `ProductID` (`ProductID`),
  CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Cart` (`OrderID`),
  CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order_Product`
--

LOCK TABLES `Order_Product` WRITE;
/*!40000 ALTER TABLE `Order_Product` DISABLE KEYS */;
INSERT INTO `Order_Product` VALUES (1,1,1,1200.00,1),(2,2,2,350.00,1),(3,3,3,420.00,2),(4,4,4,280.00,1),(5,5,5,380.00,3),(6,6,6,220.00,1),(7,7,7,650.00,1),(8,8,8,180.00,2),(9,9,9,520.00,1),(10,10,10,310.00,1),(11,1,3,420.00,1),(12,1,3,420.00,1),(13,1,3,420.00,1),(14,1,3,420.00,1),(15,1,3,420.00,1),(16,1,3,420.00,1),(17,1,3,420.00,1);
/*!40000 ALTER TABLE `Order_Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `PaymentID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`PaymentID`),
  KEY `OrderID` (`OrderID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Cart` (`OrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
INSERT INTO `Payment` VALUES (1,1,1200.00,'Paid','2026-04-28 12:23:35'),(2,2,350.00,'Paid','2026-04-28 12:23:35'),(3,3,840.00,'Paid','2026-04-28 12:23:35'),(4,4,280.00,'Paid','2026-04-28 12:23:35'),(5,5,1140.00,'Paid','2026-04-28 12:23:35'),(6,1,420.00,'Paid','2026-04-28 12:24:59'),(7,1,420.00,'Paid','2026-04-28 12:26:25'),(8,1,420.00,'Paid','2026-04-28 12:26:31'),(9,1,420.00,'Paid','2026-04-28 12:26:34'),(10,1,420.00,'Paid','2026-04-28 12:26:40'),(11,1,420.00,'Paid','2026-04-28 12:26:54'),(12,1,420.00,'Paid','2026-04-28 12:27:01');
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Description` text,
  `CategoryID` int DEFAULT NULL,
  `Seller` varchar(255) DEFAULT NULL,
  `ListingDate` date DEFAULT NULL,
  `ImageURL` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `CategoryID` (`CategoryID`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'Château Lafite Rothschild 2015',1200.00,'Bordeaux wine',1,'WineLuxury','2023-10-15','https://picsum.photos/400?1'),(2,'Dom Pérignon Vintage 2010',350.00,'Premium champagne',2,'VinCellar','2023-10-12','https://picsum.photos/400?2'),(3,'Macallan 18 Year Old',420.00,'Scotch whisky',3,'SpiritWorld','2023-10-18','https://picsum.photos/400?3'),(4,'Sassicaia 2018',280.00,'Italian wine',1,'ItalianVines','2023-10-05','https://picsum.photos/400?4'),(5,'Opus One 2017',380.00,'California wine',1,'WineLuxury','2023-10-20','https://picsum.photos/400?5'),(6,'Mao Tai 10 Year',220.00,'Chinese spirit',4,'AsianSpirits','2023-10-08','https://picsum.photos/400?6'),(7,'Penfolds Grange 2016',650.00,'Australian wine',1,'VinCellar','2023-10-14','https://picsum.photos/400?7'),(8,'Johnnie Walker Blue Label',180.00,'Blended whisky',3,'SpiritWorld','2023-10-16','https://picsum.photos/400?8'),(9,'Château d\'Yquem 2015',520.00,'Sweet wine',1,'FrenchEstate','2023-10-11','https://picsum.photos/400?9'),(10,'Barolo 2016',310.00,'Italian red wine',1,'ItalianVines','2023-10-09','https://picsum.photos/400?10');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'user1','pass'),(2,'user2','pass'),(3,'user3','pass'),(4,'user4','pass'),(5,'user5','pass'),(6,'user6','pass'),(7,'user7','pass'),(8,'user8','pass'),(9,'user9','pass'),(10,'user10','pass'),(11,'user11','pass'),(12,'user12','pass'),(13,'user13','pass'),(14,'user14','pass'),(15,'user15','pass');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-29  0:57:23
