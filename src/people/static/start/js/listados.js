function go(g, tipo) {
  // (A) VARIABLES TO PASS
  var field = g;
  var campo ='';
  var tipo = tipo;
  if (tipo == 1) {
    campo = "apellido";
  } else {
    campo = "nombre";
  }

  // (B) URL PARAMETERS
  var params = new URLSearchParams();
  params.append(campo, field);

  // (C) GO!
  var url = "../index.html?" + params.toString();
  //location.href = url;
  window.open(url);
}

filterSelection("all");

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  };
};

// Show filtered elements
function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    };
  };
};

// Hide elements that are not selected
function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    };
  };
  element.className = arr1.join(" ");
};

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("activa");
    current[0].className = current[0].className.replace(" activa", "");
    this.className += " activa";
  });
};
