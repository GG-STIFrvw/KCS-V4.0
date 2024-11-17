// Get all elements with class 'accordion'
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        // Toggle between hiding and showing the active panel
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
