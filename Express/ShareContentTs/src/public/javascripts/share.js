
document.ready  = function () {
    $("#keyUp").click(function () {
        var keyword = $("#keyword").val();
        $.post("/keyshare", { data: keyword }, function (result) {
            $("#keyword").val("");
            $("#currentkey").val(result.keyword);
        })
    })
}