<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "INSERT INTO Labels (userId, labelName, color, icon) VALUES (?, ?, ?, ?)";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->bindParam(2, $_GET['labelName']);
$sql->bindParam(3, $_GET['color']);
$sql->bindParam(4, $_GET['icon']);
$sql->execute();

$pdo = connectDB();
$query = "SELECT * FROM Labels WHERE labelId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['labelId']);
$sql->execute();

$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);
$answer = json_encode($answer);
echo $answer;

?>