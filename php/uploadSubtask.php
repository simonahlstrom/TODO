<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "INSERT INTO Subtasks (subName, deadline, userId, taskId) 
VALUES (?, ?, ?, (SELECT taskId FROM tasks WHERE taskName = ? AND code = ?))";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['subName']);
$sql->bindParam(2, $_GET['deadline']);
$sql->bindParam(3, $_GET['userId']);
$sql->bindParam(4, $_GET['taskName']);
$sql->bindParam(5, $_GET['code']);

$sql->execute();

echo 'Subtask created';
?>