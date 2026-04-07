const API_URL = "https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary";
const API_KEY = "d92dedbe14mshf59b80dff3717bdp1cfa26jsn3b0fcc6470e7";

function fetchWord(word) {
    $.ajax({
        url: API_URL,
        method: "GET",
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "dictionary-by-api-ninjas.p.rapidapi.com"
        },
        data: { word: word },
        success: function (data) {
            if (!data.definition) {
                $("#errorMsg").text("Word not found. Try another!").removeClass("d-none");
                $("#wordCard").addClass("d-none");
                return;
            }

            $("#wordTitle").text(data.word);
            $("#wordPhonetic").text("");
            $("#partOfSpeech").text("");
            $("#definition").text(data.definition);
            $("#example").text("");
            $("#wordCard").removeClass("d-none");
            $("#errorMsg").addClass("d-none");
        },
        error: function () {
            $("#errorMsg").text("Word not found. Try another!").removeClass("d-none");
            $("#wordCard").addClass("d-none");
        }
    });
}

$(document).ready(function () {
    $("#searchBtn").on("click", function () {
        fetchWord($("#wordInput").val().trim().toLowerCase());
    });

    $("#wordInput").on("keypress", function (e) {
        if (e.key === "Enter") fetchWord($(this).val().trim().toLowerCase());
    });
});
