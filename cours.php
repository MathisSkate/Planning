<?php
require("Bdd.php");
$matiere = $_GET["matiere"];
$prof = $_GET["prof"];
$debut = $_GET["debut"];
$fin = $_GET["fin"];
$req = "INSERT INTO Cours(matiere_id, prof_id, debut, fin) VALUES (:matiere, :prof, :debut, :fin)";
$stmt = $bdd->prepare($req);
$stmt->bindParam(":matiere", $matiere);
$stmt->bindParam(":prof", $prof);
$stmt->bindParam(":debut", $debut);
$stmt->bindParam(":fin", $fin);
$stmt->execute();
echo $bdd->lastInsertId();
?>
