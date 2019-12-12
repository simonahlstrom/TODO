<?php
include('connectToDB.php');

// Fetches all tasks and subtasks
$pdo = connectDB();
$query = "SELECT Subtasks.* FROM User 
JOIN TaskMembers ON User.userId=TaskMembers.userId
JOIN Tasks ON TaskMembers.taskId=Tasks.taskId
JOIN Subtasks ON Tasks.taskId=Subtasks.taskId
WHERE User.userId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();
$answer1 = $sql->fetchAll(\PDO::FETCH_ASSOC);

//get tasks
$query = "SELECT Tasks.*, taskMembers.creator FROM User 
JOIN TaskMembers ON User.userId=TaskMembers.userId
JOIN Tasks ON TaskMembers.taskId=Tasks.taskId
WHERE TaskMembers.userId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();
$answer2 = $sql->fetchAll(\PDO::FETCH_ASSOC);


$arr = array();
$arr[] = $answer1;
$arr[] = $answer2;


$arr = json_encode($arr);
echo $arr;
?>




