-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 09, 2020 at 02:22 PM
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
('rgba(200, 51, 030, .8)'),
('rgba(43, 45, 66, 1)'),
('rgba(141, 153, 174, 1)'),
('rgba(237, 242, 244, 1)'),
('rgba(239, 35, 60, 1)'),
('rgba(231, 111, 81, 1)'),
('rgba(244, 162, 97, 1)'),
('rgba(233, 196, 106, 1)'),
('rgba(42, 157, 143, 1)'),
('rgba(38, 70, 83, 1)');

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
('agenda.png', 'label'),
('cleaning.png', 'label'),
('cooking.png', 'label'),
('laundry.png', 'label'),
('default.png', 'label'),
('study.png', 'label'),
('tags.png', 'label'),
('training.png', 'label'),
('wallet.png', 'label'),
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
(9, 8, 'Linus', 'rgba(200, 51, 30, 0.8)', 'cooking.png', 0),
(10, 9, 'Economi', 'rgb(233, 196, 106)', 'wallet.png', 1),
(14, 10, 'School', 'rgb(40, 40, 40)', 'default.png', 1),
(17, 8, 'Home', 'rgb(244, 162, 97)', 'cleaning.png', 1),
(20, 10, 'Home', 'rgb(237, 242, 244)', 'cleaning.png', 1),
(22, 9, 'To do at home', 'rgb(141, 153, 174)', 'laundry.png', 1);

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
(56, 'Subtask 1', NULL, 0, 'Linus', 10, 33),
(64, 'snow', NULL, 0, '0', 10, 36),
(65, 'Subtask 2', NULL, 0, 'Linus', 8, 33),
(66, 'Subtask 3', NULL, 0, 'Linus', 8, 33),
(71, 'groceries', NULL, 0, '0', 9, 39),
(72, 'Bills', '2020-01-29', 0, '0', 9, 39),
(73, 'Laundry', '2020-01-15', 0, '0', 9, 39);

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
(30, 8, 1),
(31, 8, 1),
(33, 10, 2),
(33, 8, 0),
(36, 10, 1),
(38, 9, 1),
(39, 9, 1);

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
(30, 'Task done', 'UQ0q', 1, '2020-01-09 13:42:32'),
(31, 'Active tasks', 'nE7o', 1, '2020-01-09 13:42:45'),
(33, 'new task', '5h70', 0, '2020-01-06 13:19:52'),
(36, 'Shopping list', 'TgiU', 0, '2020-01-09 13:39:18'),
(38, 'Check stocks', 'BmY9', 0, '2020-01-09 14:19:02'),
(39, 'Home', '8odV', 0, '2020-01-09 14:20:29');

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
(31, 9),
(33, 14),
(36, 20),
(38, 10),
(39, 22);

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
(1, 'Dark', '#181a28', '#2c2a71', '#2c2a71', '#dfeee2', '#33334f', '#dfeee254', '#dfeee2'),
(2, 'MAU', 'whitesmoke', 'grey', '#e4022d', '#352a2a', '#ffffff', '#352a2a54', '#ffffff'),
(3, 'Dark 2', '#040303', '#3b1d39', '#401f3e', '#fbf5f3', '#5b575e', '#fbf5f354', '#fbf5f3'),
(4, 'Mint', 'whitesmoke', '#8cd7bf', '#8cd7bf', '#3a4340', '#b2edda', '#3a434054', '#3a4340'),
(7, 'Lime', '#fff', '#78e347', '#a7ff0b', '#4b792b', '#a2ff00', '#4b792b54', '#4b792b'),
(8, 'Tarzan', '#255e45', '#755642', '#b49736', '#dfeee2', '#b3942d50', '#dfeee294', '#255e45'),
(9, '70s curtains', '#f0b41e', '#794d15', '#c74d44', '#794d15', '#c74d4470', '#794d1554', '#dfeee2'),
(10, 'Miami', '#2effff', '#fe6dbc', '#fe6dbc', '#3e3402', '#e8da1138', '#079969', '#e8da11'),
(11, 'The Great Wave', '#f0e7cc', '#234166', '#457795', '#457795', '#cecaba', '#45779554', '#dae4ea'),
(12, 'Under the sea', '#030522', '#1fd7bd', '#1fd7bd', '#2f82db', '#11828257', '#2f82db50', '#2f82db');

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
(8, 'Linus', 'Linus@TODO.com', 'test', 'Student', 9, '12px'),
(9, 'Simon', 'Simon@TODO', 'test3', 'Student', 11, '15px'),
(10, 'Isak', 'isak@TODO.com', 'test2', 'Student', 7, '12px');

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
  MODIFY `labelId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `Subtasks`
--
ALTER TABLE `Subtasks`
  MODIFY `subId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `Tasks`
--
ALTER TABLE `Tasks`
  MODIFY `taskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `Theme`
--
ALTER TABLE `Theme`
  MODIFY `themeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
