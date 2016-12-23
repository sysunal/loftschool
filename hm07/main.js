document.cookie = 'nameC=valueC';

var a = document.cookie.split(";");
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
        cellDelete.appendChild(button);
        //button.addEventListener('click', deleteMyCookie(i, couple[0]));

    }
    document.body.appendChild(table);

    for(var i = 0; i < a.length; i++) {
        var button = document.getElementById("delButton" + i)
        button.addEventListener("click", deleteMyCookie(i, a[i].split("=")[0]));
    }
}


function deleteMyCookie(row, name) {
    if(confirm("Удалить cookie с именем " + name + "?")) {
        var date = new Date(0);
        document.cookie = name + "=; path=/; expires=" + date.toUTCString();
    }
}
