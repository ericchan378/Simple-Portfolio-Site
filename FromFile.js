
	var title = [];
	var url = [];
	var description = [];

	var fileName = "";
	var fileExt = "";

	var myFile = function(event){

		document.getElementById("resultsList").innerHTML = "";

		var input = event.target;
		var file = input.files[0];

		fileName = file.name;
		fileExt = fileName.split('.').pop();

		var fr = new FileReader();

		fr.onload = function() {

			if(fileExt === "csv"){
				var lines = this.result.split('\n');

				//console.log(lines.length);

				for(var i = 0; i < lines.length; i++){

					//console.log(lines[i]);

					var components = lines[i].split('","');


					title[i] = components[0].replace(/\"/g, "");
					url[i] = components[1].replace(/\"/g, "");
					description[i] = components[2].replace(/(\r\n|\n|\r)/g," ").replace(/\"/g, "");
					//For if description contains commas in CSV
					/*for(var c = 3; c < components.length; c++){
					description[i] = description[i] + "," + components[c];
					}*/

					var newRow = document.createElement("tr");
					newRow.className = "resultRow";
					var checktd = document.createElement("td");
					checktd.className = "checktd";
					var resulttd = document.createElement("td");
					resulttd.className = "resulttd";

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

			else if(fileExt === "json"){
				var obj = this.result;
				var item = JSON.parse(obj);
				var i;

				for(i in item.Result){

					title[i] = item.Result[i].title;
					url[i] = item.Result[i].url;
					description[i] = item.Result[i].description.replace(/(\r\n|\n|\r)/gm,"");

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

			else if(fileExt === "xml"){
				//replace ampersands because xml entities creates problems
				var doc = this.result.replace(/&/g, "&amp;");

				parser = new DOMParser();
				xmlDoc = parser.parseFromString(doc, "text/xml");

				for(var i = 0; i < xmlDoc.getElementsByTagName("result").length; i++){

					title[i] = xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue;
					url[i] = xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue;
					description[i] = xmlDoc.getElementsByTagName("description")[i].childNodes[0].nodeValue.replace(/(\r\n|\n|\r)/gm,"");

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

			else{
				var output = document.createElement("div");
				var error = document.createTextNode("Error: This File Extension May Not Be Used.");
				output.appendChild(error);
				document.getElementById("resultsList").appendChild(output);
			}
		}
		fr.readAsText(file);
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

