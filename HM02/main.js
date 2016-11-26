var allNumbers = [1, 2, 4, 5, 6, 7, 8],
someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
noNumbers = ['это', 'массив', 'без', 'чисел'];

function isNumber(val) {
  return typeof val === 'number';
}

console.log(isAllTrue(allNumbers, isNumber)); //вернет true
console.log(isAllTrue(someNumbers, isNumber)); //вернет false
console.log(isAllTrue(noNumbers, isNumber)); //вернет false
console.log(isAllTrue([], isNumber)); //вернет ошибку

function isAllTrue(source, filterFn) {
    if(source[0] === undefined) {
        try {
            throw new Error('Нет элементов в массиве!');
        } catch (e) {
            return e.name + ': ' + e.message;
        }
    }

    return rec(0, source, filterFn);
}

function rec(i, source, filterFn) {
    if(source[i] === undefined) {
        return true;
    }
    if(filterFn(source[i])) {
     return rec(++i, source, filterFn);
    }
    return false;
}

console.log('Calculator:');
var myCalculator = calculator(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 106
console.log(myCalculator.dif(10, 20)); //вернет 70
console.log(myCalculator.div(2, 2)); //вернет 25
console.log(myCalculator.mul(2, 2)); //вернет 400
console.log(myCalculator.div(0, 2)); //вернет ошибку
console.log(myCalculator.div(2, 0)); //вернет ошибку

function calculator(number) {
    var myCalc = {
        n: number,

        sum: function(a, b, c) {
            return myCalc.n + a + b + c;
        },

        dif: function (a, b) {
            return myCalc.n - a - b;
        },

        div: function (a, b) {
            if(a == 0 || b == 0) {
                try {
                    throw new Error('Делить на 0 нельзя!');
                } catch (e) {
                    return e.name + ': ' + e.message;
                }
            }
            return myCalc.n / a / b;
        },

        mul: function (a, b) {
            return myCalc.n * a * b;
        }
    }

    return myCalc
}
