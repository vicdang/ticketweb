-- MySQL dump 10.13  Distrib 5.7.34, for Linux (x86_64)
--
-- Host: localhost    Database: ticket_keeper
-- ------------------------------------------------------
-- Server version	5.7.34-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `site_url` varchar(255) DEFAULT NULL,
  `gaptime` int(11) DEFAULT NULL,
  `last_status` tinyint(1) DEFAULT NULL,
  `activated` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (2,'Etix 01','https://www.etix.com/ticket/online/performanceSale.do?method=selectPerformance&performance_id=7429396&country=US&searchType=organization&language=en',60,0,1,'2021-07-08 03:26:02','2021-07-08 03:26:02'),(3,'Etix 02','https://www.etix.com/ticket/p/3844046/mother-mother-the-inside-tour-2022-portland-wonder-ballroom',60,0,1,'2021-07-08 03:26:02','2021-07-08 03:26:02'),(4,'Etix 03','https://www.etix.com/ticket/p/6094078/marc-rebillet-third-dose-tour-asheville-rabbit-rabbit?partner_id=240',60,0,1,'2021-07-08 03:26:02','2021-07-08 03:26:02'),(5,'Etix 04','https://www.etix.com/ticket/p/6283097/lord-huron-troutdale-mcmenamins-edgefield-amphitheater',60,0,1,'2021-07-08 03:26:02','2021-07-08 03:26:02'),(6,'Etix 05','https://www.etix.com/ticket/online/performanceSale.do?method=selectPerformance&performance_id=4969849&country=US&cobrand=zooamp&language=en',60,0,1,'2021-07-08 03:26:02','2021-07-08 03:26:02'),(7,'Etix 06','https://event.etix.com/ticket/online/performanceSale.do?performance_id=3195916&method=restoreToken',60,0,1,'2021-07-08 03:26:02','2021-07-08 03:26:02'),(8,'Etix 07','https://event.etix.com/ticket/online/performanceSale.do?performance_id=4604195&method=restoreToken',60,0,1,'2021-07-08 03:26:02','2021-07-08 03:26:02'),(9,'Etix 08','https://event.etix.com/ticket/online/performanceSale.do?performance_id=5208883&partner_id=240&method=restoreToken&cobrand=theorangepeel',60,0,1,'2021-07-08 03:26:03','2021-07-08 03:26:03'),(10,'Etix 09','https://event.etix.com/ticket/online/performanceSale.do?performance_id=7869766&method=restoreToken',60,0,1,'2021-07-08 03:26:03','2021-07-08 03:26:03'),(11,'Etix 10','https://event.etix.com/ticket/online/performanceSale.do?performance_id=8456674&method=restoreToken',60,0,1,'2021-07-08 03:26:03','2021-07-08 03:26:03'),(12,'Etix 11','https://event.etix.com/ticket/online/performanceSale.do?performance_id=8986960&method=restoreToken',60,0,1,'2021-07-08 03:26:03','2021-07-08 03:26:03'),(13,'Etix 12','https://event.etix.com/ticket/p/8124944/lukas-nelson-promise-of-the-real-salt-lake-city-red-butte-garden?country=US&language=en',60,0,1,'2021-07-08 03:26:03','2021-07-08 03:26:03');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-08  3:32:42
