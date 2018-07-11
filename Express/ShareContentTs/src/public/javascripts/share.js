
document.ready = function () {
    console.log(1111)
    $("#keyUp").click(function () {
        var keyword = $("#keyword").val();
        $.post("/share/keyShare", { data: keyword }, function (result) {
            $("#keyword").val("");
            $("#currentkey").val(result.keyword);
        })
    })
    $(".sumbit.button").click(function () {
        $('#form')
            .submit(function (e) {
                console.log(111456)
                $.ajax({
                    url: '/share/fileShare',
                    type: 'POST',
                    data: new FormData(this),
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        $("#lastfile").val(result.lastname)
                        $("#filedown").attr("href",`/share/download?filename=${result.lastname}&id=${result.last_id}`)
                    },
                });
                e.preventDefault();
            });
    })
}