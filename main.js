$(() => {
    $("#continue").click(() => {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#part-1").offset().top
        }, 2000);
    })
    $("#contintwo").click(() => {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#part-2").offset().top
        }, 2000);
    })
})