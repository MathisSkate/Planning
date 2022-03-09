<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
	<link rel="stylesheet" href="style.css" />
    <title>Planning</title>
</head>
<body>
<div id="planning">
    <?php
    $jours = array('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche');
    foreach ($jours as $jour) { ?>
        <div class="jour"><?= $jour ?><?php
            for ($heure = 8; $heure <= 17; $heure++) { ?>
                <div class="heure"><?= $heure  . " H" ?></div><?php
            } ?>
        </div>
        <?php
    } ?>
</div>
<div id="action"></div>
</body>
</html>