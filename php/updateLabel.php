<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "UPDATE `Labels` SET `color` = ?,`icon` = ?, `labelName` = ? WHERE labelId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['color']);
$sql->bindParam(2, $_GET['icon']);
$sql->bindParam(3, $_GET['name']);
$sql->bindParam(4, $_GET['labelId']);
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