-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 30, 2019 at 10:34 AM
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
('url.png', 'theme');

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
(1, 2, 'label_1', 'rgba(200, 51, 030, .8)', 'url.png', 1),
(3, 2, 'label_3', 'rgba(45, 20, 230, .1)', 'url3.png', 1),
(4, 2, 'label_2', 'rgba(100, 251, 230, .8)', 'url2.png', 1),
(5, 3, 'label_Linus', 'rgba(20, 51, 30, .8)', 'url5.png', 1),
(6, 5, 'Linus', 'rgba(40, 40, 40, 1)', 'default.png', 1),
(7, 6, 'Timmy', 'rgba(40, 40, 40, 1)', 'default.png', 1),
(8, 7, 'mimmi', 'rgba(40, 40, 40, 1)', 'default.png', 1),
(9, 8, 'Kajsa', 'rgba(40, 40, 40, 1)', 'default.png', 1),
(10, 9, 'Elon', 'rgba(40, 40, 40, 1)', 'default.png', 1),
(11, 10, 'Johanna', 'rgba(40, 40, 40, 1)', 'default.png', 1),
(12, 11, 'hiedi', 'rgba(40, 40, 40, 1)', 'default.png', 1);

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
(4, 'test', NULL, 0, '0', 2, 1),
(12, 'subtest2', NULL, 0, 'Simon', 2, 1),
(14, 'subtest4', NULL, 0, '0', 2, 1),
(15, 'subtest5', '2020-01-21', 0, '0', 2, 4),
(16, 'subtest6', '2019-12-20', 1, '0', 2, 4),
(17, 'subtest7', '2020-01-12', 0, '0', 2, 4),
(18, 'subtest8', NULL, 0, '0', 2, 4),
(22, 'asdad', NULL, 0, '0', 8, 7),
(23, 'subtasd', NULL, 0, '0', 8, 7),
(27, 'ett steg', NULL, 0, 'Simon', 2, 10),
(38, 'NY to add', NULL, 0, 'Kajsa', 8, 10),
(39, 'Add me as well', '2019-12-30', 1, 'Simon', 8, 10),
(40, 'nunu', NULL, 0, '0', 2, 10),
(41, 'adad', '2019-12-21', 0, '0', 2, 14),
(42, 'Down by the riverside', '2020-01-01', 0, '0', 2, 14),
(43, 'Vem är kontaktperson?', NULL, 0, '0', 2, 15),
(44, 'Ring ang praktik', NULL, 0, '0', 2, 15),
(45, 'Skriv ansökan', NULL, 0, '0', 2, 15),
(46, 'Invent death ray', '2019-12-30', 0, '0', 9, 16),
(47, 'Saffran', NULL, 1, '0', 10, 17),
(48, 'Mjöl', NULL, 0, '0', 10, 17),
(49, 'Mjölk', '2019-12-30', 0, '0', 10, 17);

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
(1, 2, 2),
(4, 2, 2),
(4, 3, 0),
(4, 6, 0),
(4, 7, 0),
(10, 2, 2),
(7, 8, 2),
(10, 8, 0),
(14, 2, 1),
(15, 2, 2),
(16, 9, 1),
(7, 2, 0),
(17, 10, 1),
(18, 10, 1);

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
(1, 'TestTask', '23ds', 0, '2019-12-12 09:36:08'),
(4, 'Task4', 'as9s', 0, '2019-12-10 13:06:27'),
(7, 'muta Löven', 'L8rU', 0, '2019-12-21 15:46:44'),
(10, 'Springa så långt det bara går över skog och berg', 'stjn', 0, '2019-12-27 23:30:18'),
(14, 'Hi ther ', 'gzmw', 0, '2019-12-29 20:44:22'),
(15, 'Praktik stadsförvaltningen', 'iE6T', 0, '2019-12-29 20:44:25'),
(16, 'Be the next Tesla', 'PQC3', 0, '2019-12-29 20:40:34'),
(17, 'Baka lussekatter', 'TK8x', 0, '2019-12-29 21:34:19'),
(18, 'hihi', 'f4RI', 0, '2019-12-30 10:26:17');

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
(1, 1),
(4, 3),
(4, 5),
(4, 7),
(4, 8),
(7, 3),
(10, 4),
(10, 4),
(10, 4),
(10, 4),
(14, 1),
(15, 3),
(16, 10),
(7, 3),
(17, 11),
(18, 11);

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

INSERT INTO `Theme` (`themeId`, `themeName`, `mainColor`, `subColor`, `accentColor`) VALUES
(1, 'dark', '#181a28', '#2c2a71', '#2c2a71'),
(2, 'light', 'rgba(245,245,245,1)', 'rgb(96,162,153)', 'rgb(128,188,176)');

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
(2, 'Simon', 'Simon@gmail.com', 'test', 'test', 1, '15px'),
(3, 'Linus', 'linus@test.com', 'test1', 'Thoraxkirurg', 1, '15px'),
(5, 'Linus2', 'linus.grahn.nobring@hotmail.com', 'lasolana', 'Fisherman', 1, '15px'),
(6, 'Timmy', 't@gmail.com', 'timmy', 'Old boy', 1, '15px'),
(7, 'mimmi', 'mimmi@go', 'gogo', 'gogo', 1, '15px'),
(8, 'Kajsa', 'k@yes.com', 'test', 'Stadsminister', 1, '15px'),
(9, 'Elon', 'elon.musk@gmail.com', 'test', 'Everything', 1, '15px'),
(10, 'Johanna', 'Johanna@Atte.com', 'sigel', 'Gekko', 1, '15px'),
(11, 'hiedi', 'hi@ho.se', 'test3', 'as', 1, '15px');

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
  MODIFY `labelId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Subtasks`
--
ALTER TABLE `Subtasks`
  MODIFY `subId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `Tasks`
--
ALTER TABLE `Tasks`
  MODIFY `taskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Theme`
--
ALTER TABLE `Theme`
  MODIFY `themeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
