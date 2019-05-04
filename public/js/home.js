document.getElementById("bar").addEventListener("click", function() {
  var x = document.getElementById("mobileNav");
  if (x.style.display === "none") {
    x.style.display = "inline";
  } else {
    x.style.display = "none";
  }
});
