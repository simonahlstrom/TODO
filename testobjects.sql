
INSERT INTO `Tasks` (`taskName`, `code`) VALUES
('Task3', 'uxs6'),
('Task4', 'as9s');



INSERT INTO `Subtasks` (`subName`, `deadline`, `completed`, `claimedName`, `userId`, `taskId`) VALUES
('subtest2', NULL, 0, '0', 2, 1),
('subtest3', "2019-12-23", 0, '0', 2, 3),
('subtest4', NULL, 0, '0', 2, 1),
('subtest5', "2020-01-21", 0, '0', 2, 4),
('subtest6', "2019-12-20", 0, '0', 2, 4),
('subtest7', "2020-01-12", 0, '0', 2, 4),
('subtest8', NULL, 0, '0', 2, 4);


INSERT INTO `Labels` (`userId`, `labelName`, `color`, `icon`) VALUES
(2, 'label_2', 'rgba(100, 251, 230, .8)', 'url2.png'),
(2, 'label_3', 'rgba(100, 0, 230, .6)', 'url3.png');


INSERT INTO `TasksInLabelRel` (`taskId`, `labelId`) VALUES
(2, 2),
(3, 3),
(4, 3);





