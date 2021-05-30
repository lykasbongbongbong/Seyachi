
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

function enterStore(left) {
  //there are three store
  var index = 0;
  if (left > 0 && left < 100)
    index = 1;
  else if (left > 150 && Left < 250)
    index = 2;

  if (index != 0)
    window.alert(index);
}

var store_idx = document.getElementById("store");
img.onclick = function () {
  var x = Math.floor(Math.random() * 300);
  var y = Math.floor(Math.random() * 300);
  img.style.top = x + 'px';
  img.style.left = y + 'px';
}