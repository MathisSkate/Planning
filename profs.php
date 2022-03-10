<?php
require('Bdd.php');
$query = $bdd->query("SELECT * FROM Profs");
$result = $query->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo json_encode($result);
?>
