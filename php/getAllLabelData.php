<?php
include('connectToDB.php');

// Fetches all tasks and subtasks
$pdo = connectDB();
$query = "SELECT Labels.* FROM User 
JOIN Labels ON User.userId = labels.userId
WHERE User.userId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->execute();
$answer1 = $sql->fetchAll(\PDO::FETCH_ASSOC);


$query = "SELECT TasksInLabelRel.* FROM User 
JOIN Labels ON User.userId = labels.userId 
LEFT JOIN TasksInLabelRel ON Labels.labelId=TasksInLabelRel.labelId 
WHERE User.userId = ?";

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




