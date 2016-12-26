
console.log('Calculator:');
var Calc = function (number) {
    this.setNumber(number),
    this.sum(),
    this.dif(),
    this.div(),
    this.mul()
};

Calc.prototype.setNumber = function (number) {
    this.n = number;
};
Calc.prototype.sum = function (a, b, c) {
    return this.n + a + b + c;
};
Calc.prototype.dif = function (a, b) {
    return this.n - a - b;
};
Calc.prototype.div = function (a, b) {
        if(a == 0 || b == 0) {
        try {
            throw new Error('Делить на 0 нельзя!');
        } catch (e) {
            return e.name + ': ' + e.message;
        }
    }
    return this.n / a / b;
};
Calc.prototype.mul = function (a, b) {
    return this.n * a * b;
};

var SqlCalc = function (number) {
    this.setNumber(number)
};

inherit (SqlCalc, Calc);

SqlCalc.prototype.sum = function (a, b, c) {
    return Calc.prototype.sum.call(this, a, b, c) *
            Calc.prototype.sum.call(this, a, b, c);
};
SqlCalc.prototype.dif = function (a, b) {
    return Calc.prototype.dif.call(this, a, b) *
            Calc.prototype.dif.call(this, a, b);
};
SqlCalc.prototype.div = function (a, b) {
    var res = Calc.prototype.div.call(this, a, b);
    if (typeof res === "number") {
        return res * res;
    } else {
        return res;
    }
};
SqlCalc.prototype.mul = function (a, b) {
    return Calc.prototype.mul.call(this, a, b) *
            Calc.prototype.mul.call(this, a, b);
};

var myCalculator = new Calc(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 106
console.log(myCalculator.dif(10, 20)); //вернет 70
console.log(myCalculator.div(2, 2)); //вернет 25
console.log(myCalculator.mul(2, 2)); //вернет 400
console.log(myCalculator.div(0, 2)); //вернет ошибку
console.log(myCalculator.div(2, 0)); //вернет ошибку

var mySqlCalc = new SqlCalc(100);

console.log(mySqlCalc.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
console.log(mySqlCalc.dif(10, 20)); //вернет 4 900
console.log(mySqlCalc.div(2, 2)); //вернет 625
console.log(mySqlCalc.mul(2, 2)); //вернет 160 000
console.log(mySqlCalc.div(0, 2)); //вернет ошибку

function inherit(child, parent) {
    child.prototype = Object.create(parent.prototype);
}
