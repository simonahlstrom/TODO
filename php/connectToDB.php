<?php

function connectDB() {
  // return new PDO('mysql:host=10.209.2.72;dbname=244622-todo','244622_et49673','To2020Do');
  return new PDO('mysql:host=localhost;dbname=TODO','root','root');

}
?>
