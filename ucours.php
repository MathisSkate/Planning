<?php
require("Bdd.php");
$cours = $_GET["cours"];
$debut = $_GET["debut"];
$fin = $_GET["fin"];
$req = "UPDATE Cours SET debut = ".$debut.", fin = ".$fin." WHERE cours_id = ".$cours;
$stmt = $bdd->prepare($req);
$stmt->execute();
?>