<?php
    $lo = isset($_GET['h']) ? $_GET['h'] : '0';
    $l  = isset($_GET['l']) ? $_GET['l'] : '0';
    $ty = isset($_GET['t']) ? $_GET['t'] : '';

    $servername = "mysql.hostinger.com.ar";
    $username = "u994114733_dlg";
    $password = "passwd";
    $dbname = "u994114733_capit";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("-1");
    } 

    $sql = "INSERT INTO marcas (id, legajo, fecha, tipo, ubicacion)
    VALUES (null, $l, now() - INTERVAL 3 HOUR, '$ty', $lo)";

    if ($conn->query($sql) === TRUE) {
        echo "1";
    } else {
        echo "0";
    }

    $conn->close();
?>