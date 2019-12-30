<?php
include('connectToDB.php');

$pdo = connectDB();
$query = "SELECT * FROM Color";

$sql = $pdo->prepare($query);
$sql->execute();
$answer1 = $sql->fetchAll(\PDO::FETCH_ASSOC);

$pdo = connectDB();
$query = "SELECT * FROM Icon WHERE type = 'label'";

$sql = $pdo->prepare($query);
$sql->execute();
$answer2 = $sql->fetchAll(\PDO::FETCH_ASSOC);


$arr = array();
$arr[] = $answer1;
$arr[] = $answer2;


$arr = json_encode($arr);
echo $arr;
?>