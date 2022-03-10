var planning = $("#planning");
var heures = $(".heure");
heures.each(function() {
    var heure = $(this);
    heure.click(function() {
        planning.append($("<div class='cours'><span class='spanHeure'></span></div>"));

		const coursCourant = $(".cours").last();
		const spanHeure = $('.spanHeure').last()[0];
		const heureCourante = (heure[0].innerText.replace(" H", ""));
		const heureHeight = (heure[0].scrollHeight + 5);
		const heureWidth = (heure[0].scrollWidth + 5);
		const heureTop = heure[0].offsetTop - 2.5;
		const heureLeft = heure[0].offsetLeft - 2.5;

		coursCourant.css("left", heureLeft);
		coursCourant.css("top", heureTop);
		coursCourant.css("height", heureHeight);
		coursCourant.css("width", heureWidth);
		spanHeure.innerText = heureCourante + " - " + (parseInt(heureCourante) + 1);

		coursCourant.resizable({
			grid: heureHeight,
			maxWidth: heureWidth,
			minWidth: heureWidth,
			maxHeight: ((heureHeight * 10) - (heureTop - 31)),
			animate: true,
			resize : function (e, ui){
				const originText = ui.originalElement[0].innerText.split(" ");
				spanHeure.innerText = originText[0] + " " + originText[1] + " " + Math.round(parseInt(originText[0]) + (ui.size.height / heureHeight));
			}
		});
		coursCourant.draggable({
			axis: "y",
			scroll: true,
			grid: [ 0, (heureHeight) ],
			stop: function (e, ui){
				const originText = ui.helper[0].innerText.split(" ");
				const heureDepart = Math.round(parseInt(originText[0]) + ((ui.position.top - ui.originalPosition.top) / (heureHeight + 2.5)));
				const heureFin = Math.round(heureDepart + ((ui.helper[0].scrollHeight) / (heureHeight)));
				spanHeure.innerText = heureDepart + " " + originText[1] + " " + heureFin;
			}

		});

    })
});