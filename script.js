var tungsten = {
  serverURL: 'https://TungstenServer1.username-pass.repl.co'
};
tungsten.info = {
  version: '1.0'
};
tungsten.user = {
  username: 'user1',
  id: 'testID',
  token: 'temp',
  settings: {
    background: {
      image: tungsten.serverURL + '/data/' + 'images/bg.png',
      color: '#03082b',
      size: '100% 100%'
    },
    taskbar: {
      color: '#0e0a0ebd'
    }
  }
};


function importElement(path, file, parent, type) {
  let el = document.createElement(type);
  fetch(tungsten.serverURL + '/data/' + path + '/' + file).then(function(response) {
    response.text().then(function(text) {
      el.id = file.split('.')[0];
      el.innerHTML = text;
      parent.appendChild(el);
      return el;
    });
  });
}

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

//make frame
var frame = createElement('div', document.body, 'tungstenframe', '');
frame.style.width = '100%';
frame.style.height = '100%';
frame.style.position = 'absolute';
frame.style.top = '0%';
frame.style.right = '0%';
frame.style.backgroundColor = tungsten.user.settings.background.color;
frame.style.backgroundImage = `url(${tungsten.user.settings.background.image})`;
frame.style.backgroundRepeat = 'no-repeat';
frame.style.backgroundSize = tungsten.user.settings.background.size;
//transition duration
//change this to 0 to make instant!
frame.style.transitionDuration = '0.25s';

//make elements
var windows;
var appListContainer;
var appInput;
var resultsL;
var taskbar;
var inf;

function makeElements() {

  windows = createElement('div', frame, 'windows', '');
  windows.height = '100%';
  windows.width = '100%';
  appListContainer = createElement('div', windows, 'appsListContainer', '');
  appInput = createElement('input', appListContainer, 'appsList', '');
  appInput.placeholder = "Select an app...";
  appInput.autocomplete = "off";
  resultsL = createElement('ul', appListContainer, 'results', '');
  resultsL.style.width = '20%';
  taskbar = createElement('div', frame, 'taskbar', '');
  taskbar.style.backgroundColor = tungsten.user.settings.taskbar.color;

  inf = createElement('script', frame, 'inf', '');
  inf.innerHTML = `var tungsten = ${JSON.stringify(tungsten)};`

  //importElement('jscode', 'main.js',frame,'script');
  importElement('jscode', 'lib.js', frame, 'script');
  importElement('jscode', 'windows.js', frame, 'script');
  importElement('jscode', 'autocomplete.js', frame, 'script');
  importElement('styles', 'main.css', frame, 'style');



	var dropdown = createElement('select', frame, 'server-list', 'dropdown');
	dropdown.style.position = 'absolute';
	dropdown.style.top = '0%';
	dropdown.style.right = '0%';
	var options = ['server1', 'server2', 'server3'];

	fetch(tungsten.serverURL+'/serverList')
		  .then(res => res.json())
		  .then(function (data) {
				console.log(data);
				for (var i = 0; i < options.length; i++) {
			  var option = createElement('option', dropdown, '', '');
			  option.value = data[i];
			  option.text = options[i];
			}
			
			dropdown.addEventListener('change', function() {
			  tungsten.serverURL = dropdown.value;
			});
			})
		  .catch(error => console.error(error));
	
	
	
}

function loginScreen() {

  function login() {
    alert('logged in!');
		var username = usernameInput.value;
		var password = passwordInput.value;

		fetch(tungsten.serverURL+'/login', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
				type: 'login',
		    username: username,
				password: password
		  },
		  body: JSON.stringify({ message: 'Login request' })
		})
		  .then(res => res.json())
		  .then(data => console.log(data))
		  .catch(error => console.error(error));

		
		
    removeElement(loginBox, false);
    makeElements();
    return true;
  }
  let loginBox = createElement('div', frame, 'loginScreen', 'loginScreen');
  var form = createElement("form", loginBox, null, "login-form");
  form.onsubmit = function(event) {
    event.preventDefault();
    login();
  };

  var usernameLabel = createElement("label", form, null, null);
  usernameLabel.innerHTML = "Username:";
  usernameLabel.setAttribute("for", "username");
  var usernameInput = createElement("input", form, "username", null);
  usernameInput.setAttribute("type", "text");
  usernameInput.setAttribute("name", "username");


  var passwordLabel = createElement("label", form, null, null);
  passwordLabel.innerHTML = "Password:";
  passwordLabel.setAttribute("for", "password");
  var passwordInput = createElement("input", form, "password", null);
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("name", "password");

  var submitButton = createElement("input", form, null, null);
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Submit");

  // Apply styles to elements
  loginBox.style.width = "50%";
  loginBox.style.height = "50%";
  loginBox.style.borderRadius = "20px";
  loginBox.style.border = "1px solid #7f7f7f";
  loginBox.style.borderWidth = "20px";
	loginBox.style.color = "#ccc";
  loginBox.style.backgroundColor = "#1a3d50";
  loginBox.style.position = "absolute";
  loginBox.style.top = "25%";
  loginBox.style.right = "25%";

  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.justifyContent = "center";
  form.style.alignItems = "center";
  form.style.height = "75%";
  form.style.width = "75%";
  form.style.margin = "auto";
  form.style.borderRadius = "10px";
  form.style.padding = "20px";

  usernameInput.style.width = "100%";
  usernameInput.style.padding = "10px";
  usernameInput.style.marginBottom = "20px";
  usernameInput.style.borderRadius = "5px";
  usernameInput.style.border = "1px solid #ccc";

  passwordInput.style.width = "100%";
  passwordInput.style.padding = "10px";
  passwordInput.style.marginBottom = "20px";
  passwordInput.style.borderRadius = "5px";
  passwordInput.style.border = "1px solid #ccc";

  submitButton.style.padding = "10px 20px";
  submitButton.style.borderRadius = "5px";
  submitButton.style.border = "none";
  submitButton.style.backgroundColor = "#4CAF50";
  submitButton.style.color = "white";
  submitButton.style.cursor = "pointer";

}

document.body.addEventListener("keydown", function(e) {
  var key = e.key + e.location;
  if (key == "Alt2" || key == "\\0") {
    if (frame.style.right == '0%') {
      frame.style.right = '100%';
      frame.style.top = '100%';
    } else {
      frame.style.right = '0%';
      frame.style.top = '0%';
    }
  }
})


if (loginScreen()) {
  makeElements()
}
