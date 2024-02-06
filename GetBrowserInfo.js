//Navigator
var navig = document.createElement("h3");
navig.innerHTML = "Navigator";
document.getElementById("browserDiv").appendChild(navig);
var table = document.createElement("table");

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "App Name: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = navigator.appName;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Product: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = navigator.product;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "App Version: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = navigator.appVersion;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "User Agent: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = navigator.userAgent;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Platform: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = navigator.platform;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Language: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = navigator.language;
tr.appendChild(td);
table.appendChild(tr);

document.getElementById("browserDiv").appendChild(table);

//Window
var win = document.createElement("h3");
win.innerHTML = "Window";
document.getElementById("browserDiv").appendChild(win);
var table = document.createElement("table");

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Inner Height: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = window.innerHeight;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Inner Width: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = window.innerWidth;
tr.appendChild(td);
table.appendChild(tr);

document.getElementById("browserDiv").appendChild(table);

//Screen
var sc = document.createElement("h3");
sc.innerHTML = "Screen";
document.getElementById("browserDiv").appendChild(sc);
var table = document.createElement("table");

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Width: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = screen.width;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Height: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = screen.height;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Available Width: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = screen.availWidth;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Available Height: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = screen.availHeight;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Color Depth: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = screen.colorDepth;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Pixel Depth: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = screen.pixelDepth;
tr.appendChild(td);
table.appendChild(tr);

document.getElementById("browserDiv").appendChild(table);

//Location
var loc = document.createElement("h3");
loc.innerHTML = "Location";
document.getElementById("browserDiv").appendChild(loc);
var table = document.createElement("table");

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "URL: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = window.location.href;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Internet Host: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = window.location.hostname;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Pathname: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = window.location.pathname;
tr.appendChild(td);
table.appendChild(tr);

var tr = document.createElement("tr");
var td = document.createElement("td");
td.innerHTML = "Protocol: ";
tr.appendChild(td);
var td = document.createElement("td");
td.innerHTML = window.location.protocol;
tr.appendChild(td);
table.appendChild(tr);

document.getElementById("browserDiv").appendChild(table);

//Geolocation
var gloc = document.createElement("h3");
gloc.innerHTML = "Geolocation";
document.getElementById("browserDiv").appendChild(gloc);
var table = document.createElement("table");

var trg = document.createElement("tr");
var lg = document.createElement("td");
lg.innerHTML = "Longitude: "
var long = document.createElement("td");

var trt = document.createElement("tr");
var lt = document.createElement("td");
lt.innerHTML = "Latitude: "
var lat = document.createElement("td");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 

    long.innerHTML = "Geolocation is not supported by this browser.";
    lat.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    long.innerHTML = position.coords.latitude;
    lat.innerHTML = position.coords.longitude;
}

getLocation();

trg.appendChild(lg);
trg.appendChild(long);

trt.appendChild(lt);
trt.appendChild(lat);

table.appendChild(trg);
table.appendChild(trt);

document.getElementById("browserDiv").appendChild(table);