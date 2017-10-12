
// var charSelects = document.getElementsByClassName("charElect");
// Array.from(charSelects).forEach(function (t) {
//     t.addEventListener('change',liveSelectPost);
// })

function liveSelectPost(selection){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            if (xmlhttp.status == 200) {
            }

        }
    };
    console.log(selection.options[selection.selectedIndex].getAttribute('value'))
    xmlhttp.open("POST", "/electchar", true);
    xmlhttp.send(selection.options[selection.selectedIndex].getAttribute('value'));
}