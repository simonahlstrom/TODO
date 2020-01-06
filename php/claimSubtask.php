<?php
include('connectToDB.php');

$name = $_GET['name'];
$user = $_GET['userName'];

$pdo = connectDB();

$query = "SELECT `claimedName` FROM Subtasks WHERE subId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['subId']);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = $answer[0]['claimedName'];

switch ($answer) {
    case '0':
        $query = "UPDATE `Subtasks` SET `claimedName`= ? WHERE subId = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $name);
        $sql->bindParam(2, $_GET['subId']);
        $sql->execute();
        
        echo $name;
        break;
    
    case $user:
        $query = "UPDATE `Subtasks` SET `claimedName`= ? WHERE subId = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $name);
        $sql->bindParam(2, $_GET['subId']);
        $sql->execute();
        
        echo $name;
        break;
    default: 
        echo $answer;
}

?>