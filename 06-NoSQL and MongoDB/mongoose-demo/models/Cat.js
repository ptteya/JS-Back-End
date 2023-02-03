const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        // required: [true, 'Name is required']
    },
    age: Number,
    breed: String,
});

//Method
catSchema.methods.greet = function () {
    console.log(`Hello my name is ${this.name}!`);
}

//Virtual Property
catSchema.virtual('info').get(function () {
    return `${this.name} - ${this.age} - ${this.breed}`;
});

//Custom Virtual Methods
// catSchema.path('name').validate(function () {
//     return this.name.startsWith('M');
// }, 'Name should start with M');

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
