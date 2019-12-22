<?php
include('connectToDB.php');

$action = $_GET['action'];
$value = $_GET['value'];
$id = $_GET['id'];


$pdo = connectDB();

switch ($action) {
    case 'subtask':
        $query = "UPDATE `Subtasks` SET `completed`=? WHERE subId = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $value);
        $sql->bindParam(2, $id);
        $sql->execute();
        echo "subtask done";
        break;
    
    case 'task':
        $query = "UPDATE `Tasks` SET `completedTask`= ? WHERE taskId = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $value);
        $sql->bindParam(2, $id);
        $sql->execute();

        $query = "UPDATE `Subtasks` SET `completed`=? WHERE taskId = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $value);
        $sql->bindParam(2, $id);
        $sql->execute();

        echo "task done";
        break;
}




?>