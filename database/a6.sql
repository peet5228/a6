-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Nov 29, 2025 at 05:18 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `a6`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_indicate`
--

CREATE TABLE `tb_indicate` (
  `id_indicate` int NOT NULL,
  `id_topic` int NOT NULL,
  `name_indicate` varchar(100) NOT NULL,
  `detail_indicate` text NOT NULL,
  `point_indicate` int NOT NULL,
  `check_indicate` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_stytem`
--

CREATE TABLE `tb_stytem` (
  `id_sys` int NOT NULL,
  `day_open` date NOT NULL,
  `day_out` int NOT NULL,
  `round_sys` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `year_sys` varchar(4) NOT NULL,
  `status_sys` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_topic`
--

CREATE TABLE `tb_topic` (
  `id_topic` int NOT NULL,
  `name_topic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_indicate`
--
ALTER TABLE `tb_indicate`
  ADD PRIMARY KEY (`id_indicate`);

--
-- Indexes for table `tb_stytem`
--
ALTER TABLE `tb_stytem`
  ADD PRIMARY KEY (`id_sys`);

--
-- Indexes for table `tb_topic`
--
ALTER TABLE `tb_topic`
  ADD PRIMARY KEY (`id_topic`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_indicate`
--
ALTER TABLE `tb_indicate`
  MODIFY `id_indicate` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_stytem`
--
ALTER TABLE `tb_stytem`
  MODIFY `id_sys` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_topic`
--
ALTER TABLE `tb_topic`
  MODIFY `id_topic` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
