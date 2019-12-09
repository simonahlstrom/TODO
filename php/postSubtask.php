<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "INSERT INTO Subtasks (subName, deadline, userId, taskId) 
VALUES (?, ?, ?, ?)";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['subtask->subName']);
// fix deadline default value
$sql->bindParam(2, $_GET['subtask->deadline']);
$sql->bindParam(3, $_GET['subtask->userId']);
$sql->bindParam(4, $_GET['subtask->taskId']);
$sql->execute();

$pdo = connectDB();
$query = "INSERT INTO TaskMembers (taskId, userId, creator) 
VALUES (?, ?, ?)";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['subtask->taskId']);
$sql->bindParam(2, $_GET['subtask->userId']);
$sql->bindParam(3, 1);
$sql->execute();

$pdo = connectDB();
$query = "INSERT INTO TasksInLabelRel (taskId, labelId) 
VALUES (?, ?)";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['subtask->taskId']);
$sql->bindParam(2, $_GET['subtask->labelId']);
$sql->execute();

echo 'Subtask created';
?>