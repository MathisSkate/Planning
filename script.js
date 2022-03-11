var trashCan = $('<svg class="trashCan" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"/></svg>');
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
				const heureDebut = Math.round(parseInt(originText[0]) + ((ui.position.top - ui.originalPosition.top) / (heureHeight + 2.5)));
				const heureFin = Math.round(heureDebut + ((ui.helper[0].scrollHeight) / (heureHeight)));
				spanHeure.innerText = heureDebut + " " + originText[1] + " " + heureFin;

				addResizable(coursCourant, ui.helper[0].offsetTop);

				if($(this).find(".profName").length === 1 && $(this).find(".matiereName").length === 1){
					$.ajax({
						url: "ucours.php?cours=" + $(this).find(".idCours")[0].innerText + "&debut=" + heureDebut + "&fin=" + heureFin + "",
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
				var p = "";
				if(ui.draggable.find(".profName").length !== 0 && $(this).find(".profName").length === 0){
					p = $('<br/><p class="idProf" hidden>' + ui.draggable.find("p")[0].innerText + '</p><span class="profName">' + ui.draggable.find("span")[0].innerText + '</span>');
					$(this).append(p);
				}
				if(ui.draggable.find(".matiereName").length !== 0 && $(this).find(".matiereName").length === 0){
					p = $('<br/><p class="idMatiere" hidden>' + ui.draggable.find("p")[0].innerText + '</p><span class="matiereName">' + ui.draggable.find("span")[0].innerText + '</span>');
					$(this).append(p);
				}
				if($(this).find(".profName").length === 1 && $(this).find(".matiereName").length === 1){
					const debut = $(this).find("span.spanHeure")[0].innerText.split(" ")[0];
					const fin = $(this).find("span.spanHeure")[0].innerText.split(" ")[2];
					$.ajax({
						url: "cours.php?prof=" + $(this).find(".idMatiere")[0].innerText + "&matiere=" + $(this).find(".idMatiere")[0].innerText + "&debut=" + debut + "&fin=" + fin + "",
						method: "GET",
						dataType : "json",
						success: function (data) {
							var spanIdCours = $('<span hidden class="idCours">' + data + '</span>');
							$(".cours").prepend(spanIdCours);
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
	$('#profs .list').empty();
	return $.ajax({
		url: "profs.php",
		method: "GET",
		dataType : "json",
		success: function (data) {
			data.forEach(prof => {
				const divProf = $('<div class="prof"><p hidden>' + prof.prof_id + '</p><span class="profName">' + prof.prof_libelle + '</span>' + trashCan[0].outerHTML + '</div>');
				$('#profs .list').append(divProf);
				divProf.find(".trashCan").click(() => {
					console.log("test");
					$.ajax({
						url: "delete.php?type=prof&id=" + prof.prof_id + "",
						method: "GET",
						dataType : "json",
						success: function (data) {
							console.log("test");
							initProf();
						},
					});
				});
			});
		},
	});
}

function initMatiere() {
	$('#matieres .list').empty();
	return $.ajax({
		url: "matieres.php",
		method: "GET",
		dataType : "json",
		success: function (data) {
			data.forEach(matiere => {
				const divMatiere = $('<div class="matiere"><p hidden>' + matiere.matiere_id + '</p><span class="matiereName">' + matiere.matiere_libelle + '</span>' + trashCan[0].outerHTML + '</div>');
				$('#matieres .list').append(divMatiere);
				divMatiere.find(".trashCan").click(() => {
					console.log("test");
					$.ajax({
						url: "delete.php?type=matiere&id=" + matiere.matiere_id + "",
						method: "GET",
						dataType : "json",
						success: function (data) {
							console.log("test");
							initMatiere();
						},
					});
				});
			});
		},
	});
}

$("#buttonProf").click(() => {
	$.ajax({
		url: "item.php?type=prof&libelle=" + $("#inputProf")[0].value + "",
		method: "GET",
		dataType : "json",
		success: function (data) {
			$("#inputProf")[0].value = "";
			initProf();
		},
	});
});

$("#buttonMatiere").click(() => {
	$.ajax({
		url: "item.php?type=matiere&libelle=" + $("#inputMatiere")[0].value + "",
		method: "GET",
		dataType : "json",
		success: function (data) {
			$("#inputMatiere")[0].value = "";
			initMatiere();
		},
	});
});