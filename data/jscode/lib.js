
/*user stuff*/
function getCreds() {
  let lsc = localStorage.getItem('creds');
  if (lsc != undefined) {
    tungsten.user.cred = lsc;
    login(tungsten.user.cred);
  } else {

  }
}

/*server stuff*/
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


/*functions*/

function createElement(type, parent, id, clss) {
	let el = document.createElement(type);
	el.id = id;
	el.className = clss;
	parent.appendChild(el);
	return el;
}

function removeElement(element, log) {
	if (log) {
		console.log('removed element', element);
	}
	element.remove();

}

function removeWin(id) {
	let win = document.getElementById(id);
	let tim = document.getElementById(id + 'taskItem');
	win.remove();
	tim.remove();
}