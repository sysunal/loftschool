consoleRec(['я', 'умею', 'писать', 'рекурсивные', 'функции']);

function consoleRec(a) {
    rec(0, a);
}

function rec(i, a) {
    if(a[i] === undefined) {
        return;
    }
    console.log(a[i]);
    return rec(++i, a);
}
