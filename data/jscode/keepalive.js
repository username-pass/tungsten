
function keepalivePing() {
	var request = new XMLHttpRequest();
	var url = "/keepalive";
	request.open("GET", url);
	request.setRequestHeader("username", tungsten.user.username);
	request.setRequestHeader("token", tungsten.user.token);
	request.send();

	request.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			console.log(this.responseText);
		}
	}
}
//setInterval(keepalivePing(),5000);