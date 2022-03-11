<?php
require('Bdd.php');
$type = $_GET["type"];
$libelle = $_GET["libelle"];
if($type === "prof")
	$req = "INSERT INTO Profs(prof_libelle) VALUES (:libelle)";
else
	$req = "INSERT INTO Matieres(matiere_libelle) VALUES (:libelle)";

$stmt = $bdd->prepare($req);
$stmt->bindParam(":libelle", $libelle);
$stmt->execute();
echo json_encode("");
?>
