<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "UPDATE `Labels` SET `color` = ?,`icon` = ? WHERE labelId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['color']);
$sql->bindParam(2, $_GET['icon']);
$sql->bindParam(3, $_GET['labelId']);
$sql->execute();

?>