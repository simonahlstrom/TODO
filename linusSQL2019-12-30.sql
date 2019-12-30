-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 30, 2019 at 09:17 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `TODO`
--

-- --------------------------------------------------------

--
-- Table structure for table `Icon`
--

CREATE TABLE `Icon` (
  `url` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Icon`
--

INSERT INTO `Icon` (`url`, `type`) VALUES
('default.png', 'label'),
('work.png', 'label');
