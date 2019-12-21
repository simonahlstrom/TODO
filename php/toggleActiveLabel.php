<?php
include('connectToDB.php');

// Uploads new user to DB
$pdo = connectDB();
switch ($_GET['activated']) {
  case 1: 
    $query = "UPDATE Labels SET activated = 0 WHERE labelId = ?";
    break;
  case 0:
    $query = "UPDATE Labels SET activated = 1 WHERE labelId = ?";
    break;
}
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['id']);
$sql->execute();

$pdo = connectDB();
$query = "SELECT * FROM Labels WHERE labelId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['id']);
$sql->execute();

$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);
$answer = json_encode($answer);
echo $answer;
?>