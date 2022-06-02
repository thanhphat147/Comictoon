-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 28, 2022 at 11:15 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbtruyen`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_comics`
--

DROP TABLE IF EXISTS `tb_comics`;
CREATE TABLE IF NOT EXISTS `tb_comics` (
  `comics_id` int(11) NOT NULL AUTO_INCREMENT,
  `comics_name` varchar(50) NOT NULL,
  `comics_introduce` varchar(50) DEFAULT NULL,
  `comics_style` varchar(50) DEFAULT NULL,
  `comics_img` varchar(200) DEFAULT NULL,
  `comics_cover_img` varchar(200) DEFAULT NULL,
  `like_comics` varchar(50) DEFAULT NULL,
  `comics_state` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`comics_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_episode`
--

DROP TABLE IF EXISTS `tb_episode`;
CREATE TABLE IF NOT EXISTS `tb_episode` (
  `episode_id` int(11) NOT NULL AUTO_INCREMENT,
  `episode_name` varchar(50) NOT NULL,
  `episode_img` varchar(50) DEFAULT NULL,
  `comics_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`episode_id`),
  KEY `comics_id` (`comics_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_favorite_comics`
--

DROP TABLE IF EXISTS `tb_favorite_comics`;
CREATE TABLE IF NOT EXISTS `tb_favorite_comics` (
  `favorite_comics_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `comics_id` varchar(50) DEFAULT NULL,
  `favorite_comics_state` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`favorite_comics_id`),
  KEY `comics_id` (`comics_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_favorite_styles`
--

DROP TABLE IF EXISTS `tb_favorite_styles`;
CREATE TABLE IF NOT EXISTS `tb_favorite_styles` (
  `favorite_styles_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `style_id` varchar(50) DEFAULT NULL,
  `favorite_styles_state` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`favorite_styles_id`),
  KEY `style_id` (`style_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_styles`
--

DROP TABLE IF EXISTS `tb_styles`;
CREATE TABLE IF NOT EXISTS `tb_styles` (
  `styles_id` int(11) NOT NULL AUTO_INCREMENT,
  `styles_name` varchar(50) NOT NULL,
  PRIMARY KEY (`styles_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE IF NOT EXISTS `tb_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `user_avata` varchar(200) DEFAULT NULL,
  `user_cover_img` varchar(200) DEFAULT NULL,
  `favorite_comics` varchar(50) DEFAULT NULL,
  `favorite_styles` varchar(50) DEFAULT NULL,
  `user_pass` varchar(30) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`user_id`, `user_name`, `user_avata`, `user_cover_img`, `favorite_comics`, `favorite_styles`, `user_pass`) VALUES
(1, 'admin', 'https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang-410x580.jpg', 'https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-3-1024x682.jpg', 'Conan', 'Hành động', '123'),
(2, 'admin2', NULL, NULL, NULL, NULL, '123');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
