document.cookie = 'nameC=valueC';

var x = document.cookie;
container.textContent = x;
var a = x.split(";");
if (a.length > 0) {
    var table = document.createElement('table');
    var header = table.createTHead();
    var headRow = header.insertRow(0);
    var headCellName = headRow.insertCell(0);
    var headCellValue = headRow.insertCell(1);
    var headDelCell = headRow.insertCell(2);
    headCellName.innerHTML = "<b>Name</b>";
    headCellValue.innerHTML = "<b>Value</b>";
    headDelCell.innerHTML = "<b>Удалить</b>";
    for(var i = 0; i < a.length; i++) {
        var couple = a[i].split("=");
        var row = table.insertRow(i + 1);
        var j = 0;
        var cellName = row.insertCell(j++);
        cellName.innerHTML = couple[j - 1];
        var cellValue = row.insertCell(j++);
        cellValue.innerHTML = couple[j - 1];

        var cellDelete = row.insertCell(j++);
        var button = document.createElement("input");
        button.type = "button"
        button.id = "delButton" + i;
        button.value = "удалить";
        button.addEventListener('click', deleteMyCookie(i));
        cellDelete.appendChild(button);

    }
    document.body.appendChild(table);

    // for(var i = 0; i < a.length; i++) {
    //     var button = document.getElementById("delButton" + i)//document.querySelector("delButton" + i);
    //     button.addEventListener('click', deleteMyCookie(i));
    // }
}


function deleteMyCookie(row) {
    console.log(row);


}
