-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th6 05, 2022 lúc 05:03 PM
-- Phiên bản máy phục vụ: 5.7.36
-- Phiên bản PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dbtruyen`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_comics`
--

DROP TABLE IF EXISTS `tb_comics`;
CREATE TABLE IF NOT EXISTS `tb_comics` (
  `comics_id` int(11) NOT NULL AUTO_INCREMENT,
  `comics_name` varchar(50) NOT NULL,
  `comics_introduce` varchar(50) DEFAULT NULL,
  `comics_style` varchar(50) DEFAULT NULL,
  `comics_img` varchar(200) DEFAULT NULL,
  `comics_cover_img` varchar(200) DEFAULT NULL,
  `like_comics` int(50) DEFAULT NULL,
  `comics_state` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comics_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_comics`
--

INSERT INTO `tb_comics` (`comics_id`, `comics_name`, `comics_introduce`, `comics_style`, `comics_img`, `comics_cover_img`, `like_comics`, `comics_state`, `created_at`) VALUES
(2, 'One Piece', 'One Piece', 'Hành động', 'https://i.pinimg.com/originals/6a/f3/87/6af387457739795e0b206aa27b17b457.jpg', 'https://i.pinimg.com/originals/6a/f3/87/6af387457739795e0b206aa27b17b457.jpg', 114, 'a', '2022-06-01 01:59:34'),
(3, 'Doraemon', 'Doraemon', 'Hài hước', 'http://res.cloudinary.com/djeiasb2d/image/upload/to6ortrxm1zrlevoxphq.jpg', 'http://res.cloudinary.com/djeiasb2d/image/upload/bgomzkfx4kdmxtkrhxhk.jpg', 119, 'chưa hoàn thành', '2022-05-19 01:59:34'),
(4, 'Naruto', 'Naruto', 'Hành động', 'https://img1.ak.crunchyroll.com/i/spire4/5568ffb263f6bcba85a639980b80dd9a1612993223_full.jpg', 'https://img1.ak.crunchyroll.com/i/spire4/5568ffb263f6bcba85a639980b80dd9a1612993223_full.jpg', 30, 'a', '2022-06-02 09:42:48'),
(5, 'Conan', 'Conan', 'Trinh thám', 'http://cdn.tgdd.vn/Files/2021/06/02/1356902/danh-sach-nhung-vu-an-hay-nhat-cua-phim-tham-tu-lung-danh-conan-202202141321180691.jpg', 'http://cdn.tgdd.vn/Files/2021/06/02/1356902/danh-sach-nhung-vu-an-hay-nhat-cua-phim-tham-tu-lung-danh-conan-202202141321180691.jpg', 100, 'a', '2022-06-02 09:48:36'),
(6, 'Dragon Ball', 'Dragon Ball', 'Hành động', 'https://dragonballwiki.net/xemphim/wp-content/uploads/2017/06/b1490089c2c0f46a4058e82f9889a3aa.jpg', 'https://dragonballwiki.net/xemphim/wp-content/uploads/2017/06/b1490089c2c0f46a4058e82f9889a3aa.jpg', 200, 'a', '2022-06-02 11:12:54');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_episode`
--

DROP TABLE IF EXISTS `tb_episode`;
CREATE TABLE IF NOT EXISTS `tb_episode` (
  `episode_id` int(11) NOT NULL AUTO_INCREMENT,
  `episode_name` varchar(50) NOT NULL,
  `episode_img` varchar(5000) DEFAULT NULL,
  `comics_id` int(11) NOT NULL,
  PRIMARY KEY (`episode_id`),
  KEY `comics_id` (`comics_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_episode`
--

INSERT INTO `tb_episode` (`episode_id`, `episode_name`, `episode_img`, `comics_id`) VALUES
(1, 'tập 1', 'https://res.cloudinary.com/thanhphat147/image/upload/v1654334464/OnePiece_Chap_1.1_oeqbcw.png,https://res.cloudinary.com/thanhphat147/image/upload/v1654334464/OnePiece_Chap_1.2_as6ked.png,https://res.cloudinary.com/thanhphat147/image/upload/v1654334464/OnePiece_Chap_1.3_w3v6wa.png,https://res.cloudinary.com/thanhphat147/image/upload/v1654334464/OnePiece_Chap_1.4_cqduhd.png', 2),
(2, 'tập 2', 'https://res.cloudinary.com/thanhphat147/image/upload/v1654334465/OnePiece_Chap_2.1_jystii.png,https://res.cloudinary.com/thanhphat147/image/upload/v1654334465/OnePiece_Chap_2.2_hb92sn.png,https://res.cloudinary.com/thanhphat147/image/upload/v1654334465/OnePiece_Chap_2.3_o8ppof.png,https://res.cloudinary.com/thanhphat147/image/upload/v1654334465/OnePiece_Chap_2.4_nzap52.png', 2),
(13, 'tập 1', 'http://res.cloudinary.com/djeiasb2d/image/upload/qkz2wsy2inn0rggwmgnr.png, http://res.cloudinary.com/djeiasb2d/image/upload/td1sh0ehtaddkqhrhsc7.png', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_favorite_comics`
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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_favorite_styles`
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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_like_comics`
--

DROP TABLE IF EXISTS `tb_like_comics`;
CREATE TABLE IF NOT EXISTS `tb_like_comics` (
  `like_comics_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comics_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_styles`
--

DROP TABLE IF EXISTS `tb_styles`;
CREATE TABLE IF NOT EXISTS `tb_styles` (
  `styles_id` int(11) NOT NULL AUTO_INCREMENT,
  `styles_name` varchar(50) NOT NULL,
  PRIMARY KEY (`styles_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_styles`
--

INSERT INTO `tb_styles` (`styles_id`, `styles_name`) VALUES
(1, 'Hành động'),
(2, 'Hài hước'),
(3, 'Trinh thám'),
(4, 'Kinh dị');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE IF NOT EXISTS `tb_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `user_avata` varchar(500) DEFAULT NULL,
  `user_cover_img` varchar(500) DEFAULT NULL,
  `favorite_comics` varchar(50) DEFAULT NULL,
  `favorite_style` varchar(50) DEFAULT NULL,
  `user_pass` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_user`
--

INSERT INTO `tb_user` (`user_id`, `user_name`, `user_avata`, `user_cover_img`, `favorite_comics`, `favorite_style`, `user_pass`) VALUES
(1, 'admin1', 'https://thuthuatnhanh.com/wp-content/uploads/2019/12/avatar-deo-khau-trang-410x580.jpg', 'https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-3-1024x682.jpg', 'Conan', 'Hành động', '123');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
