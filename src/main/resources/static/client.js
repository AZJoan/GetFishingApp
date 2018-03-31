var sFish = "";
var sSeason = "";
var sTemp = "";
var sClarity = "";
var sLureList = "";
var sSelectTag = "";
var fndFish = false;
var fndSeason = false;
var fndTemp = false;
var foundrecs = false;
var picid = "defaultlure";

$(document).ready(function(){
    console.log("doc ready");
    init();
});

function init(){
    enable();
    getLures();
}

function enable(){
    $("#getListBtn").on("click", getLures);
    $("#container").on("click", ".showBtn", getLuresById);

    // Admin use only - used to load database
    $("#container").on("click", ".deleteBtn", deleteLure);
    $("#addBtn").on("click", postSelections);

}
function getLures(event) {
    event.preventDefault();

    setSelectFields();

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/lures",
        success: function (resp) {
            console.log("in GET resp=", resp);
            var rlures = resp._embedded.lures;
            appendLures(rlures);
        }
    });
}
function getLuresById() {

    showid = $(this).data("showid");
    console.log("getLuresById showid=", showid);

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/lures/" + showid,
        success: function (resp) {
            console.log("in GET ByID resp=", resp);
           // var rlures = resp._embedded.lures;
            showLures(resp);
        }
    });
}
function setSelectFields(){

    sFish = $("#txtFish :selected").val();
    sSeason = $("#txtSeason :selected").val();
    sTemp = $("#txtTemp :selected").val();
    sClarity = $("#txtClarity :selected").val();
    sLureList = $("#txtLureList").val();
    sSelectTag = (sFish + sSeason + sTemp + sClarity);

    // set screen fields to selected values
    $("#selFish").text(sFish);
    $("#selSeason").text(sSeason);
    $("#selTemp").text(sTemp);

    // $("#LurePic").removeClass(picid);
    // $("#LurePic").addClass("defaultlure");
}

function postSelections() {

    console.log("top of postSelections");

    setSelectFields();

    var newLure = {
        fish: sFish,
        season: sSeason,
        temp: sTemp,
        clarity: sClarity,
        lurelist: sLureList,
        selecttag: sSelectTag
    };
    console.log("newLureRec=", newLure);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/lures",
        data: JSON.stringify(newLure),
        success: function (resp) {
            console.log("in POST resp=", resp);
            getLures();
        }
    });
}

function deleteLure(){

    var lureId = $(this).data("delid");
    console.log("deleteLure delid=", lureId);

    $.ajax({
        type: "DELETE",
        url: "/lures/" + $(this).data("delid"),
        success: function(delresp){
            console.log(delresp);
            getLures();
        }
    });
}

function appendLures(rlures) {
    $("#container").empty();

    foundrecs = false;

    // set found flag if nothing in array
    if (rlures.length == 0) {foundrecs = false}

    for (var j = 0; j < rlures.length; j++) {
        rl = rlures[j];
        fndFish = false;
        fndSeason = false;
        fndTemp = false;

        // set found flags-display what matches selection fields
        if ((sFish == "Trout") || (sFish == "Bluegill")) {
            sSeason = "All";
            sTemp = "All";
        }
        if ((sFish == rl.fish) || (sFish == "All")) {
            fndFish = true;
        }
        if ((sSeason == rl.season) || (sSeason == "All")) {
            fndSeason = true;
        }
        if ((sTemp == rl.temp) || (sTemp == "All")) {
            fndTemp = true;
        }

        if (fndFish == true && fndSeason == true
            && fndTemp == true) {
            foundrecs = true;

            $("#container").append("<div class='row'></div>");
            var el = $("#container").children().last();

            el.append("<div class='col-md-2'></div>");
            el.append("<div class='col-md-1 card box'><p>" + rl.fish + "</p></div>");
            el.append("<div class='col-md-1 card box'><p>" + rl.season + "</p></div>");
            el.append("<div class='col-md-1 card box'><p>" + rl.temp + "</p></div>");
            el.append("<div class='col-md-1 card box'><p>" + rl.clarity + "</p></div>");
            el.append("<div class='col-md-4 card box'><p>" + rl.lurelist + "</p></div>");
            //el.append("<div class='col-md-1'></div>");

            el = el.children().last();
            el.append("<button class='btn btn-success showBtn'>Show Lures</button>");
            el.children().last().data("showid", rl.id);

            // Admin Only-delete button used to maintain database
            // el.append("<button class='admin btn btn-danger deleteBtn'>Del</button>");
            // el.children().last().data("delid", rl.id);

            $("#container").append("<div class='row'><p></p><p></p></div>");

        } // end if matches found
    }  // end of for loop

    // nothing found
    if (foundrecs == false) {

        $("#container").append("<div class='row'></div>");
        var el = $("#container").children().last();

        el.append("<div class='col-md-2'></div>");
        el.append("<div class='col-md-1 card box'><p>" + sFish + "</p></div>");
        el.append("<div class='col-md-1 card box'><p>" + sSeason + "</p></div>");
        el.append("<div class='col-md-1 card box'><p>" + sTemp + "</p></div>");
        el.append("<div class='col-md-1 card box'><p>" + sClarity + "</p></div>");
        el.append("<div class='col-md-4 card box'><p>" + "Nothing Found-Try Again-Go Fish!" + "</p></div>");

    } // end nothing to display
}  // end of function appendLures

function showLures(sl) {

    // $("#LurePic").removeClass("defaultlure");
    // $("#LurePic").addClass(picid);

    // don't rebuild page if nothing returned
    if (sl != null) {

        //put selected row and pictures of lures on page
        $("#container").empty();

        $("#container").append("<div class='row'></div>");
        var el = $("#container").children().last();

        el.append("<div class='col-md-2'></div>");
        el.append("<div class='col-md-1 card box'><p>" + sl.fish + "</p></div>");
        el.append("<div class='col-md-1 card box'><p>" + sl.season + "</p></div>");
        el.append("<div class='col-md-1 card box'><p>" + sl.temp + "</p></div>");
        el.append("<div class='col-md-1 card box'><p>" + sl.clarity + "</p></div>");
        el.append("<div class='col-md-4 card box'><p>" + sl.lurelist + "</p></div>");
        el.append("<div class='col-md-2'></div>");

        // picid = sl.fish;
        // if (sl.fish == "Bass") {
            picid = sl.selecttag;
        // }
        console.log("picid: " + picid);

        // show lure pictures
        $("#container").append("<div class='row'></div>");
        el = $("#container").children().last();
        el.append("<div class='col-md-2'></div>");
        el.append("<div id='LurePic' class='col-md-8 card box " + picid + "'></div>");
        el.append("<div class='col-md-2'></div>");

        $("#container").append("<div class='row'><p></p><p></p></div>");


    } // end if nothing returned
}
