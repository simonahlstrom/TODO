<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "INSERT INTO taskMembers (taskId, userId, creator) 
VALUES ((SELECT taskId FROM Tasks WHERE code = ?), ?, 0)";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['code']);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();

$query = "INSERT INTO tasksInLabelRel (taskId, labelId) 
VALUES ((SELECT taskId FROM Tasks WHERE code = ?), ?)";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['code']);
$sql->bindParam(1, $_GET['labelId']);
$sql->execute();

echo "Shared task joined";
?>