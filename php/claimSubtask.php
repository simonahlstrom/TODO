<?php
include('connectToDB.php');

$name = $_GET['name'];


$pdo = connectDB();


$query = "UPDATE `Subtasks` SET `claimedName`= ? WHERE subId = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $name);
$sql->bindParam(2, $_GET['subId']);
$sql->execute();

echo $name
?>