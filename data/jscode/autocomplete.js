
var data = [];
var info = [];
var count = 0;
var list = "";
var toget = "";
const autocomplete = document.getElementById("appsList");
const resultsHTML = document.getElementById("results");
const iframe = document.getElementById("frame");
fetch(tungsten.serverURL + '/data/' +'jscode/' + "list.txt").then(function(response) {
	response.text().then(function(text) {
		console.log(text);
		var list = text
		var splist = list.split("\n");
		splist.shift();
		splist = splist.sort();
		var ltxt = '';
		//console.log(splist);

		for (i=0;i<splist.length;i++) {
			let cur = splist[i].split(';');
			data.push(cur[0]);
			info.push(cur[1]);
			//console.log(cur[0],';',cur[1]);
		}
		
/*		data = splist;*/
		resultsHTML.innerHTML = "";
		resultsHTML.style.display = "block";
		for (i = 0; i < data.length; i++) {
			resultsHTML.innerHTML = "<li>" + data[i] + "	(<span>"+info[i]+"</span>)"+"</li>" + resultsHTML.innerHTML;
		}
		
	});
});
autocomplete.oninput = function() {
	let results = [];
	const userInput = this.value;
	resultsHTML.innerHTML = "";
	if (userInput.length > 0) {
		results = getResults(userInput);
		resultsHTML.style.display = "block";
		for (i = 0; i < results[0].length; i++) {
			resultsHTML.innerHTML = "<li>" + results[0][i] + "	(<span>"+results[1][i]+"</span>)"+"</li>" + resultsHTML.innerHTML;
		}
	}
};
autocomplete.addEventListener('keydown', function(e) {
	let results = [];
	const userInput = this.value;
	resultsHTML.innerHTML = "";
	if (userInput.length > 0) {
		results = getResults(userInput);
		resultsHTML.style.display = "block";
		for (i = 0; i < results[0].length; i++) {
			resultsHTML.innerHTML = "<li>" + results[0][i] + "	(<span>"+results[1][i]+"</span>)"+"</li>" + resultsHTML.innerHTML;
		}
	}
	keyp(e, results);
});

function keyp(e, results) {
	var key = ` ${e.code}`;
	if (key == " Enter" || key == " Tab") {
		var isIn = results[0].includes(autocomplete.value);
		if (isIn) {
			submit(autocomplete.value);
		}
		autocomplete.value = results[0][0];
	}
}

function getResults(input) {
	const results = [];
	const infores = []
	if (input == '' || input == '.' || input == ' ') {
		//console.log([data,info])
		return [data,info];
	}
	for (i = 0; i < data.length; i++) {
		if (input === data[i].slice(0, input.length)) {
			results.push(data[i]);
			infores.push(info[i]);
		}
	}
	return [results,infores];
}

function getlist(initial) {
	let out = [];
	let a = 0;
	for (let i = 2; i < initial.length; i = i + 2) {
		out[a] = initial[i];
		a++;
	}
	return out;
}

function getMatches(string, regex, index) {
	index || (index = 1); // default to the first capturing group
	var matches = [];
	var match;
	while (match = regex.exec(string)) {
		matches.push(match[index]);
	}
	return matches;
}

function submit(value) {
	let toget = value;
	toget = tungsten.serverURL + '/data/' +'jscode/' + 'apps/' + toget + ".html";
	fetch(toget).then(function(response) {
		response.text().then(function(text) {

			let regex = /<title>(.+)<\/title>.+<body>(.+)<\/body>/gms
			let title = getMatches(text, regex, 1);
			let content = getMatches(text, regex, 2);

			let win = new Window('400px', '300px', title, content, title + Date.now(), 'window1', true, true);

		});
	});
}