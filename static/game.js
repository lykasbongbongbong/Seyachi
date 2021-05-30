
var img = document.getElementById("img_person");
img.left = 370;
img.top = 490;
document.onkeydown = move;
function move(e) {
  var k = e.keyCode || e.which;
  var move = 0;
  switch (k) {
    case 37:
      img.src = "/static/images/left.png";
      move = MoveLeftAndRight(img.left, img.top, -10)
      img.left = img.left + move;
      break;
    case 39:
      img.src = "/static/images/right.png";
      move = MoveLeftAndRight(img.left, img.top, 10)
      img.left = img.left + move;
      break;
    case 38:
      img.src = "/static/images/front.png";
      move = MoveTopAndDown(img.left, img.top, -10)
      img.top = img.top + move;
      break;
    case 40:
      img.src = "/static/images/down.png";
      move = MoveTopAndDown(img.left, img.top, 10)
      img.top = img.top + move;
      break;
    case 13:
      var storeIndex = getStoreIndex(img.left, img.top);
      console.log("stand id: " + storeIndex);
      if (storeIndex != 0) {
        menu_app.show_menu(storeIndex);
      }
      break;

  }
  return img.style.left = img.left + 'px', img.style.top = img.top + 'px';
}

function getStoreIndex(left, top) {
  if (top >= 410 && top <= 450) {
    if (left >= 30 && left <= 240)
      return 11;
    else if (left >= 540 && left <= 690)
      return 12;
    else if (left >= 790 && left <= 940)
      return 13;
  }
  else if (top >= 170 && top <= 230) {
    if (left >= 50 && left <= 210)
      return 16;
    else if (left >= 290 && left <= 450)
      return 15;
    else if (left >= 540 && left <= 690)
      return 20;
    else if (left >= 790 && left <= 940)
      return 17;
  }
  return 0;
}

function MoveLeftAndRight(left, top, move) {
  var dist_x = 0;
  dist_x = left + move
  if (top > 410) {
    if (dist_x > 0 && dist_x < 1010) {
      return move;
    }
  }
  else if (top > 250) {
    if (dist_x > 310 && dist_x < 470) {
      return move;
    }
  }
  else if (top > 170) {
    if (dist_x > 0 && dist_x < 1010) {
      return move;
    }
  }
  return 0
}

function MoveTopAndDown(left, top, move) {
  var dist_y = 0;
  dist_y = top + move
  if (dist_y > 420) {
    if (dist_y < 500) {
      return move;
    }
  }
  else if (dist_y > 250) {
    if (left > 310 && left < 470) {
      return move;
    }
  }
  else if (dist_y > 170) {
    return move;
  }
  return 0
}


var state_dist_idx = 15;
var dict_store_x_y = {};

dict_store_x_y[11] = {'left': 135, 'top':480};
dict_store_x_y[12] = {'left': 615, 'top':480};
dict_store_x_y[13] = {'left': 865, 'top':480};

dict_store_x_y[16] = {'left': 130, 'top':200};
dict_store_x_y[15] = {'left': 370, 'top':200};
dict_store_x_y[20] = {'left': 615, 'top':200};
dict_store_x_y[17] = {'left': 865, 'top':200};

img.onclick=function(){
	if(dict_store_x_y[state_dist_idx]['top'] > 400 && img.top < 400){
		img.classList.add("goToUpMiddle");
	}
	else if(dict_store_x_y[state_dist_idx]['top'] < 400 && img.top > 400) {
		img.classList.add('goToDownMiddle');
	}
	else{
		img.left = dict_store_x_y[state_dist_idx]['left'];
		img.top = dict_store_x_y[state_dist_idx]['top'];
		img.style.left = dict_store_x_y[state_dist_idx]['left'] + 'px';
		img.style.top  = dict_store_x_y[state_dist_idx]['top'] + 'px';
	}
}

img.addEventListener("animationend",function(e){
	if (e.animationName == 'up_middle'){
		img.classList.remove("goToUpMiddle");
		img.left = dict_store_x_y[state_dist_idx]['left'];
		img.top = dict_store_x_y[state_dist_idx]['top'];
		img.style.left = dict_store_x_y[state_dist_idx]['left'] + 'px';
		img.style.top  = dict_store_x_y[state_dist_idx]['top'] + 'px';
	}
	
	else if (e.animationName == 'down_middle'){
		img.classList.remove("goToDownMiddle");
		img.left = dict_store_x_y[state_dist_idx]['left'];
		img.top = dict_store_x_y[state_dist_idx]['top'];
		img.style.left = dict_store_x_y[state_dist_idx]['left'] + 'px';
		img.style.top  = dict_store_x_y[state_dist_idx]['top'] + 'px';
	}
},false);


