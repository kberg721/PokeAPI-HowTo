document.getElementById("menubtn").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

document.getElementById("quizBtn1").addEventListener("click", function(){
    document.getElementById("quiz1").style.display = "inline-block";
});

document.getElementById("quizBtn2").addEventListener("click", function(){
    document.getElementById("quiz2").style.display = "inline-block";
});

window.onclick = function(event) {
  if (!event.target.matches('#menubtn') && !event.target.matches('.dropdown-content show')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}