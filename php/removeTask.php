<?php
include('connectToDB.php');
$pdo = connectDB();

$query = "DELETE FROM taskMembers WHERE taskId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->execute();

$query = "DELETE FROM tasksinlabelrel WHERE taskId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->execute();

$query = "DELETE FROM subtasks WHERE taskId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->execute();

$query = "DELETE FROM tasks WHERE taskId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->execute();

echo 'Task removed';


?>