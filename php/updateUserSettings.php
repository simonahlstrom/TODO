<?php

include('connectToDB.php');
$pdo = connectDB();

//changes theme action
if($_GET['action'] == "changeTheme") {
    $query = "UPDATE `User` SET `themeId`=? WHERE userId=?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['themeId']);
    $sql->bindParam(2, $_GET['userId']);
    $sql->execute();
    echo "Your Theme has been updated.";
    return;
}

//change userInfo or password

//changes if name or/and email exist in db
if($_GET['currentUsername'] != $_GET['username']) {
    $query = "SELECT * FROM User WHERE username = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['username']);
    $sql->execute();
    $answer = $sql->fetchAll(\PDO::FETCH_ASSOC);
    if($answer[0]) {
        echo "nameExist";
        return;
    } 
} 


if ($_GET['currentEmail'] != $_GET['email']) {
    $query = "SELECT * FROM User WHERE email = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['email']);
    $sql->execute();
    $answer = $sql->fetchAll(\PDO::FETCH_ASSOC);
    if($answer[0]) {
        echo "emailExist";
        return;
    } 
} 

switch ($_GET['action']) {
    case 'changeUserInfo':
        $query = "UPDATE `User` SET `username`=?,`email`=? WHERE userId=?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['username']);
        $sql->bindParam(2, $_GET['email']);
        $sql->bindParam(3, $_GET['userId']);
        $sql->execute();
        echo "User has been updated.";
        break;
    
    case 'changePassword':
        $query = "UPDATE `User` SET `username`=?,`email`=?,`password`=? WHERE userId=?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['username']);
        $sql->bindParam(2, $_GET['email']);
        $sql->bindParam(3, $_GET['newPassword']);
        $sql->bindParam(4, $_GET['userId']);
        $sql->execute();
        echo "password and user has been updated.";
        break;
}












?>