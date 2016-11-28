
var par = document.createElement('p');
par.innerHTML = 'text zero';
var cont = document.querySelector('.divContainer');

prepend(cont, par);
console.log(cont.childNodes);
console.log(cont.children);
deleteTextNodes(cont);
console.log(cont.childNodes);
console.log(cont.children);

function prepend(container, newEl) {
    container.insertBefore(newEl, container.children[0]);
}

function deleteTextNodes(textEl) {
    for(var i = 0; i <  textEl.childNodes.length; i++) {
        if(textEl.childNodes[i].nodeName === '#text') {
            textEl.removeChild(textEl.childNodes[i]);
            i--;
        } else {
             deleteTextNodes(textEl.childNodes[i]);
        }
    }
    return;
}
