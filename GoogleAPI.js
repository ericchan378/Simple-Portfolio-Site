	var title = [];
	var url = [];
	var description = [];

function search(){
	//var key = "AIzaSyDrRpAfprjN8C4M16Z_cGXwMLrDGMuFMiA";
	var query = document.getElementById("query").value;
	var google = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDrRpAfprjN8C4M16Z_cGXwMLrDGMuFMiA&cx=014175807902713496140:lutx1h8_kos&q=" + query; //key no longer in use

	var req = new XMLHttpRequest();
	req.open("GET", google);

/*	
	$.ajax({
		url: google, 
   		method: "GET",
   		data: requestData,
   		dataType: "json"
	})
	.done(function(data) {
   		console.log("success");
});
*/

	req.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {

      		var resp = JSON.parse(this.responseText);
      		console.log(resp);

      		var i;
      		for (i in resp.items){
      			title[i] = resp.items[i].title;
      			url[i] = resp.items[i].link;
      			description[i] = resp.items[i].snippet.replace(/(\r\n|\n|\r)/gm,"");

      			var newRow = document.createElement("tr");
				var checktd = document.createElement("td");
				var resulttd = document.createElement("td");

				var checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.className = "resultCheck";
				checkbox.id = i;
				checktd.appendChild(checkbox);

				var output = document.createElement("div");
				var t = document.createElement("h4");
				var a = document.createElement("a");
				a.setAttribute('href', url[i]);
				a.innerHTML = title[i];
				t.appendChild(a);
				output.appendChild(t);
				var p = document.createElement("p");
				var d = document.createTextNode(description[i]);
				p.appendChild(d);
				output.appendChild(p);

				resulttd.appendChild(output);
				newRow.appendChild(checktd);
				newRow.appendChild(resulttd);
				document.getElementById("resultsList").appendChild(newRow);
      		}
      					

    	}
	}
	req.send();

}
	function saveSelections(){
		var e = document.getElementById("fileType");
		var fileExt = e.options[e.selectedIndex].value;
		var fileText = "";
		var selected = [];
		var x = document.getElementsByClassName("resultCheck");

		for(var i = 0; i < x.length; i++){
			if(x[i].checked === true){
				selected.push(x[i].id);
			}
		}

		if(fileExt === ".csv"){
			for(var i = 0; i < selected.length; i++){

				var s = selected[i];

				fileText += "\"" + title[s] + "\"" + "," 
				+ "\"" + url[s] + "\"" + "," 
				+ "\"" + description[s] + "\"";

				if(i !== selected.length - 1){
					fileText += "\r\n";
				}

			}
		}

		else if(fileExt === ".json"){
			var r = {Result: []};

			for(var i = 0; i < selected.length; i++){

				var s = selected[i];
				var obj = { title: title[s], url: url[s], description: description[s] };
				r.Result.push(obj);

			}

			fileText = JSON.stringify(r);
		}

		else{
			fileText = '<?xml version="1.0" encoding="UTF-8"?>\n' + '<results>\n';

			for (var i = 0; i <  selected.length; i++){

				var s = selected[i];
				var t ="		<title>" + title[s] + "</title>";
				var u ="		<url>" + url[s] + "</url>";
				var d ="		<description>" + description[s] + "</description>";

				fileText += "	<result>\n" + t + "\n" + u + "\n" + d + "\n" + "	</result>\n";
			}
			fileText+= "</results>";
		}

		var save = document.createElement("a");
		save.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(fileText));
		save.setAttribute("download", "results" + fileExt);
		save.style.display = 'none';
		document.body.appendChild(save);
		save.click();
		document.body.removeChild(save);		

		//console.log(fileText);

	}

	function selectAll(){
		var cb = document.getElementsByClassName("resultCheck");
		var sa = document.getElementById("selectAll");

		for (var i = 0; i < cb.length; i++){
			if(sa.checked === true){
				cb[i].checked = true;
			}
			else{
				cb[i].checked = false;
			}
		}
	}

