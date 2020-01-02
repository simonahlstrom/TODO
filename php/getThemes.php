<?php
include('connectToDB.php');

sleep(2);

// Fetches all themes
$pdo = connectDB();
$query = "SELECT * FROM Theme";
$sql = $pdo->prepare($query);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>




