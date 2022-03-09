var planning = $("#planning");
//var cours = $("<textarea class='cours'></textarea>");
var heures = $(".heure");
console.log(heures);
heures.each(function() {
    var heure = $(this);
    heure.click(function() {
		console.log(heure);
        planning.append($("<textarea class='cours' style='left: " + heure[0].offsetLeft + "px; top: " + heure[0].offsetTop + "px; height: " + heure[0].scrollHeight + "px; width: " + heure[0].scrollWidth + "px;'></textarea>"));
    })
});