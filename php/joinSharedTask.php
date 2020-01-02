<?php
include('connectToDB.php');

$pdo = connectDB();

$query = "SELECT taskId FROM Tasks WHERE code = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['code']);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

if ($answer) {
    $query = "INSERT INTO TaskMembers (taskId, userId, creator) 
    VALUES ((SELECT taskId FROM Tasks WHERE code = ?), ?, 0)";

    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['code']);
    $sql->bindParam(2, $_GET['userId']);
    $sql->execute();

    $query = "INSERT INTO TasksInLabelRel (taskId, labelId) 
    VALUES ((SELECT taskId FROM Tasks WHERE code = ?), ?)";

    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['code']);
    $sql->bindParam(2, $_GET['labelId']);
    $sql->execute();

    echo "Joined shared task";
} else {
    echo "Task doesnt exist";
}




?>