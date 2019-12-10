<?php
include('connectToDB.php');

// Fetches all tasks and subtasks
$pdo = connectDB();
$query = "SELECT Labels.*, TasksInLabelRel.taskId  FROM User 
JOIN Labels ON User.userId = labels.userId
LEFT JOIN TasksInLabelRel ON Labels.labelId=TasksInLabelRel.labelId
WHERE User.userId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>




