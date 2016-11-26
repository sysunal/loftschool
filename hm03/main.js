let array = [1, 2, 3, 4, 5, 6];
forEach(array);
let greaterThan4 = filter(array, 4);
console.log(greaterThan4);
let sqare = map(array);
console.log(sqare);
let part = slice(array, 1, -1);
console.log(part);
let sum = reduce(array, foo, 0);
console.log(sum);
let res = splice(array, -2, 1, 7, 8, 9);
console.log(res);

function forEach(array, filterFn) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}

function filter(array, filter) {
    let a = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] > filter) {
            a[a.length++] = array[i];
        }
    }
    return a;
}

function map(array) {
    let a = [];
    a.length = array.length;
    for (var i = 0; i < array.length; i++) {
        a[i] = array[i] * array[i];
    }
    return a;
}

function slice(array, start, end) {
    if (end === undefined) {
        end = array.length;
    }
    start = revert(start, array.length);
    end = revert(end, array.length);
    let a = [];
    a.length = end - start;
    for (var i = start; i < end; i++) {
        a[i - start] = array[i];
    }
    return a;
}

function revert(item, length) {
    if (item < 0) {
        return length + item;
    }
    return item
}

function reduce(array, fn, init) {
    var i = 0;
    if (init === undefined) {
        init = array[i++];
    }
    for (i; i < array.length; i++) {
        init = fn(init, array[i]);
    }
    return init;
}

function foo(prevSum, curNum) {
    return prevSum + curNum;
}

function splice(array, start, deleteCount) {
    if (start > array.length) {
        start = array.length;
    }
    start = revert(start, array.length);
    if (deleteCount === undefined) {
        deleteCount = arr.length - start;
    }
    if (deleteCount > array.length) {
        deleteCount = array.length;
    }

    let a = [];
    var addLen = 0;
    if (arguments.length > 3) {
        addLen = arguments.length - 3
    }
    a.length = addLen + array.length - deleteCount;


    var j = 0;
    for (var i = 0; i < array.length; i++) {
        if (i < start || i >= start + deleteCount) {
            a[j++] = array[i];
        } else {
            for (var k = 3; k < arguments.length; k++) {
              a[j++] = arguments[k];
            }
            i = start + deleteCount - 1;
        }
    }

    return a;
}
