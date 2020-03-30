// object destructuring

// const person = {
//     name: 'Anurag',
//     age: 35,
//     location: {
//         city: 'pune',
//         temp: 31
//     }
// }
// const { name: firstName = 'Anonymous', age } = person;
// const { city, temp: temperature } = person.location;

// console.log(`${firstName} is ${age}.`)

// console.log(`Its ${temperature} in ${city}.`)

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const { name: publisherName = 'Self published' } = book.publisher;
// console.log(publisherName);
//
// Array destructuring
//

const address = ['1299 s Juniper street', 'Philadelphia', 'Pennsylvania', '19147'];
const [, city, state] = address;
console.log(`You are in ${city}, ${state}`);

const item = ['coffee (hot)','$2.00', '$2.50', '$2.75'];

const [itemName, ,mediumPrice] = item;
console.group(`A medium ${itemName} costs ${mediumPrice}`);


