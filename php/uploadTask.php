<?php
include('connectToDB.php');
$action = $_GET['action'];
$pdo = connectDB();

switch ($action) {
    case "new": 
        $query = "INSERT INTO Tasks (taskName, code) 
        VALUES (?, ?)";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['taskName']);
        $sql->bindParam(2, $_GET['code']);
        
        $sql->execute();
        
        $query = "INSERT INTO TasksInLabelRel (taskId, labelId) 
        VALUES ((SELECT taskId FROM Tasks WHERE taskName = ? AND code = ?), ?)";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['taskName']);
        $sql->bindParam(2, $_GET['code']);
        $sql->bindParam(3, $_GET['labelId']);
        $sql->execute();
        
        $query = "INSERT INTO TaskMembers (taskId, userId, creator) 
        VALUES ((SELECT taskId FROM Tasks WHERE taskName = ? AND code = ?), ?, ?)";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['taskName']);
        $sql->bindParam(2, $_GET['code']);
        $sql->bindParam(3, $_GET['userId']);
        $sql->bindParam(4, $_GET['shared']);
        $sql->execute();
        
        
        echo 'Task created';
        break;
    case "alter":
        // shared is the old label ID of the task
        $query = "UPDATE Tasks
        SET taskName = ? WHERE code = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['taskName']);
        $sql->bindParam(2, $_GET['code']);
        $sql->execute();

        $query = "UPDATE TasksinLabelRel
        SET labelId = ? WHERE taskId = (SELECT taskId FROM tasks WHERE code = ?) AND labelId = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['labelId']);
        $sql->bindParam(2, $_GET['code']);
        $sql->bindParam(3, $_GET['shared']);
        $sql->execute();

        echo 'Task updated';
}
?>