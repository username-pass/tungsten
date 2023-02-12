

function Click(el, callback) {
  el.addEventListener("mousedown", e => {
    callback(e);
  });
}

var topZIndex = 1;
const windowArea = document.getElementById('windows');

class Window {
  constructor(width, height, title, content, id, clss, resizeable, draggable) {
 /*set variables*/
    this.width = width;
    this.height = height;
    this.title = title;
    this.content = content;
    this.id = id;
    this.clss = clss;
    this.resizeable = resizeable;
 /*create elements*/
 /*window object*/
    this.winObj = createElement('window', windowArea, this.id, 'window ' + this.clss);
    if (this.resizeable) {
      this.winObj.style.resizeable = 'both';
    }
    this.winObj.style.left = '10%';
    this.winObj.style.top = '10%';
    this.winObj.style.width = this.width;
    this.winObj.style.height = this.height;
    this.winObj.style.position = 'absolute';
    this.winObj.id = this.id;
    this.winObj.innerHTML = `
		
	 			<div id='${this.id}titleBar' class='titleBar' width='100%' height='10%'>
					<center id='${this.id}title' class='title' width='90%' height='100%' onclick=''>
${this.title}
					</center>
				 
			    <div id='${this.id}closeBtn' class='closeBtn button' width='10%' height='10%' >
			      X
			    </div>
			 		<div id='${this.id}minBtn' class='minBtn button' width='10%' height='10%' style='float:right;' >
						-
			    </div>
			 	</div>
		    <div id='${this.id}content' class='winCont' width='100%' height='90%'>
		      ${this.content}
		    </div>

 		`;
    this.titleBar = document.getElementById(this.id + 'titleBar');
		if (!draggable) {
		  this.winObj.classList.add('nodrag');
		}
    this.minBtn = this.winObj.children[0].children[2];
    this.closeBtn = this.winObj.children[0].children[1];
		this.taskParent = document.getElementById('taskbar');
    this.taskItem = createElement('button', this.taskParent, this.id + 'taskItem', 'taskItem');
		this.taskItem.innerText = this.title;
		

    this.minBtn.addEventListener("mousedown", function() {
      this.parentElement.parentElement.style.display = 'none';
    });
    this.closeBtn.addEventListener("mousedown", function() {
      removeWin(this.parentElement.parentElement.id)
			
    });

    this.makeTaskbar(this.winObj);
    this.winObj.style.display = 'initial';



  }
  makeTaskbar(winobj) {
    

    function displayToggle(el) {
 /*console.log(el.style.display);*/
      if (el.style.display == 'none') {
        el.style.display = 'initial'
      } else {
        el.style.display = 'none'
      }
    }

    this.taskItem.addEventListener("mousedown", function(event) {
      displayToggle(winobj)
    });


  }
  closeWin() {
    this.parent.parent.remove();
  }
  minWin() {
    alert(this.winObj.children[0].children[0]);
    this.parent.parent.style.display = 'none';
  }
  getEl() {
    return this.winObj;
  }


}


    let elementtoDrag;
    let x2;
    let y2;

    document.body.addEventListener("mousedown", e => {
			elementtoDrag = e.target;
			if (elementtoDrag.classList.contains('titleBar') || elementtoDrag.classList.contains('title')) {
				
				if (elementtoDrag.classList.contains('titleBar')) {
					elementtoDrag = elementtoDrag.parentElement;
				} else {
					elementtoDrag = elementtoDrag.parentElement.parentElement;
				}

      x2 = e.clientX - elementtoDrag.offsetLeft;
      y2 = e.clientY - elementtoDrag.offsetTop;
      topZIndex++;
      elementtoDrag.style.zIndex = topZIndex;

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", function() {

        document.removeEventListener("mousemove", move);
      });
		}
    });

    function move(e) {
      let x = e.clientX;
      let y = e.clientY;

      let winTitleBarHeight = 12
      if (y2 < winTitleBarHeight) {
        elementtoDrag.style.left = x - x2 + "px";
        elementtoDrag.style.top = y - y2 + "px";
      }

    }

/* let win = new Window('400px', '300px', 'title', '', 'id', 'window1', true, true);*/
