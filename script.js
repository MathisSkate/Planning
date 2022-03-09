var planning = $("#planning");
//var cours = $("<textarea class='cours'></textarea>");
var heures = $(".heure");
console.log(heures);
heures.each(function() {
    var heure = $(this);
    heure.click(function() {
        planning.append($("<textarea class='cours' style='left: " + heure[0].offsetLeft + "; top: " + heure[0].offsetTop + ";'></textarea>"));
    })
});