<?php
include('connectToDB.php');

// Fetches all themes
$pdo = connectDB();
$query = "SELECT * FROM theme";
$sql = $pdo->prepare($query);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>



