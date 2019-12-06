<?php

function connectDB() {
  // return new PDO('mysql:host=10.209.2.72;dbname=244622-TODO','?','?');
  return new PDO('mysql:host=localhost;dbname=TODO','root','root');

}
?>
