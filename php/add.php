<?php
include('connectToDB.php');

// Uploads new user to DB
$pdo = connectDB();
$query = "INSERT INTO Labels (userId, labelName, color, icon) VALUES (?, ?, 'rgba(40, 40, 40, 1)', 'default.png')";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['userId']);
$sql->bindParam(2, $_GET['username']);
$sql->execute();

echo $_GET['userId'];
?>