<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "DELETE FROM `Labels` WHERE labelId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['labelId']);
$sql->execute();

echo "label removed";
?>