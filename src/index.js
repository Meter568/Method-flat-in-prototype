function MyArray(...args) {
    this.length = 0;
    for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
        this.length++;
    }
}

MyArray.prototype[Symbol.iterator] = function* () {
    for(let i = 0; i < this.length; i++) {
        yield this[i];
    }
}

MyArray.prototype.push = function (...items) {
    for (let i = 0; i < items.length; i++) {
        this[this.length] = items[i];
        this.length++;
    }
    return this.length;
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
    let startIndex;
    let nextIndex;

    if (initialValue !== undefined) {
        result = initialValue;
        endIndex = this.length;
        nextIndex = 0;
    } else {
        if (this.length === 0) {
            return "Reduce of empty array with no initial value";
        }
        result = this[0];
        endIndex = this.length - 1;
        nextIndex = 1
    }

    for(let i = 0; i < endIndex; i++) {
        result = callbackfn(result, this[i + nextIndex], i, this);
    }

    return result;
};

MyArray.prototype.flat = function (depth = 1) {
    if (depth <= 0) {
        return this.slice();
    }

    return this.reduce((accumulator, currentValue) => {
        if (currentValue instanceof MyArray && depth > 0) {
            accumulator.push(...currentValue.flat(depth - 1));
        } else {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, new MyArray());
};

const myarr = new MyArray(10, 20, new MyArray(30, new MyArray(40, new MyArray(50))));
console.log(myarr)
const resultFlat = myarr.flat(1);
console.log(resultFlat);
