<?php
include('connectToDB.php');

// Uploads new user to DB
$pdo = connectDB();
$query = "INSERT INTO User (username, email, password, occupation, themeId) VALUES (?, ?, ?, ?, (SELECT themeId FROM Theme LIMIT 1))";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['username']);
$sql->bindParam(2, $_GET['email']);
$sql->bindParam(3, $_GET['password']);
$sql->bindParam(4, $_GET['occupation']);
$sql->execute();

$pdo = connectDB();
$query = "SELECT userId, username FROM User WHERE email = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['email']);
$sql->execute();

$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>