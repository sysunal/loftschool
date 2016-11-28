var size = 100;
var button = document.querySelector('.myButton');
button.addEventListener('click', createDiv);

function createDiv() {
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.style.height = getRandomInt(5, size) + 'px';
    div.style.width = getRandomInt(5, size) + 'px';
    div.style.background = 'rgb(' + getRandomInt(0, 256) + ', '
                    + getRandomInt(0, 256) + ', '
                    + getRandomInt(0, 256) + ')';
    div.style.position = 'absolute';
    div.style.left = getRandomInt(0, document.documentElement.clientWidth - size) + 'px';
    div.style.top = getRandomInt(0, document.documentElement.clientHeight - size) + 'px';

    div.onmousedown = function(e) {
        moveAt(e);
        div.style.zIndex = 1000;

        document.onmousemove = function(e) {
            moveAt(e);
        }

        div.onmouseup = function() {
            document.onmousemove = null;
            div.onmouseup = null;
        }

        function moveAt(e) {
            div.style.left = e.pageX - div.offsetWidth / 2 + 'px';
            div.style.top = e.pageY - div.offsetHeight / 2 + 'px';
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
