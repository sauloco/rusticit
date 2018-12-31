<?php
$servername = "mysql.hostinger.com.ar";
$username = "u994114733_dlg";
$password = "passwd";
$dbname = "u994114733_capit";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("{\"error\": \"$conn->connect_error\"}");
} 

$sql = "SELECT * from marcas ";

if (isset($_GET['from'])){
    $from = $_GET['from'];
    $sql .= "WHERE id >  $from";
}

$result = $conn->query($sql);


$rows = array();
if ($result->num_rows > 0) {
    // output data of each row
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    
}
print json_encode($rows);
$conn->close();
?>