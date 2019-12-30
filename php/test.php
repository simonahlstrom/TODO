<?php
    echo "ok PHP";

    include('connectToDB.php');

    $pdo = connectDB();
    $query = "SELECT * FROM Icon";
    $sql = $pdo->prepare($query);
    $sql->execute();
    $status = $sql->fetchAll(\PDO::FETCH_ASSOC);

    $status = json_encode($status);
    echo $status;
?>