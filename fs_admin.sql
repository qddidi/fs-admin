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
  `hidden` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_menu`
--

LOCK TABLES `fs_menu` WRITE;
/*!40000 ALTER TABLE `fs_menu` DISABLE KEYS */;
INSERT INTO `fs_menu` VALUES (1,'系统管理',1,NULL,'Setting',NULL,'sys','2024-10-08 09:14:19.972694','2024-11-12 16:33:59.000000',NULL,1,1,1,0,0),(2,'角色管理',1,1,'User','system/role/index','role','2024-10-08 09:49:35.589168','2024-12-02 17:17:02.000000','sys:role:list',2,1,1,0,0),(3,'菜单管理',2,1,'Menu','system/menu/index','menu','2024-10-08 09:50:07.259281','2024-10-30 07:45:58.563892','sys:menu:list',2,1,1,1,0),(4,'用户管理',3,1,'User','system/user/index','user','2024-10-08 09:50:39.618234','2024-11-28 18:28:44.000000','sys:user:list',2,1,1,1,0),(9,'删除',0,3,'Delete','','','2024-11-11 15:28:02.251319','2024-11-12 14:08:47.000000','system:menu:delete',3,1,1,0,0),(14,'编辑',1,3,'','','','2024-11-11 18:50:15.399057','2024-11-11 18:50:15.399057','system:menu:edit',3,1,1,0,0),(16,'新增',0,3,'','','','2024-11-12 14:09:15.032871','2024-11-12 14:09:15.032871','system:menu:add',3,1,1,0,0),(17,'测试目录',1,NULL,'Calendar','','test','2024-11-13 16:56:26.595351','2024-11-13 18:42:34.000000','',1,1,0,0,0),(18,'测试菜单',0,17,'Aim','','test','2024-11-13 16:56:51.324707','2024-11-13 16:56:51.324707','',2,1,1,0,0),(19,'查询',1,3,'','','','2024-11-13 17:26:26.652382','2024-11-13 17:26:26.652382','system:menu:list',3,1,1,0,0),(20,'查询',0,2,'','','','2024-11-14 17:12:59.807020','2024-11-14 17:12:59.807020','system:role:list',3,1,1,0,0),(21,'修改',0,2,'','','','2024-11-14 17:13:11.576192','2024-11-14 17:13:11.576192','system:role:edit',3,1,1,0,0),(22,'删除',0,2,'','','','2024-11-14 17:13:27.232695','2024-11-14 17:13:27.232695','system:role:delete',3,1,1,0,0),(23,'新增',0,2,'','','','2024-11-14 17:13:49.119456','2024-11-14 17:13:49.119456','system:role:add',3,1,1,0,0),(24,'查询',0,4,'','','','2024-11-21 14:14:57.632020','2024-11-21 14:14:57.632020','system:user:list',3,1,1,0,0),(25,'编辑',1,4,'','','','2024-11-21 14:15:19.206165','2024-11-21 14:15:19.206165','system:user:edit',3,1,1,0,0),(26,'新增',0,4,'','','','2024-11-21 14:15:32.011796','2024-11-21 14:15:32.011796','system:user:add',3,1,1,0,0),(27,'删除',0,4,'','','','2024-11-21 14:15:55.617351','2024-11-21 14:15:55.617351','system:user:delete',3,1,1,0,0),(28,'导出',2,4,'','','','2024-11-25 16:17:40.449112','2024-11-25 16:17:40.449112','system:user:export',3,1,1,0,0),(29,'导入',3,4,'','','','2024-11-27 10:57:25.951722','2024-11-27 10:57:25.951722','system:user:import',3,5,1,0,0),(31,'日志管理',4,1,'DocumentCopy','system/log/index','log','2024-12-11 17:30:36.146482','2024-12-12 14:11:34.000000','system:log:list',2,5,1,0,0),(32,'导出',0,31,'','','','2024-12-11 18:10:31.293747','2024-12-11 18:10:31.293747','system:log:export',3,5,1,0,0);
/*!40000 ALTER TABLE `fs_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fs_role`
--

DROP TABLE IF EXISTS `fs_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fs_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) NOT NULL,
  `role_sort` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `remark` varchar(100) DEFAULT NULL,
  `create_by` int NOT NULL,
  `update_by` int NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_role`
--

LOCK TABLES `fs_role` WRITE;
/*!40000 ALTER TABLE `fs_role` DISABLE KEYS */;
INSERT INTO `fs_role` VALUES (1,'角色1',0,1,'',1,1,'2024-11-20 19:09:59.549496','2024-11-21 09:36:32.000000'),(2,'角色2',0,1,'',1,1,'2024-11-21 11:34:17.103543','2024-11-21 11:34:17.103543');
/*!40000 ALTER TABLE `fs_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fs_role_menu_relation`
--

DROP TABLE IF EXISTS `fs_role_menu_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fs_role_menu_relation` (
  `fsRoleId` int NOT NULL,
  `fsMenuId` int NOT NULL,
  PRIMARY KEY (`fsRoleId`,`fsMenuId`),
  KEY `IDX_5de6f2d5f16e468a5169096e25` (`fsRoleId`),
  KEY `IDX_d8b1289a84aff2bba3ca7d3f13` (`fsMenuId`),
  CONSTRAINT `FK_5de6f2d5f16e468a5169096e25b` FOREIGN KEY (`fsRoleId`) REFERENCES `fs_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d8b1289a84aff2bba3ca7d3f138` FOREIGN KEY (`fsMenuId`) REFERENCES `fs_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_role_menu_relation`
--

LOCK TABLES `fs_role_menu_relation` WRITE;
/*!40000 ALTER TABLE `fs_role_menu_relation` DISABLE KEYS */;
INSERT INTO `fs_role_menu_relation` VALUES (1,1),(1,2),(1,3),(1,4),(1,19),(1,20),(1,21),(1,22),(1,23),(2,1),(2,2),(2,3),(2,4),(2,9),(2,14),(2,16),(2,19),(2,20),(2,21),(2,22),(2,23),(2,24),(2,25),(2,26),(2,27),(2,31);
/*!40000 ALTER TABLE `fs_role_menu_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fs_user`
--

DROP TABLE IF EXISTS `fs_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fs_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL DEFAULT '20989eb67e13fdee0a42504dd0b3cf65358b',
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `salt` varchar(255) DEFAULT 'q5+Kdg==',
  `is_admin` int DEFAULT '0',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_user`
--

LOCK TABLES `fs_user` WRITE;
/*!40000 ALTER TABLE `fs_user` DISABLE KEYS */;
INSERT INTO `fs_user` VALUES (1,'admin2','管理','20989eb67e13fdee0a42504dd0b3cf65358b',NULL,'18255222222@qq.com','18255222222',1,NULL,0,'2024-11-25 19:30:58.000000','2024-11-25 19:31:58.000000'),(4,'didi','','5ed310cc03865ec985b3c80c38de20dee4e2','static/upload/4/fs_avatar_1733215262068_918464695.png','18255444444@163.com','18255444444',1,'wzA1HA==',0,'2024-11-21 11:55:26.000000','2024-12-03 16:41:02.000000'),(5,'admin','dididi2','696edaa6216f85ac03f1129ff6f5fa3d5f04','static/upload/5/fs_avatar_1733387062525_699715461.jpg','18255222223@qq.com','18255222222',1,'q5+Kdg==',1,'2024-11-25 19:30:58.672715','2024-12-05 16:24:22.000000'),(8,'wanglin','王麻子','20989eb67e13fdee0a42504dd0b3cf65358b',NULL,'18255444444@163.com','18255444444',1,'q5+Kdg==',0,'2024-11-28 17:25:25.251787','2024-12-09 17:43:42.000000');
/*!40000 ALTER TABLE `fs_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fs_user_role_relation`
--

DROP TABLE IF EXISTS `fs_user_role_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fs_user_role_relation` (
  `fsUserId` int NOT NULL,
  `fsRoleId` int NOT NULL,
  PRIMARY KEY (`fsUserId`,`fsRoleId`),
  KEY `IDX_f20039a6a4e3aba2d85453a3ef` (`fsUserId`),
  KEY `IDX_647af18ec73a7a969d351e441c` (`fsRoleId`),
  CONSTRAINT `FK_647af18ec73a7a969d351e441cc` FOREIGN KEY (`fsRoleId`) REFERENCES `fs_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_f20039a6a4e3aba2d85453a3ef0` FOREIGN KEY (`fsUserId`) REFERENCES `fs_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fs_user_role_relation`
--

LOCK TABLES `fs_user_role_relation` WRITE;
/*!40000 ALTER TABLE `fs_user_role_relation` DISABLE KEYS */;
INSERT INTO `fs_user_role_relation` VALUES (4,1),(4,2);
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

-- Dump completed on 2024-12-12 17:00:40
