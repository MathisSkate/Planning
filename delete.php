<?php
require('Bdd.php');
$type = $_GET["type"];
$id = $_GET["id"];
if($type === "prof")
	$req = "DELETE FROM Profs WHERE prof_id = :id";
else
	$req = "DELETE FROM Matieres WHERE matiere_id = :id";

$stmt = $bdd->prepare($req);
$stmt->bindParam(":id", $id);
$stmt->execute();
echo json_encode("");
?>
