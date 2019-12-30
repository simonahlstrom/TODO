<?php
    echo "ok PHP";

    nclude('connectToDB.php');

    $pdo = connectDB();
    $query = "SELECT * FROM Icons";
    $sql = $pdo->prepare($query);
    $sql->execute();
    $status = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $status = json_encode($status);
    echo $status;
?>