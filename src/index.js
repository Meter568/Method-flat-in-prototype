function MyArray(...items) {
    this.length = 0;
    for (let i = 0; i < items.length; i++) {
        this[i] = items[i];
        this.length++;
    }
}

MyArray.prototype.push = function (...items) {
    for (let i = 0; i < items.length; i++) {
        this[this.length] = items[i];
        this.length++;
    }
    return this;
};

MyArray.prototype.slice = function (start = 0, end = this.length) {
    let result = new MyArray();
    for (let i = start; i < end; i++) {
        result.push(this[i]);
    }
    return result;
};

MyArray.prototype.reduce = function (callbackfn, initialValue) {
    let result;
    if (initialValue) {
        result = initialValue;
        for (let i = 0; i < this.length; i++) {
            result = callbackfn(result, this[i], i, this);
        }
    } else {
        result = this[0];
        for (let i = 0; i < this.length - 1; i++) {
            result = callbackfn(result, this[i + 1], i, this);
        }
    }
    return result;
};

MyArray.prototype.flat = function (depth = 1) {
    if (depth <= 0) {
        return this.slice();
    }

    return this.reduce((accumulator, currentValue) => {
        if (Array.isArray(currentValue) && depth > 0) {
            accumulator.push(...currentValue.flat(depth - 1));
        } else {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, new MyArray());
};

const myarr = new MyArray(10, 20, [30, [40, [50]]]);
const resultFlat = myarr.flat();
console.log(resultFlat);
