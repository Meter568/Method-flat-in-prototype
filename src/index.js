function MyArray(...args) {
    this.length = 0;
    for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
        this.length++;
    }
}

MyArray.isMyArray = function (obj) {
    return obj instanceof MyArray;
};

function MyArrayProto() {
    this[Symbol.iterator] = function* () {
        for (let i = 0; i < this.length; i++) {
            yield this[i];
        }
    };

    this.push = function (...args) {
        if (args.length !== 0) {
            for (let i = 0; i < args.length; i++) {
                this[this.length] = args[i];
                this.length++;
            }
        }
        return this.length;
    };

    this.slice = function (start = 0, end = this.length) {
        let result = new MyArray();

        if(start < 0) {
            start = Math.max(this.length + start, 0);
        }

        if(end < 0) {
            end = Math.max(this.length + end, 0);
        }

        if(start > this.length) {
            return result;
        }

        if(end > this.length) {
            end = this.length;
        }

        for (let i = start; i < end; i++) {
            result.push(this[i]);
        }
        return result;
    };

    this.reduce = function (callbackfn, initialValue) {
        let result;
        let endIndex;
        let nextIndex;

        if (initialValue !== undefined) {
            result = initialValue;
            endIndex = this.length;
            nextIndex = 0;
        } else {
            if (this.length === 0) {
                throw new TypeError("Reduce of empty array with no initial value");
            }
            result = this[0];
            endIndex = this.length - 1;
            nextIndex = 1;
        }

        for (let i = 0; i < endIndex; i++) {
            result = callbackfn(result, this[i + nextIndex], i, this);
        }

        return result;
    };

    this.reduceRight = function (callbackfn, initialValue) {
        let result;
        let startIndex;

        if (initialValue !== undefined) {
            result = initialValue;
            startIndex = this.length - 1;
        } else {
            if (this.length === 0) {
                throw new TypeError("Reduce of empty array with no initial value");
            }
            result = this[this.length - 1];
            startIndex = this.length - 2;
        }

        for (let i = startIndex; i >= 0; i--) {
            result = callbackfn(result, this[i], i, this);
        }

        return result;
    };

    this.flat = function (depth = 1) {
        if (depth <= 0) {
            return this.slice();
        }

        return this.reduce((accumulator, currentValue) => {
            if (MyArray.isMyArray(currentValue) && depth > 0) {
                accumulator.push(...currentValue.flat(depth - 1));
            } else {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, new MyArray());
    };
}

MyArray.prototype = new MyArrayProto();

const myArr1 = new MyArray(10, 20, 30);

const resultRightReduce = myArr1.reduceRight((acc, curr) => acc + curr);
console.log(resultRightReduce);

const myArr2 = new MyArray(10, 20, new MyArray(30, new MyArray(40, new MyArray(50))));
console.log(myArr2);

const resultFlat = myArr2.flat(2);
console.log(resultFlat);

const result = [1, 2, 3, 4, 5];
console.log(result.slice(2, -1))

const resultMy = new MyArray(1, 2, 3, 4, 5);
console.log(resultMy)
console.log(resultMy.slice())
