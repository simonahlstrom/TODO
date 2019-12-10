<?php
include('connectToDB.php');

// Fetches all tasks and subtasks
$pdo = connectDB();
$query = "SELECT Tasks.*, Subtasks.*  FROM User 
JOIN TaskMembers ON User.userId=TaskMembers.userId
JOIN Tasks ON TaskMembers.taskId=Tasks.taskId
LEFT JOIN Subtasks ON Tasks.taskId=Subtasks.taskId
WHERE User.userId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>




