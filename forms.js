let question = 1;
$(() => {
    $("#multiple").click(() => {
        $("#form-html").append(`<div class="form-group" id="removable-${question}"><p id="lb-question-${question}">Question ${question}</p><label class="editable" contenteditable="true" for="question-${question}">Edit Me</label><select name="question-${question}" class="form-control" id="question-${question}"></select></div>`)
        question++;
        $("#formdata").val($("#form-html").html())
    });
    $("#selection").click(() => {
        $("#form-html").append(`<div class="form-group" id="removable-${question}"><p id="lb-question-${question}">Question ${question}</p><label class="editable" contenteditable="true" for="question-${question}">Edit Me</label><select name="question-${question}" multiple class="form-control" id="question-${question}"></select></div>`)
        question++;
        $("#formdata").val($("#form-html").html())
    });
    $("#input").click(() => {
        $("#form-html").append(`<div class="form-group" id="removable-${question}"><p id="lb-question-${question}">Question ${question}</p>
        <label contenteditable="true" for="question-${question}">Edit Me</label>
        <input type="text" name="question-${question}" class="form-control text" id="question-${question}" placeholder="Set placeholder below."></div>`)
        question++;
        $("#formdata").val($("#form-html").html())
    });
    $("#textarea").click(() => {
        $("#form-html").append(`<div class="form-group" id="removable-${question}"><p id="lb-question-${question}">Question ${question}</p>
        <label contenteditable="true" for="question-${question}">Edit Me</label>
        <textarea class="form-control" name="question-${question}" id="question-${question}" rows="5"></textarea>
      </div>`)
        question++;
        $("#formdata").val($("#form-html").html())
    });
    $("#add-opt").click(() => {
        let ques = $("#exampleFormControlInput1").val();
        let opt = $("#exampleFormControlInput2").val();
        $(`#question-${ques}`).append("<option>"+opt+"</option>");
        $("#exampleFormControlInput1").val("");
        $("#exampleFormControlInput2").val("");
        $("#formdata").val($("#form-html").html())
    });
    $("#set-place").click(() => {
        let ques = $("#placesetternum").val();
        let opt = $("#placesettertext").val();
        $(`#question-${ques}`).attr("placeholder", opt)
        $("#placesetternum").val("");
        $("#placesettertext").val("");
        $("#formdata").val($("#form-html").html())
    });
    $("#remove-q").click(() => {
        let ques = $("#remove-qs").val();
        $("#removable-"+ques).html("");
        if (ques == question) {
            return;
        }
        for (let i = ques; i < question; i++) {
            for (let x = 0; x < $("#removable-"+(i)).html().length; x++) {
                $("#removable-"+(i)).html($("#removable-"+(i)).html().replace(i, i-1))
            }
            $("#removable-"+(i)).attr("id", "removable-"+(i-1))
        }
        question--;
        $("#formdata").val($("#form-html").html())
    });
});