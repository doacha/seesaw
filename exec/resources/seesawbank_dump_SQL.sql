-- --------------------------------------------------------
-- 호스트:                          j9a409.p.ssafy.io
-- 서버 버전:                        10.3.38-MariaDB-0ubuntu0.20.04.1 - Ubuntu 20.04
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- seesawbank 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `seesawbank` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `seesawbank`;

-- 테이블 seesawbank.account 구조 내보내기
CREATE TABLE IF NOT EXISTS `account` (
  `account_bank_name` int(11) NOT NULL,
  `account_interest_rate` float NOT NULL,
  `account_recent_balance` bigint(20) NOT NULL DEFAULT 0,
  `account_status` int(11) NOT NULL DEFAULT 0,
  `account_type` int(11) NOT NULL DEFAULT 1,
  `account_creation_time` datetime(6) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `account_num` varchar(255) NOT NULL,
  `account_password` varchar(255) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  PRIMARY KEY (`account_num`),
  KEY `FKr5j0huynd7nsv1s7e9vb8qvwo` (`member_id`),
  CONSTRAINT `FKr5j0huynd7nsv1s7e9vb8qvwo` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 seesawbank.account:~15 rows (대략적) 내보내기
INSERT IGNORE INTO `account` (`account_bank_name`, `account_interest_rate`, `account_recent_balance`, `account_status`, `account_type`, `account_creation_time`, `account_name`, `account_num`, `account_password`, `member_id`) VALUES
	(0, 2, 490001, 0, 0, '2023-10-05 12:21:55.000000', '도아리 백년해로', '457899-01-042166', '{bcrypt}$2a$10$ICtVy2Ly25dP0kCuOXikheSlG9xFMuPve07SisV9OTQyeAy1cDDZi', 'aaa5011'),
	(0, 2, 13000, 0, 1, '2023-09-26 15:51:44.000000', '지원이의 적금 계좌', '457899-01-262839', '{bcrypt}$2a$10$zo4Ft2ZzzasFiubz2lSPz.GbV5f78bCWZaigsg1BxyWsqNv6s0IZu', 'jiwon'),
	(0, 2, 40000, 0, 0, '2023-10-04 14:39:03.000000', '돈이 리버스 복사가 된다구', '457899-01-273997', '{bcrypt}$2a$10$nuGZUkSlGGyePBIr/pTtGua53Uoi.5EIY17O9oZg8Qce5FxgXxVcy', 'funcodezune'),
	(0, 2, 11269414, 0, 0, '2023-09-26 16:27:36.000000', '시작하자 소비절약! 시소', '457899-01-296336', '{bcrypt}$2a$10$P2/Pj1HJMnIe4tozQwOVN.i967q/QIpw3hP9vh8TvaBppT/KTT0H2', 'seesaw'),
	(0, 2, 405000, 0, 1, '2023-09-29 15:47:18.000000', '티끌모아 적금', '457899-01-494002', '{bcrypt}$2a$10$rV2flLuTYMDW/b0Ucq1qDOf.wtQax6GwIXptvRMcucDLfdfQ6Ir1C', 'tldnjs324'),
	(0, 2, 1000000, 0, 0, '2023-10-04 13:26:42.000000', '싸피월급통장', '457899-01-541904', '{bcrypt}$2a$10$TAtu37T4q.n/ysZPCd8pT.VNqEAZ9auVxBTwzTwkulbC8vJaK3.qi', 'jjwoong1733'),
	(0, 2, 789000, 0, 1, '2023-10-04 14:39:35.000000', '돈 리버스 복사 방지용 적금 통장', '457899-01-543396', '{bcrypt}$2a$10$JbeXpVGgBQhNuusJhALaK.A9WyKQHgvDl88PVKLOFopzL/dpS9TC.', 'funcodezune'),
	(0, 2, 246805, 0, 0, '2023-10-04 14:31:57.000000', '도도한 아차의 대표계좌', '457899-01-543477', '{bcrypt}$2a$10$n22ru1p8B76UxXSWFVFGKeB6cAlsIGS8maaYJEQJg0BvXBhm2bJcG', 'doacha'),
	(0, 2, 124869, 0, 0, '2023-10-04 13:26:24.000000', '대표계좌가될상인가', '457899-01-579579', '{bcrypt}$2a$10$DCG70KPrWR3nt2Fs2hoJYOoPBU1KZidj0y4l4JKyyc2wAi9rxlwPi', 'jjwoong1733'),
	(0, 2, 10000, 0, 1, '2023-10-05 12:24:07.000000', '도아리 백년해로', '457899-01-589550', '{bcrypt}$2a$10$yfW63nDTsxd9wsKgCaZ.gu49JM457pnGiJ5LpNUjt/laIQI5zyNx2', 'aaa5011'),
	(0, 2, 568994, 0, 0, '2023-09-26 15:52:30.000000', '지원이의 일반 계좌', '457899-01-655239', '{bcrypt}$2a$10$DMqvH2BDp2SLlXGCKclMCO6keHCkiy8dgQA/bHqjPrlpoG/JhQDNa', 'jiwon'),
	(0, 2, 0, 0, 1, '2023-10-04 14:23:44.000000', '적금계좌생성', '457899-01-754268', '{bcrypt}$2a$10$E9NGskbI5k3e1uM6MrMXNe92CVoaZnZiz/MFSMhgSScp8sox0y0Ly', 'jjwoong1733'),
	(0, 2, 0, 0, 1, '2023-10-06 10:29:13.000000', '적금계좌', '457899-01-783105', '{bcrypt}$2a$10$kVSUuPkctEMgxOdNIOJO/OkPcttYB2Q96UqioVEmkTcFZf3ME1ijy', 'doacha'),
	(0, 2, 449999, 0, 1, '2023-10-04 15:16:28.000000', '적금이 일상', '457899-01-833726', '{bcrypt}$2a$10$4kEqoP0EOeYmb8/4.Dp8J.JRzTIXH6JUouO1fzceHKhBhwO0aiIYi', 'baegopda'),
	(0, 2, 3645001, 0, 0, '2023-10-04 13:55:21.000000', '시원이의 월급통장', '457899-01-873573', '{bcrypt}$2a$10$Jz765IbDQfNDFdg9xYAvAO8.6U2F07HVK10O8G6gq7hASx4ZEBx0e', 'tldnjs324');

-- 테이블 seesawbank.account_transaction 구조 내보내기
CREATE TABLE IF NOT EXISTS `account_transaction` (
  `account_amount_balance` int(11) NOT NULL,
  `account_approval_amount` int(11) NOT NULL,
  `account_is_deposit` bit(1) NOT NULL COMMENT '0: 출금, 1: 입금',
  `account_transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_transaction_time` datetime(6) NOT NULL,
  `account_deal_num` varchar(255) NOT NULL,
  `account_num` varchar(255) NOT NULL,
  `account_transaction_name` varchar(255) NOT NULL,
  `account_transaction_num` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`account_transaction_id`),
  KEY `FKg193vvs26urfhcba8o2wxpt66` (`account_num`),
  CONSTRAINT `FKg193vvs26urfhcba8o2wxpt66` FOREIGN KEY (`account_num`) REFERENCES `account` (`account_num`)
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 seesawbank.account_transaction:~160 rows (대략적) 내보내기
INSERT IGNORE INTO `account_transaction` (`account_amount_balance`, `account_approval_amount`, `account_is_deposit`, `account_transaction_id`, `account_transaction_time`, `account_deal_num`, `account_num`, `account_transaction_name`, `account_transaction_num`) VALUES
	(2, 1, b'1', 5, '2023-10-04 13:19:01.000000', 'TQMWSATxa', '457899-01-655239', '시소뱅크 3583', NULL),
	(500002, 1, b'1', 6, '2023-10-04 13:22:32.000000', 'T8T2Aj3Z4', '457899-01-655239', '시소뱅크 0341', NULL),
	(500003, 1, b'1', 7, '2023-10-04 13:29:50.000000', 'Tmf8Ok70T', '457899-01-655239', '시소뱅크 5995', NULL),
	(1, 1, b'1', 8, '2023-10-04 13:41:57.000000', 'Ti6WAe1DZ', '457899-01-579579', '시소뱅크 1377', NULL),
	(2, 1, b'1', 9, '2023-10-04 13:52:14.000000', 'TAAUA2OTq', '457899-01-579579', '시소뱅크 6533', NULL),
	(3, 1, b'1', 10, '2023-10-04 13:56:34.000000', 'ToPELxtaU', '457899-01-579579', '시소뱅크 7469', NULL),
	(4000001, 1, b'1', 11, '2023-10-04 13:57:10.000000', 'TI5YHWq8Y', '457899-01-873573', '시소뱅크 3336', NULL),
	(500004, 1, b'1', 12, '2023-10-04 14:49:30.000000', 'TG1tY4AYu', '457899-01-655239', '시소뱅크 2179', NULL),
	(450004, -50000, b'0', 13, '2023-10-04 14:52:07.000000', 'TapUewcHB', '457899-01-655239', '시소', '457899-01-296336'),
	(10111000, 50000, b'1', 14, '2023-10-04 14:52:07.000000', 'TapUewcHB', '457899-01-296336', '김지원', NULL),
	(58201, 1, b'1', 15, '2023-10-04 15:01:05.000000', 'T2XQYivWp', '457899-01-579579', '시소뱅크 2642', NULL),
	(430004, -20000, b'0', 16, '2023-10-04 15:04:12.000000', 'TJzHJddUG', '457899-01-655239', '시소', '457899-01-296336'),
	(10131000, 20000, b'1', 17, '2023-10-04 15:04:12.000000', 'TJzHJddUG', '457899-01-296336', '김지원', NULL),
	(58202, 1, b'1', 18, '2023-10-04 15:07:31.000000', 'TzEjjnUgu', '457899-01-579579', '시소뱅크 1074', NULL),
	(1, 1, b'1', 19, '2023-10-04 15:19:55.000000', 'T3mtMaLde', '457899-01-833726', '시소뱅크 0385', NULL),
	(2, 1, b'1', 20, '2023-10-04 15:22:42.000000', 'THfsbvy4u', '457899-01-833726', '시소뱅크 0604', NULL),
	(3, 1, b'1', 21, '2023-10-04 15:24:06.000000', 'TE1rhvJ1P', '457899-01-833726', '시소뱅크 8603', NULL),
	(3990001, -10000, b'0', 22, '2023-10-04 19:54:08.000000', 'T4EUGxxPN', '457899-01-873573', '시소', '457899-01-296336'),
	(10141000, 10000, b'1', 23, '2023-10-04 19:54:08.000000', 'T4EUGxxPN', '457899-01-296336', '박시원', NULL),
	(180000, -20000, b'0', 24, '2023-10-04 20:01:51.000000', 'TUyFPEANx', '457899-01-273997', '시소', '457899-01-296336'),
	(10161000, 20000, b'1', 25, '2023-10-04 20:01:51.000000', 'TUyFPEANx', '457899-01-296336', '김봉준', NULL),
	(160000, -20000, b'0', 26, '2023-10-04 20:02:38.000000', 'Trhqxirwt', '457899-01-273997', '시소', '457899-01-296336'),
	(10181000, 20000, b'1', 27, '2023-10-04 20:02:38.000000', 'Trhqxirwt', '457899-01-296336', '김봉준', NULL),
	(140000, -20000, b'0', 28, '2023-10-04 20:04:34.000000', 'T5xqSH7TY', '457899-01-273997', '시소', '457899-01-296336'),
	(10201000, 20000, b'1', 29, '2023-10-04 20:04:34.000000', 'T5xqSH7TY', '457899-01-296336', '김봉준', NULL),
	(120000, -20000, b'0', 30, '2023-10-04 20:06:03.000000', 'TrNaUGYqT', '457899-01-273997', '시소', '457899-01-296336'),
	(10221000, 20000, b'1', 31, '2023-10-04 20:06:03.000000', 'TrNaUGYqT', '457899-01-296336', '김봉준', NULL),
	(415004, -15000, b'0', 32, '2023-10-04 20:11:07.000000', 'TsZgklZmM', '457899-01-655239', '시소', '457899-01-296336'),
	(10236000, 15000, b'1', 33, '2023-10-04 20:11:07.000000', 'TsZgklZmM', '457899-01-296336', '김지원', NULL),
	(105000, -15000, b'0', 34, '2023-10-04 20:18:27.000000', 'TviZ28d81', '457899-01-273997', '시소', '457899-01-296336'),
	(10251000, 15000, b'1', 35, '2023-10-04 20:18:27.000000', 'TviZ28d81', '457899-01-296336', '김봉준', NULL),
	(95000, -10000, b'0', 36, '2023-10-04 20:25:42.000000', 'TrdSn3lOh', '457899-01-273997', '시소', '457899-01-296336'),
	(10261000, 10000, b'1', 37, '2023-10-04 20:25:42.000000', 'TrdSn3lOh', '457899-01-296336', '김봉준', NULL),
	(80000, -15000, b'0', 38, '2023-10-04 20:32:23.000000', 'TLhuW7eE8', '457899-01-273997', '시소', '457899-01-296336'),
	(10276000, 15000, b'1', 39, '2023-10-04 20:32:23.000000', 'TLhuW7eE8', '457899-01-296336', '김봉준', NULL),
	(65000, -15000, b'0', 40, '2023-10-04 21:02:18.000000', 'TgMaang87', '457899-01-273997', '시소', '457899-01-296336'),
	(10291000, 15000, b'1', 41, '2023-10-04 21:02:18.000000', 'TgMaang87', '457899-01-296336', '김봉준', NULL),
	(50000, -15000, b'0', 42, '2023-10-04 21:03:30.000000', 'THYKysORu', '457899-01-273997', '시소', '457899-01-296336'),
	(10306000, 15000, b'1', 43, '2023-10-04 21:03:30.000000', 'THYKysORu', '457899-01-296336', '김봉준', NULL),
	(35000, -15000, b'0', 44, '2023-10-04 21:05:37.000000', 'T4oHxxb1N', '457899-01-273997', '시소', '457899-01-296336'),
	(10321000, 15000, b'1', 45, '2023-10-04 21:05:37.000000', 'T4oHxxb1N', '457899-01-296336', '김봉준', NULL),
	(20000, -15000, b'0', 46, '2023-10-04 21:06:20.000000', 'TyYFANh2Z', '457899-01-273997', '시소', '457899-01-296336'),
	(10336000, 15000, b'1', 47, '2023-10-04 21:06:20.000000', 'TyYFANh2Z', '457899-01-296336', '김봉준', NULL),
	(5000, -15000, b'0', 48, '2023-10-04 21:06:44.000000', 'THNMZ6S1R', '457899-01-273997', '시소', '457899-01-296336'),
	(10351000, 15000, b'1', 49, '2023-10-04 21:06:44.000000', 'THNMZ6S1R', '457899-01-296336', '김봉준', NULL),
	(3980001, -10000, b'0', 50, '2023-10-04 21:12:39.000000', 'TesuuUWVG', '457899-01-873573', '시소', '457899-01-296336'),
	(10361000, 10000, b'1', 51, '2023-10-04 21:12:39.000000', 'TesuuUWVG', '457899-01-296336', '박시원', NULL),
	(246800, -10000, b'0', 52, '2023-10-04 21:13:03.000000', 'T7LaUuHWQ', '457899-01-543477', '시소', '457899-01-296336'),
	(10371000, 10000, b'1', 53, '2023-10-04 21:13:03.000000', 'T7LaUuHWQ', '457899-01-296336', '도아차', NULL),
	(4990, -10, b'0', 54, '2023-10-04 21:13:56.000000', 'TV8IZvJ66', '457899-01-273997', '시소', '457899-01-296336'),
	(10371010, 10, b'1', 55, '2023-10-04 21:13:56.000000', 'TV8IZvJ66', '457899-01-296336', '김봉준', NULL),
	(4980, -10, b'0', 56, '2023-10-04 21:14:45.000000', 'TwlDHRBDj', '457899-01-273997', '시소', '457899-01-296336'),
	(10371020, 10, b'1', 57, '2023-10-04 21:14:45.000000', 'TwlDHRBDj', '457899-01-296336', '김봉준', NULL),
	(4970, -10, b'0', 58, '2023-10-04 21:14:59.000000', 'TMrUI4pfp', '457899-01-273997', '시소', '457899-01-296336'),
	(10371030, 10, b'1', 59, '2023-10-04 21:14:59.000000', 'TMrUI4pfp', '457899-01-296336', '김봉준', NULL),
	(199990, -10, b'0', 60, '2023-10-04 21:17:18.000000', 'TZhlo1yU1', '457899-01-273997', '시소', '457899-01-296336'),
	(10371040, 10, b'1', 61, '2023-10-04 21:17:18.000000', 'TZhlo1yU1', '457899-01-296336', '김봉준', NULL),
	(199980, -10, b'0', 62, '2023-10-04 21:19:34.000000', 'Tq7G2tT9p', '457899-01-273997', '시소', '457899-01-296336'),
	(10371050, 10, b'1', 63, '2023-10-04 21:19:34.000000', 'Tq7G2tT9p', '457899-01-296336', '김봉준', NULL),
	(199970, -10, b'0', 64, '2023-10-04 21:19:41.000000', 'TgL7Zmdi9', '457899-01-273997', '시소', '457899-01-296336'),
	(10371060, 10, b'1', 65, '2023-10-04 21:19:41.000000', 'TgL7Zmdi9', '457899-01-296336', '김봉준', NULL),
	(414994, -10, b'0', 66, '2023-10-04 21:20:19.000000', 'TVk0LeBLY', '457899-01-655239', '시소', '457899-01-296336'),
	(10371070, 10, b'1', 67, '2023-10-04 21:20:19.000000', 'TVk0LeBLY', '457899-01-296336', '김지원', NULL),
	(199960, -10, b'0', 68, '2023-10-04 21:20:51.000000', 'T68TeS20x', '457899-01-273997', '시소', '457899-01-296336'),
	(10371080, 10, b'1', 69, '2023-10-04 21:20:51.000000', 'T68TeS20x', '457899-01-296336', '김봉준', NULL),
	(192960, -7000, b'0', 70, '2023-10-04 21:21:16.000000', 'T7iXqfuyQ', '457899-01-273997', '시소', '457899-01-296336'),
	(10378080, 7000, b'1', 71, '2023-10-04 21:21:16.000000', 'T7iXqfuyQ', '457899-01-296336', '김봉준', NULL),
	(182960, -10000, b'0', 72, '2023-10-04 21:42:07.000000', 'T4zYlII93', '457899-01-273997', '시소', '457899-01-296336'),
	(10388080, 10000, b'1', 73, '2023-10-04 21:42:07.000000', 'T4zYlII93', '457899-01-296336', '김봉준', NULL),
	(167960, -15000, b'0', 74, '2023-10-04 21:42:19.000000', 'TttjlF0MX', '457899-01-273997', '시소', '457899-01-296336'),
	(10403080, 15000, b'1', 75, '2023-10-04 21:42:19.000000', 'TttjlF0MX', '457899-01-296336', '김봉준', NULL),
	(364994, -50000, b'0', 76, '2023-10-05 11:04:43.000000', 'TBMTXyrQA', '457899-01-655239', '시소', '457899-01-296336'),
	(10453080, 50000, b'1', 77, '2023-10-05 11:04:43.000000', 'TBMTXyrQA', '457899-01-296336', '김지원', NULL),
	(148202, -10000, b'0', 78, '2023-10-05 12:19:38.000000', 'TErGspQd1', '457899-01-579579', '시소', '457899-01-296336'),
	(10463080, 10000, b'1', 79, '2023-10-05 12:19:38.000000', 'TErGspQd1', '457899-01-296336', '정재웅', NULL),
	(500001, 1, b'1', 80, '2023-10-05 12:23:28.000000', 'TIz8IiXGc', '457899-01-042166', '시소뱅크 4510', NULL),
	(344994, -20000, b'0', 81, '2023-10-05 13:00:22.000000', 'T3rYeyjk2', '457899-01-655239', '시소', '457899-01-296336'),
	(10483080, 20000, b'1', 82, '2023-10-05 13:00:22.000000', 'T3rYeyjk2', '457899-01-296336', '김지원', NULL),
	(314994, -30000, b'0', 83, '2023-10-05 13:08:40.000000', 'T3zLnQyjr', '457899-01-655239', '시소', '457899-01-296336'),
	(10513080, 30000, b'1', 84, '2023-10-05 13:08:40.000000', 'T3zLnQyjr', '457899-01-296336', '김지원', NULL),
	(311994, -3000, b'0', 85, '2023-10-05 13:10:04.000000', 'TVJbbVcFC', '457899-01-655239', '시소', '457899-01-296336'),
	(10516080, 3000, b'1', 86, '2023-10-05 13:10:04.000000', 'TVJbbVcFC', '457899-01-296336', '김지원', NULL),
	(67960, -100000, b'0', 87, '2023-10-05 13:10:20.000000', 'Tdqq1JUpH', '457899-01-273997', '시소', '457899-01-296336'),
	(10616080, 100000, b'1', 88, '2023-10-05 13:10:20.000000', 'Tdqq1JUpH', '457899-01-296336', '김봉준', NULL),
	(3970001, -10000, b'0', 89, '2023-09-21 03:00:00.000000', 'Tchf1dtkQ', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(332500, 10000, b'1', 90, '2023-09-21 03:00:00.000000', 'Tchf1dtkQ', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(3960001, -10000, b'0', 91, '2023-09-24 03:00:00.000000', 'T7oMJbz6s', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(342500, 10000, b'1', 92, '2023-09-24 03:00:00.000000', 'T7oMJbz6s', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(3950001, -10000, b'0', 93, '2023-09-27 03:00:00.000000', 'Trgor2byK', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(352500, 10000, b'1', 94, '2023-09-27 03:00:00.000000', 'Trgor2byK', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(3940001, -10000, b'0', 95, '2023-09-30 03:00:00.000000', 'Tvt3P7uCw', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(362500, 10000, b'1', 96, '2023-09-30 03:00:00.000000', 'Tvt3P7uCw', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(3930001, -10000, b'0', 97, '2023-10-03 03:00:00.000000', 'T5f6Xs6fZ', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(372500, 10000, b'1', 98, '2023-10-03 03:00:00.000000', 'T5f6Xs6fZ', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(211994, -100000, b'0', 107, '2023-10-05 13:14:47.000000', 'ThCFowGuj', '457899-01-655239', '시소', '457899-01-296336'),
	(10716080, 100000, b'1', 108, '2023-10-05 13:14:47.000000', 'ThCFowGuj', '457899-01-296336', '김지원', NULL),
	(3835001, -25000, b'0', 115, '2023-07-10 00:03:00.000000', 'TXnjbo7CL', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(467500, 25000, b'1', 116, '2023-07-10 00:03:00.000000', 'TXnjbo7CL', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(3810001, -25000, b'0', 117, '2023-07-17 03:00:00.000000', 'TWM4BZCEg', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(492500, 25000, b'1', 118, '2023-07-17 03:00:00.000000', 'TWM4BZCEg', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(3785001, -25000, b'0', 119, '2023-07-24 03:00:00.000000', 'TaVZApUDa', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(517500, 25000, b'1', 120, '2023-07-24 03:00:00.000000', 'TaVZApUDa', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(3760001, -25000, b'0', 121, '2023-07-31 03:00:00.000000', 'TIpkpnzg2', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(542500, 25000, b'1', 122, '2023-07-31 03:00:00.000000', 'TIpkpnzg2', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(201994, -10000, b'0', 123, '2023-10-05 13:17:33.000000', 'TkqcK2rre', '457899-01-655239', '시소', '457899-01-296336'),
	(10726080, 10000, b'1', 124, '2023-10-05 13:17:33.000000', 'TkqcK2rre', '457899-01-296336', '김지원', NULL),
	(171994, -30000, b'0', 125, '2023-10-05 13:19:13.000000', 'TbNTYoU8K', '457899-01-655239', '시소', '457899-01-296336'),
	(10756080, 30000, b'1', 126, '2023-10-05 13:19:13.000000', 'TbNTYoU8K', '457899-01-296336', '김지원', NULL),
	(141994, -30000, b'0', 127, '2023-10-05 13:31:49.000000', 'TsE5j0Lfc', '457899-01-655239', '시소', '457899-01-296336'),
	(10786080, 30000, b'1', 128, '2023-10-05 13:31:49.000000', 'TsE5j0Lfc', '457899-01-296336', '김지원', NULL),
	(111994, -30000, b'0', 129, '2023-10-05 13:39:02.000000', 'TPnUhquZi', '457899-01-655239', '시소', '457899-01-296336'),
	(10816080, 30000, b'1', 130, '2023-10-05 13:39:02.000000', 'TPnUhquZi', '457899-01-296336', '김지원', NULL),
	(128202, -20000, b'0', 131, '2023-10-05 13:39:49.000000', 'Tjh4G4phW', '457899-01-579579', '시소', '457899-01-296336'),
	(10836080, 20000, b'1', 132, '2023-10-05 13:39:49.000000', 'Tjh4G4phW', '457899-01-296336', '정재웅', NULL),
	(81994, -30000, b'0', 133, '2023-10-05 13:40:38.000000', 'TOyoh14FJ', '457899-01-655239', '시소', '457899-01-296336'),
	(10866080, 30000, b'1', 134, '2023-10-05 13:40:38.000000', 'TOyoh14FJ', '457899-01-296336', '김지원', NULL),
	(124869, -3333, b'0', 135, '2023-10-05 13:56:59.000000', 'TAnNXcfME', '457899-01-579579', '시소', '457899-01-296336'),
	(10869413, 3333, b'1', 136, '2023-10-05 13:56:59.000000', 'TAnNXcfME', '457899-01-296336', '정재웅', NULL),
	(581994, 500000, b'1', 137, '2023-10-05 14:04:59.000000', 'Tdlwicnwl', '457899-01-655239', '김지원', NULL),
	(450000, -50000, b'0', 138, '2023-10-05 19:54:55.000000', 'TSMl6bTw5', '457899-01-833726', '시소', '457899-01-296336'),
	(10919413, 50000, b'1', 139, '2023-10-05 19:54:55.000000', 'TSMl6bTw5', '457899-01-296336', '이경호', NULL),
	(37960, -30000, b'0', 140, '2023-10-05 19:55:52.000000', 'T5vFunh5S', '457899-01-273997', '시소', '457899-01-296336'),
	(10949413, 30000, b'1', 141, '2023-10-05 19:55:52.000000', 'T5vFunh5S', '457899-01-296336', '김봉준', NULL),
	(7960, -30000, b'0', 142, '2023-10-05 19:55:58.000000', 'TTYRJmW6m', '457899-01-273997', '시소', '457899-01-296336'),
	(10979413, 30000, b'1', 143, '2023-10-05 19:55:58.000000', 'TTYRJmW6m', '457899-01-296336', '김봉준', NULL),
	(3710001, -50000, b'0', 144, '2023-10-05 19:58:38.000000', 'T3e35WyNi', '457899-01-873573', '시소', '457899-01-296336'),
	(11029413, 50000, b'1', 145, '2023-10-05 19:58:38.000000', 'T3e35WyNi', '457899-01-296336', '박시원', NULL),
	(3680001, -30000, b'0', 146, '2023-10-05 20:57:56.000000', 'T85sC0a2d', '457899-01-873573', '시소', '457899-01-296336'),
	(11059413, 30000, b'1', 147, '2023-10-05 20:57:56.000000', 'T85sC0a2d', '457899-01-296336', '박시원', NULL),
	(3650001, -30000, b'0', 148, '2023-10-05 20:58:37.000000', 'Tpux3B4I3', '457899-01-873573', '시소', '457899-01-296336'),
	(11089413, 30000, b'1', 149, '2023-10-05 20:58:37.000000', 'Tpux3B4I3', '457899-01-296336', '박시원', NULL),
	(999970000, -30000, b'0', 150, '2023-10-05 21:06:10.000000', 'T2KN35Vgd', '457899-01-273997', '시소', '457899-01-296336'),
	(11119413, 30000, b'1', 151, '2023-10-05 21:06:10.000000', 'T2KN35Vgd', '457899-01-296336', '김봉준', NULL),
	(999940000, -30000, b'0', 152, '2023-10-05 21:06:18.000000', 'TPjib3ek6', '457899-01-273997', '시소', '457899-01-296336'),
	(11149413, 30000, b'1', 153, '2023-10-05 21:06:18.000000', 'TPjib3ek6', '457899-01-296336', '김봉준', NULL),
	(999910000, -30000, b'0', 154, '2023-10-05 21:06:28.000000', 'TbWZnO90p', '457899-01-273997', '시소', '457899-01-296336'),
	(11179413, 30000, b'1', 155, '2023-10-05 21:06:28.000000', 'TbWZnO90p', '457899-01-296336', '김봉준', NULL),
	(999880000, -30000, b'0', 156, '2023-10-05 21:06:32.000000', 'TJqqKJAMf', '457899-01-273997', '시소', '457899-01-296336'),
	(11209413, 30000, b'1', 157, '2023-10-05 21:06:32.000000', 'TJqqKJAMf', '457899-01-296336', '김봉준', NULL),
	(246801, 1, b'1', 158, '2023-10-05 21:10:31.000000', 'TqGS4RXh2', '457899-01-543477', '시소뱅크 6148', NULL),
	(246802, 1, b'1', 159, '2023-10-05 21:11:58.000000', 'TM44R1uP7', '457899-01-543477', '시소뱅크 4693', NULL),
	(246803, 1, b'1', 160, '2023-10-05 21:32:14.000000', 'TQ7G9CLs9', '457899-01-543477', '시소뱅크 6176', NULL),
	(578994, -3000, b'0', 161, '2023-10-06 04:10:01.000000', 'T4yFy65yj', '457899-01-655239', '시소 미션 연계 적금', '457899-01-262839'),
	(490001, -10000, b'0', 162, '2023-10-06 04:10:01.000000', 'TLiRaVWhH', '457899-01-042166', '시소 미션 연계 적금', '457899-01-589550'),
	(3645001, -5000, b'0', 163, '2023-10-06 04:10:01.000000', 'T8mP9MHda', '457899-01-873573', '시소 미션 연계 적금', '457899-01-494002'),
	(447000, -3000, b'0', 164, '2023-10-06 04:10:01.000000', 'TDjHz8aK6', '457899-01-833726', '시소 미션 연계 적금', '457899-01-833726'),
	(405000, 5000, b'1', 165, '2023-10-06 04:10:01.000000', 'T8mP9MHda', '457899-01-494002', '시소 미션 연계 적금', NULL),
	(3000, 3000, b'1', 166, '2023-10-06 04:10:01.000000', 'T4yFy65yj', '457899-01-262839', '시소 미션 연계 적금', NULL),
	(10000, 10000, b'1', 167, '2023-10-06 04:10:01.000000', 'TLiRaVWhH', '457899-01-589550', '시소 미션 연계 적금', NULL),
	(450000, 3000, b'1', 168, '2023-10-06 04:10:01.000000', 'TDjHz8aK6', '457899-01-833726', '시소 미션 연계 적금', NULL),
	(246804, 1, b'1', 169, '2023-10-06 08:40:11.000000', 'TgVWb3DdQ', '457899-01-543477', '시소뱅크 4323', NULL),
	(568994, -10000, b'0', 170, '2023-10-06 09:14:05.000000', 'TppuDC2IG', '457899-01-655239', '김지원', '457899-01-262839'),
	(13000, 10000, b'1', 171, '2023-10-06 09:14:05.000000', 'TppuDC2IG', '457899-01-262839', '김지원', NULL),
	(449999, -1, b'0', 172, '2023-10-06 09:16:26.000000', 'TvfPOBBiQ', '457899-01-833726', '시소', '457899-01-296336'),
	(11209414, 1, b'1', 173, '2023-10-06 09:16:26.000000', 'TvfPOBBiQ', '457899-01-296336', '이경호', NULL),
	(70000, -30000, b'0', 174, '2023-10-06 09:19:29.000000', 'TMHwfRmkG', '457899-01-273997', '시소', '457899-01-296336'),
	(11239414, 30000, b'1', 175, '2023-10-06 09:19:29.000000', 'TMHwfRmkG', '457899-01-296336', '김봉준', NULL),
	(246805, 1, b'1', 176, '2023-10-06 10:28:32.000000', 'TeW7HdAwq', '457899-01-543477', '시소뱅크 3934', NULL),
	(40000, -30000, b'0', 177, '2023-10-06 12:22:00.000000', 'T4hXdO2C0', '457899-01-273997', '시소', '457899-01-296336'),
	(11269414, 30000, b'1', 178, '2023-10-06 12:22:00.000000', 'T4hXdO2C0', '457899-01-296336', '김봉준', NULL);

-- 테이블 seesawbank.card 구조 내보내기
CREATE TABLE IF NOT EXISTS `card` (
  `card_company_name` int(11) DEFAULT NULL,
  `card_payment_date` int(11) NOT NULL DEFAULT 14,
  `account_num` varchar(255) NOT NULL,
  `card_num` varchar(255) NOT NULL,
  `card_type` varchar(255) DEFAULT NULL,
  `member_id` varchar(255) NOT NULL,
  PRIMARY KEY (`card_num`),
  KEY `FKqv8uiqfoe2eepkqyjukm0hbsc` (`account_num`),
  KEY `FKbf204t9qecurpbyoqlmpcy5t4` (`member_id`),
  CONSTRAINT `FKbf204t9qecurpbyoqlmpcy5t4` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKqv8uiqfoe2eepkqyjukm0hbsc` FOREIGN KEY (`account_num`) REFERENCES `account` (`account_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 seesawbank.card:~2 rows (대략적) 내보내기
INSERT IGNORE INTO `card` (`card_company_name`, `card_payment_date`, `account_num`, `card_num`, `card_type`, `member_id`) VALUES
	(0, 14, '457899-01-579579', '1111-2222-3333-4444', NULL, 'jjwoong1733'),
	(0, 14, '457899-01-655239', '1234-5678-1998-0722', NULL, 'jiwon');

-- 테이블 seesawbank.card_transaction 구조 내보내기
CREATE TABLE IF NOT EXISTS `card_transaction` (
  `card_approval_amount` int(11) NOT NULL,
  `card_transaction_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `card_approval_num` varchar(255) NOT NULL,
  `card_company` varchar(255) NOT NULL,
  `card_num` varchar(255) NOT NULL,
  `card_store_bus_num` varchar(255) NOT NULL,
  `card_store_category` varchar(255) NOT NULL,
  `card_store_name` varchar(255) NOT NULL,
  PRIMARY KEY (`card_approval_num`),
  KEY `FKavl91inkngih70xmubiwnhpmm` (`card_num`),
  CONSTRAINT `FKavl91inkngih70xmubiwnhpmm` FOREIGN KEY (`card_num`) REFERENCES `card` (`card_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 seesawbank.card_transaction:~2 rows (대략적) 내보내기
INSERT IGNORE INTO `card_transaction` (`card_approval_amount`, `card_transaction_time`, `card_approval_num`, `card_company`, `card_num`, `card_store_bus_num`, `card_store_category`, `card_store_name`) VALUES
	(10000, '2023-10-02 09:31:18', 'T12345678', '0', '1234-5678-1998-0722', 'S12345', '일반음식점', '마포원조떡볶이'),
	(3000, '2023-10-04 14:32:34', 'T12345689', '0', '1234-5678-1998-0722', 'S12874', '편의점', 'CU마포우성점');

-- 테이블 seesawbank.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `member_id` varchar(255) NOT NULL,
  `member_name` varchar(255) NOT NULL,
  `member_password` varchar(255) NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 seesawbank.member:~8 rows (대략적) 내보내기
INSERT IGNORE INTO `member` (`member_id`, `member_name`, `member_password`) VALUES
	('aaa5011', '김한나', '{bcrypt}$2a$10$sftLxgzQJDEAhrCcL4hAEusFeqHQUD7GzjZOjvfdGx6VqEJOavInC'),
	('baegopda', '이경호', '{bcrypt}$2a$10$2vcce2R1i/buw6QzS6CfWuZl7qfmYRer.PvcsZVQAxuXif2OFfcbe'),
	('doacha', '도아차', '{bcrypt}$2a$10$wAjs4IzhAH9Syy/4rtWfGOf4InJUVKLX3m007r26bYmS..NPGLC8W'),
	('funcodezune', '김봉준', '{bcrypt}$2a$10$zmEl.Uo6BUiRNOuCHpGGluP4MTlq1LWWWBPEBbeeMUmcpro7x/uye'),
	('jiwon', '김지원', '{bcrypt}$2a$10$0nF8roQrOkslYiJtmKQGEOpqw7v8qzmxk1Esh28h1nrRFjEtf9/Iu'),
	('jjwoong1733', '정재웅', '{bcrypt}$2a$10$5ekjth8smdzHaLRCHqF66OCwWks6spoPIFzo.saIcZOcmQ3EWONj2'),
	('seesaw', '시소', '{bcrypt}$2a$10$mcc7rN2m.sSOIsF3eYC0v.OWQRfaAITVCNX4APUH4dEMatiwz3vKm'),
	('tldnjs324', '박시원', '{bcrypt}$2a$10$w3fdubYYmbHVNp7wJJ1ex.b453WF2WUv7dNgA1IZ8W.vH6BaW64Gq');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
