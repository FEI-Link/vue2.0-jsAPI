-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.34 - MySQL Community Server - GPL
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 learn 的数据库结构
CREATE DATABASE IF NOT EXISTS `learn` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `learn`;

-- 导出  表 learn.paper 结构
CREATE TABLE IF NOT EXISTS `paper` (
  `paperid` int NOT NULL AUTO_INCREMENT,
  `papername` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `imgsrc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`paperid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- 正在导出表  learn.paper 的数据：~1 rows (大约)
INSERT INTO `paper` (`paperid`, `papername`, `name`, `createtime`, `imgsrc`) VALUES
	(17, '四轴连杆', 'admin', '2024-05-28 21:10:01', 'http://localhost:3000/img/5b1774a821c0d27830cb97173ffae95c.jpg');

-- 导出  表 learn.plan 结构
CREATE TABLE IF NOT EXISTS `plan` (
  `planid` int NOT NULL AUTO_INCREMENT,
  `paperid` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `surface` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `size` int DEFAULT NULL,
  `level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ra` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `scheme` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ord` int DEFAULT NULL,
  PRIMARY KEY (`planid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- 正在导出表  learn.plan 的数据：~3 rows (大约)
INSERT INTO `plan` (`planid`, `paperid`, `userid`, `surface`, `size`, `level`, `ra`, `scheme`, `ord`) VALUES
	(7, 12, 8, '面', 45, '10', '6.3', '粗刨(粗铣)一半精创(半精铣)', 1),
	(25, 17, 1, '1231', 1221, '7', '3.2', '粗刨(粗铣)一半精创(半精铣)一精刨(精铣)', 1),
	(26, 17, 1, '34', 35, '9', '3.2', '粗镗(粗扩)-半精镗(精扩)', 2);

-- 导出  表 learn.users 结构
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `roles` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- 正在导出表  learn.users 的数据：~3 rows (大约)
INSERT INTO `users` (`userId`, `username`, `password`, `roles`, `name`) VALUES
	(1, 'admin', '123456', 'admin', 'admin'),
	(8, 'zz', '123456', 'designer', '翟振'),
	(9, '111', '123456', 'user', '用户');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
