$(function () {
    $("#btn-close-send-message").on("click", function () {
        $("#btn-close-send-message").hide("slow");
    });

    $(".send-message-close").on("click", function () {
        $("#btn-close-send-message").show("slow");
        $("#msg").val("");
        $("#inputEmail").val("");

    });   

    $(".toaster").on("click", function () {
        let inputEmail = $("#inputEmail").val();
        let msg = $("#msg").val();

        toastr.options.positionClass = "toast-bottom-right";

        var validEmail = validateEmail(inputEmail)    

        if (msg == "" || inputEmail == "" || (validEmail == false)) {
            toastr.clear();
            toastr.error("Please type your email and message");
        } else {
            let data = {
                inputEmail: inputEmail,
                msg: msg,
            };

            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (this.readyState !== 4 && this.status !== 200) {
                    console.log(xhr.readyState);
                }
            };

            xhr.open("POST", "/");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.onload = function () {
                // console.log(xhr.responseText);
                // console.log(xhr.readyState);

                if (xhr.responseText) {
                    toastr.clear();
                    toastr.success("Email sent successfully!");
                    $("#msg").val("");
                    $("#inputEmail").val("");
                } else {
                    toastr.clear();
                    toastr.error("Bad response! Please try again later.");
                }
            };

            xhr.send(JSON.stringify(data));
        }
    });
});

function upperCase(element) {
    element.style.fontSize = "25px";
}

function lowerCase(element) {
    element.style.fontSize = "20px";
}

function validateEmail(email) {
    var re = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return re.test(email);
}