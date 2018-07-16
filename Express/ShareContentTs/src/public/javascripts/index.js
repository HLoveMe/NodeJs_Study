

document.ready = function () {
    $("#ContentShare").click(function () {
        console.log(1111,$("#Content"))
        $("#Content").load("./share/")
    })
    
}