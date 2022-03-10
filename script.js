var planning = $("#planning");
//var cours = $("<textarea class='cours'></textarea>");
var heures = $(".heure");
console.log(heures);
heures.each(function() {
    var heure = $(this);
    heure.click(function() {
		console.log(heure);
        planning.append($("<div class='cours'></div>"));
		var coursCourant = $(".cours").last();
		coursCourant.css("left", heure[0].offsetLeft);
		coursCourant.css("top", heure[0].offsetTop);
		coursCourant.css("height", (heure[0].scrollHeight + 5));
		coursCourant.css("width", (heure[0].scrollWidth + 5));
		console.log(((heure[0].scrollHeight + 5) * 10));
		coursCourant.resizable({
			grid: (heure[0].scrollHeight + 5),
			maxWidth: (heure[0].scrollWidth + 5),
			minWidth: (heure[0].scrollWidth + 5),
			maxHeight: ((heure[0].scrollHeight + 5) * 10),
			animate: true
		});
    })
});