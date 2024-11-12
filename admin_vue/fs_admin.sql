-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fs_admin
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `fs_menu`
--

DROP TABLE IF EXISTS `fs_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fs_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `order_num` int NOT NULL,
  `parent_id` int DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `component` varchar(50) DEFAULT NULL,
  `path` varchar(50) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `permission` varchar(50) DEFAULT NULL,
  `menu_type` int NOT NULL,
  `create_by` bigint NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `catch` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_menu`
--

LOCK TABLES `fs_menu` WRITE;
/*!40000 ALTER TABLE `fs_menu` DISABLE KEYS */;
INSERT INTO `fs_menu` VALUES (1,'系统管理',1,NULL,'Setting',NULL,'sys','2024-10-08 09:14:19.972694','2024-10-22 02:13:52.189932',NULL,1,1,1,0),(2,'角色管理',1,1,'User','system/role/index','role','2024-10-08 09:49:35.589168','2024-10-21 10:37:28.140056','sys:role:list',2,1,1,0),(3,'菜单管理',2,1,'Menu','system/menu/index','menu','2024-10-08 09:50:07.259281','2024-10-30 07:45:58.563892','sys:menu:list',2,1,1,1),(4,'用户管理',3,1,'User','system/user/index','user','2024-10-08 09:50:39.618234','2024-10-30 07:45:29.546299','sys:user:list',2,1,1,1),(9,'删除',0,3,'Delete','','','2024-11-11 15:28:02.251319','2024-11-12 14:08:47.000000','system:menu:delete',3,1,1,0),(14,'编辑',1,3,'','','','2024-11-11 18:50:15.399057','2024-11-11 18:50:15.399057','system:menu:edit',3,1,1,0),(16,'新增',0,3,'','','','2024-11-12 14:09:15.032871','2024-11-12 14:09:15.032871','system:menu:add',3,1,1,0);
/*!40000 ALTER TABLE `fs_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fs_role`
--

DROP TABLE IF EXISTS `fs_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fs_role` (
  `role_name` varchar(20) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_by` bigint NOT NULL,
  `update_by` bigint NOT NULL,
  `role_sort` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `remark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_role`
--

LOCK TABLES `fs_role` WRITE;
/*!40000 ALTER TABLE `fs_role` DISABLE KEYS */;
INSERT INTO `fs_role` VALUES ('admin','2024-10-09 09:09:05.934475','2024-10-09 09:09:05.934475',1,1,1,1,1,'超级管理员'),('角色1','2024-10-10 07:56:19.361124','2024-10-10 07:57:01.917671',2,1,1,1,1,'拥有菜单管理,角色管理权限');
/*!40000 ALTER TABLE `fs_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fs_role_menu_relation`
--

DROP TABLE IF EXISTS `fs_role_menu_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fs_role_menu_relation` (
  `fsMenuId` int NOT NULL,
  `fsRoleId` bigint NOT NULL,
  PRIMARY KEY (`fsMenuId`,`fsRoleId`),
  KEY `IDX_d8b1289a84aff2bba3ca7d3f13` (`fsMenuId`),
  KEY `IDX_5de6f2d5f16e468a5169096e25` (`fsRoleId`),
  CONSTRAINT `FK_5de6f2d5f16e468a5169096e25b` FOREIGN KEY (`fsRoleId`) REFERENCES `fs_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d8b1289a84aff2bba3ca7d3f138` FOREIGN KEY (`fsMenuId`) REFERENCES `fs_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_role_menu_relation`
--

LOCK TABLES `fs_role_menu_relation` WRITE;
/*!40000 ALTER TABLE `fs_role_menu_relation` DISABLE KEYS */;
INSERT INTO `fs_role_menu_relation` VALUES (1,2),(2,2),(3,2);
/*!40000 ALTER TABLE `fs_role_menu_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fs_user`
--

DROP TABLE IF EXISTS `fs_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fs_user` (
  `username` varchar(30) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_admin` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_user`
--

LOCK TABLES `fs_user` WRITE;
/*!40000 ALTER TABLE `fs_user` DISABLE KEYS */;
INSERT INTO `fs_user` VALUES ('admin',NULL,'9e5f09615e41c63295ae63083c7e8ceedc80',NULL,NULL,'K1mKag==','2024-10-09 09:55:09','2024-10-09 09:55:09',1,1),('user1',NULL,'191b643f9e044fe3841426ee80bcdb6e584f',NULL,NULL,'JPe1Pg==','2024-10-10 08:01:41','2024-10-10 08:01:41',2,0);
/*!40000 ALTER TABLE `fs_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fs_user_role_relation`
--

DROP TABLE IF EXISTS `fs_user_role_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fs_user_role_relation` (
  `fsRoleId` bigint NOT NULL,
  `fsUserId` bigint NOT NULL,
  PRIMARY KEY (`fsRoleId`,`fsUserId`),
  KEY `IDX_647af18ec73a7a969d351e441c` (`fsRoleId`),
  KEY `IDX_f20039a6a4e3aba2d85453a3ef` (`fsUserId`),
  CONSTRAINT `FK_647af18ec73a7a969d351e441cc` FOREIGN KEY (`fsRoleId`) REFERENCES `fs_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_f20039a6a4e3aba2d85453a3ef0` FOREIGN KEY (`fsUserId`) REFERENCES `fs_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_user_role_relation`
--

LOCK TABLES `fs_user_role_relation` WRITE;
/*!40000 ALTER TABLE `fs_user_role_relation` DISABLE KEYS */;
INSERT INTO `fs_user_role_relation` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `fs_user_role_relation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-12 14:22:29
