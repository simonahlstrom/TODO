<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "INSERT INTO Subtasks (subName, deadline, userId, taskId) 
VALUES (?, ?, ?, ?)";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['subName']);
// fix deadline default value
$sql->bindParam(2, $_GET['deadline']);
$sql->bindParam(3, $_GET['userId']);
$sql->bindParam(4, $_GET['taskId']);

$sql->execute();

$query = "INSERT INTO TaskMembers (taskId, userId, creator) 
VALUES (?, ?, ?)";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->bindParam(2, $_GET['userId']);
$sql->bindParam(3, 1);

$sql->execute();

$query = "INSERT INTO TasksInLabelRel (taskId, labelId) 
VALUES (?, ?)";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->bindParam(2, $_GET['labelId']);

$sql->execute();

echo 'Subtask created';
?>