<?php
include('connectToDB.php');

$action = $_GET['action'];
$pdo = connectDB();

switch ($action) {
    case "enable":
        $query = "UPDATE taskMembers
        SET creator = 2 WHERE taskId = ? AND userId = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['taskId']);
        $sql->bindParam(2, $_GET['userId']);

        $sql->execute();

        echo 'Sharing enabled.';
        break;
    case "disable":
        $query = "DELETE FROM `TaskMembers` WHERE taskId = ? AND userId != ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['taskId']);
        $sql->bindParam(2, $_GET['userId']);

        $sql->execute();
        

        $query = "UPDATE taskMembers
        SET creator = 1 WHERE taskId = ? AND userId = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['taskId']);
        $sql->bindParam(2, $_GET['userId']);

        $sql->execute();

        echo 'Sharing disabled.';
}
?>