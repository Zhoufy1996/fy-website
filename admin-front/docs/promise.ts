/** @format */

const resolve = (value) => {
    return;
};

const reject = () => {};

class MyPromise {
    promiseState = ''; // pedding resolve reject

    promiseValue = undefined;

    constructor(fn) {
        this.exeFn = fn;
    }
    then() {}

    catch() {}

    execute() {
        this.exeFn(resolve, reject);
    }
}

MyPromise.resolve = resolve;

MyPromise.reject = reject;
