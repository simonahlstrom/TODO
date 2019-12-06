<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "SELECT * FROM `Cities` WHERE `countryName` = ?";

$sql = $pdo->prepare($query);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>