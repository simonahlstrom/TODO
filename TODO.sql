-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 30, 2019 at 03:48 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `TODO`
--

-- --------------------------------------------------------

--
-- Table structure for table `Color`
--

CREATE TABLE `Color` (
  `rgb` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Color`
--

INSERT INTO `Color` (`rgb`) VALUES
('rgba(200, 51, 030, .8)');

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
('url.png', 'theme'),
('work.png', 'label');

-- --------------------------------------------------------

--
-- Table structure for table `Labels`
--

CREATE TABLE `Labels` (
  `labelId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `labelName` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL,
  `activated` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Labels`
--

INSERT INTO `Labels` (`labelId`, `userId`, `labelName`, `color`, `icon`, `activated`) VALUES
(7, 6, 'Linus', 'rgba(40, 40, 40, 1)', 'work.png', 1),
(8, 7, 'Isak', 'rgba(40, 40, 40, 1)', 'default.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Subtasks`
--

CREATE TABLE `Subtasks` (
  `subId` int(11) NOT NULL,
  `subName` varchar(100) NOT NULL,
  `deadline` date DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `claimedName` varchar(100) DEFAULT '0',
  `userId` int(11) DEFAULT NULL,
  `taskId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Subtasks`
--

INSERT INTO `Subtasks` (`subId`, `subName`, `deadline`, `completed`, `claimedName`, `userId`, `taskId`) VALUES
(33, 'ost', NULL, 0, '0', 6, 14),
(34, 'Mjölk', '2020-01-22', 1, '0', 6, 14),
(35, 'Smör', '2019-12-31', 0, '0', 6, 14),
(36, 'Majs', NULL, 0, '0', 6, 14),
(37, 'koda', '2020-01-14', 0, 'Isak', 6, 15),
(38, 'Fixa ikoner', NULL, 1, '0', 6, 15),
(39, 'Gogo', '2020-01-24', 0, '0', 6, 15),
(40, 'adad', '2019-12-30', 1, '0', 6, 16),
(41, 'adad', '2020-03-11', 0, '0', 6, 17),
(42, 'dadad', NULL, 0, '0', 6, 18);

-- --------------------------------------------------------

--
-- Table structure for table `TaskMembers`
--

CREATE TABLE `TaskMembers` (
  `taskId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `creator` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `TaskMembers`
--

INSERT INTO `TaskMembers` (`taskId`, `userId`, `creator`) VALUES
(14, 6, 1),
(15, 6, 2),
(15, 7, 0),
(16, 6, 1),
(17, 6, 1),
(18, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Tasks`
--

CREATE TABLE `Tasks` (
  `taskId` int(11) NOT NULL,
  `taskName` varchar(100) NOT NULL,
  `code` varchar(4) NOT NULL,
  `completedTask` tinyint(1) NOT NULL DEFAULT '0',
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Tasks`
--

INSERT INTO `Tasks` (`taskId`, `taskName`, `code`, `completedTask`, `added`) VALUES
(14, 'Handla', 'NkME', 0, '2019-12-30 12:52:07'),
(15, 'TODO', 'qMvb', 0, '2019-12-30 12:52:49'),
(16, 'first', '3iuJ', 1, '2019-12-30 14:55:31'),
(17, 'last', 'kQvv', 0, '2019-12-30 14:40:53'),
(18, 'hejhej', 'nt8y', 0, '2019-12-30 14:41:20');

-- --------------------------------------------------------

--
-- Table structure for table `TasksInLabelRel`
--

CREATE TABLE `TasksInLabelRel` (
  `taskId` int(11) NOT NULL,
  `labelId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `TasksInLabelRel`
--

INSERT INTO `TasksInLabelRel` (`taskId`, `labelId`) VALUES
(14, 7),
(15, 7),
(15, 8),
(16, 7),
(17, 7),
(18, 7);

-- --------------------------------------------------------

--
-- Table structure for table `Theme`
--

CREATE TABLE `Theme` (
  `themeId` int(11) NOT NULL,
  `themeName` varchar(100) NOT NULL,
  `mainColor` varchar(100) NOT NULL,
  `subColor` varchar(100) NOT NULL,
  `accentColor` varchar(100) NOT NULL,
  `fontColor` varchar(100) NOT NULL,
  `inputColor` varchar(100) NOT NULL,
  `archivedColor` varchar(100) NOT NULL,
  `fontColor2` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Theme`
--

INSERT INTO `Theme` (`themeId`, `themeName`, `mainColor`, `subColor`, `accentColor`, `fontColor`, `inputColor`, `archivedColor`, `fontColor2`) VALUES
(2, 'dark', '#181a28', '#2c2a71', '#2c2a71', '#dfeee2', '#33334f', '#dfeee254', '#dfeee2'),
(4, 'MAU', 'whitesmoke', 'grey', '#e4022d', '#352a2a', '#ffffff', '#352a2a54', '#ffffff'),
(5, 'Dark 2', '#040303', '#3b1d39', '#401f3e', '#fbf5f3', '#5b575e', '#fbf5f354', '#fbf5f3'),
(6, 'Mint', 'whitesmoke', '#8cd7bf', '#8cd7bf', '#3a4340', '#b2edda', '#3a434054', '#3a4340');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `userId` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `occupation` varchar(100) NOT NULL,
  `themeId` int(11) NOT NULL,
  `fontSize` varchar(50) NOT NULL DEFAULT '15px'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`userId`, `username`, `email`, `password`, `occupation`, `themeId`, `fontSize`) VALUES
(6, 'Linus', 'linus@gmail.com', 'testl', 'Student', 5, '15px'),
(7, 'Isak', 'isak@com', 'test', 'Snickare', 2, '15px');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Labels`
--
ALTER TABLE `Labels`
  ADD PRIMARY KEY (`labelId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Subtasks`
--
ALTER TABLE `Subtasks`
  ADD PRIMARY KEY (`subId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `subtasks_ibfk_2` (`taskId`);

--
-- Indexes for table `TaskMembers`
--
ALTER TABLE `TaskMembers`
  ADD KEY `taskId` (`taskId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Tasks`
--
ALTER TABLE `Tasks`
  ADD PRIMARY KEY (`taskId`);

--
-- Indexes for table `TasksInLabelRel`
--
ALTER TABLE `TasksInLabelRel`
  ADD KEY `labelId` (`labelId`),
  ADD KEY `tasksinlabelrel_ibfk_2` (`taskId`);

--
-- Indexes for table `Theme`
--
ALTER TABLE `Theme`
  ADD PRIMARY KEY (`themeId`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `themeId` (`themeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Labels`
--
ALTER TABLE `Labels`
  MODIFY `labelId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Subtasks`
--
ALTER TABLE `Subtasks`
  MODIFY `subId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `Tasks`
--
ALTER TABLE `Tasks`
  MODIFY `taskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Theme`
--
ALTER TABLE `Theme`
  MODIFY `themeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Labels`
--
ALTER TABLE `Labels`
  ADD CONSTRAINT `labels_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Subtasks`
--
ALTER TABLE `Subtasks`
  ADD CONSTRAINT `subtasks_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`),
  ADD CONSTRAINT `subtasks_ibfk_2` FOREIGN KEY (`taskId`) REFERENCES `Tasks` (`taskId`);

--
-- Constraints for table `TaskMembers`
--
ALTER TABLE `TaskMembers`
  ADD CONSTRAINT `taskmembers_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `Tasks` (`taskId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `taskmembers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`);

--
-- Constraints for table `TasksInLabelRel`
--
ALTER TABLE `TasksInLabelRel`
  ADD CONSTRAINT `tasksinlabelrel_ibfk_1` FOREIGN KEY (`labelId`) REFERENCES `Labels` (`labelId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasksinlabelrel_ibfk_2` FOREIGN KEY (`taskId`) REFERENCES `Tasks` (`taskId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`themeId`) REFERENCES `Theme` (`themeId`) ON DELETE CASCADE ON UPDATE CASCADE;
