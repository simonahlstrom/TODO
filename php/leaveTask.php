<?php
include('connectToDB.php');


$pdo = connectDB();

$query = "DELETE FROM taskMembers WHERE taskId = ? AND userId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->bindParam(2, $_GET['userId']);
$sql->execute();

$query = "DELETE FROM tasksInLabelRel WHERE taskId = ? AND labelId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->bindParam(1, $_GET['labelId']);
$sql->execute();

echo "User left task";
?>