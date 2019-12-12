<?php
include('connectToDB.php');

// Fetches taskusers 
$pdo = connectDB();
$query = "SELECT username, User.userId, TaskMembers.creator FROM User 
JOIN TaskMembers ON User.userId=TaskMembers.userId
WHERE taskId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['taskId']);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>