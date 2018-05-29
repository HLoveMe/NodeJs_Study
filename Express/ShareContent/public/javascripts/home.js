window.onload = function() {
    //可以上传
    $("#keyUp").click(function() {
        var keyword = $("#keyword").val();
        $.post("/keyshare", { data: keyword }, function(result) {
            $("#keyword").val("");
            $("#currentkey").val(result.keyword);
        })
    })
}