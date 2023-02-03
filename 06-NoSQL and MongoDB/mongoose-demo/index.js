const mongoose = require('mongoose');

const Cat = require('./models/Cat');

async function main() {
    mongoose.set('strictQuery', false);

    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');

    console.log('Database connected');

    const cats = await readCats();

    cats.forEach(cat => {
        cat.greet();
        console.log(cat.info);
    });

    // await saveCat('Kari', '5', 'Angora');

    const oneCat = await readCat('Garry');
    console.log(oneCat);

    // await updateCat('Garry', 5);

    await deleteCat('Ani');
}

async function saveCat(name, age, breed) {
    await Cat.create({
        name,
        age,
        breed
    });

    //another way
    // const cat = new Cat({
    //     name,
    //     age,
    //     breed,
    // });

    // await cat.save();
}

async function readCats() {
    const cats = await Cat.find();

    console.log(cats);

    return cats;
}

async function readCat(name) {
    // const cat = await Cat.findOne({ name });
    const cat = await Cat.findById("63dbe2ca7816610f73f9c92b");

    return cat;
}

async function updateCat(name, newAge) {
    await Cat.updateOne({ name }, { age: newAge });
}

async function deleteCat(name) {
    await Cat.deleteOne({ name });
}


main();