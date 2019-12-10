<?php
include('connectToDB.php');
echo "hi";

$pdo = connectDB();
$query = "SELECT * FROM User 
JOIN TaskMembers ON User.userId=TaskMembers.userId
JOIN Tasks ON TaskMembers.taskId=Tasks.taskId
JOIN Labels ON User.userId=Labels.userId
JOIN Subtasks ON Tasks.taskId=Subtasks.taskId
JOIN Theme ON User.themeId=Theme.themeId
WHERE User.userId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>




