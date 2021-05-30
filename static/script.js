
var img = document.getElementById("img_person");
var TOP=205, DOWN=455, LEFT=0, RIGHT=810;
img.left = 0;
img.top = 335;
document.onkeydown = move;
function move(e){
	var k = e.keyCode || e.which;
	switch(k){
		case 37:
			img.src="/static/left.png";
			if(img.left > LEFT + 10)
				img.left = img.left-10;
			break;
		case 38:
			img.src="/static/front.png";
			if (img.top > TOP + 10)
				img.top = img.top-10;
			else
				enterStore(img.left)
			break;
		case 39:
			img.src="/static/right.png";
			if (img.left < RIGHT - 10 - 60)
				img.left = img.left +10;
			break;
		case 40:
			img.src="/static/down.png";
			if (img.top < DOWN - 10 - 120)
				img.top = img.top + 10;
			break;
	}
	return img.style.left = img.left+'px',img.style.top = img.top+'px';
}

function enterStore(left){
	//there are three store
	var index = 0
	if (left > 0 && left < 100)
		index = 1
	else if (left > 150 && Left < 250)
		index = 2
	
	if (index != 0)
		window.alert(index);
}