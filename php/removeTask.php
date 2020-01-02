<?php
include('connectToDB.php');
$pdo = connectDB();

$query = "DELETE FROM TaskMembers WHERE taskId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->execute();

$query = "DELETE FROM Tasksinlabelrel WHERE taskId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->execute();

$query = "DELETE FROM Subtasks WHERE taskId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->execute();

$query = "DELETE FROM Tasks WHERE taskId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->execute();

echo 'Task removed';


?>