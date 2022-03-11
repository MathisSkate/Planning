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

		function addResizable(cours, heureTop){
			cours.resizable({
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
		}

		addResizable(coursCourant, heureTop);

		coursCourant.draggable({
			axis: "y",
			scroll: true,
			grid: [ 0, (heureHeight) ],
			containment: "#planning",
			stop: function (e, ui){
				const originText = ui.helper[0].innerText.split(" ");
				const heureDepart = Math.round(parseInt(originText[0]) + ((ui.position.top - ui.originalPosition.top) / (heureHeight + 2.5)));
				const heureFin = Math.round(heureDepart + ((ui.helper[0].scrollHeight) / (heureHeight)));
				spanHeure.innerText = heureDepart + " " + originText[1] + " " + heureFin;

				addResizable(coursCourant, ui.helper[0].offsetTop);

				if($(this).find(".profName").length === 1 && $(this).find(".matiereName").length === 1){
					$.ajax({
						url: "ucours.php/?cours" + $(this).find(".idCours") + "&debut=" + debut + "&fin=" + fin + "",
						method: "GET",
						dataType : "json",
						success: function (data) {
						},
					});
				}
			}
		});

		coursCourant.droppable({
			drop: function(event, ui){
				if(ui.draggable.find(".profName").length !== 0 && $(this).find(".profName").length === 0){
					var p = $('<br/><p class="idProf" hidden>' + ui.draggable.find("p")[0].innerText + '</p><span class="profName">' + ui.draggable.find("span")[0].innerText + '</span>');
					$(this).append(p);
				}
				if(ui.draggable.find(".matiereName").length !== 0 && $(this).find(".matiereName").length === 0){
					var p = $('<br/><p class="idMatiere" hidden>' + ui.draggable.find("p")[0].innerText + '</p><span class="matiereName">' + ui.draggable.find("span")[0].innerText + '</span>');
					$(this).append(p);
				}
				if($(this).find(".profName").length === 1 && $(this).find(".matiereName").length === 1){
					console.log($(this).find("span.spanHeure"));
					const debut = $(this).find("span.spanHeure")[0].innerText.split(" ")[0];
					const fin = $(this).find("span.spanHeure")[0].innerText.split(" ")[2];
					$.ajax({
						url: "cours.php/?prof=" + $(this).find(".idMatiere")[0].innerText + "&matiere=" + $(this).find(".idMatiere")[0].innerText + "&debut=" + debut + "&fin=" + fin + "",
						method: "GET",
						dataType : "json",
						success: function (data) {
							var spanIdCours = $('<span class="idCours">' + data + '</span>')
						},
					});
				}
			}
		})
    })
});

$.when(initProf().done(), initMatiere().done()).then( () => {
	$(".prof").each(function() {
		var prof = $(this);
		prof.draggable({
			revert: "invalid",
			helper: "clone",
			cursor: "move"
		});
	});

	$(".matiere").each(function() {
		var matiere = $(this);
		matiere.draggable({
			revert: "invalid",
			helper: "clone",
			cursor: "move"
		});
	});
});

function initProf() {
	return $.ajax({
		url: "profs.php",
		method: "GET",
		dataType : "json",
		success: function (data) {
			data.forEach(prof => {
				const divProf = $('<div class="prof"><p hidden>' + prof.prof_id + '</p><span class="profName">' + prof.prof_libelle + '</span></div>');
				$('#profs').append(divProf);
			});
		},
	});
}

function initMatiere() {
	return $.ajax({
		url: "matieres.php",
		method: "GET",
		dataType : "json",
		success: function (data) {
			data.forEach(matiere => {
				const divMatiere = $('<div class="matiere"><p hidden>' + matiere.matiere_id + '</p><span class="matiereName">' + matiere.matiere_libelle + '</span></div>');
				$('#matieres').append(divMatiere);
			});
		},
	});
}

