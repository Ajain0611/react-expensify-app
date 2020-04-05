const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'anurag',
            age: 35
        });
    }, 5000);
});
console.log('before');

promise.then((data) => {
    console.log('1', data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('this is my other promise');
        }, 5000);
    });
}).then((str) => {
    console.log('does this run?', str);
}).catch((error) => {
    console.log('error: ', error);
});

console.log('after');