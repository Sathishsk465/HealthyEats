const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const foods = require('./data/foodData');
const Food = require('./models/Food');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Food.deleteMany();
        await Admin.deleteMany();

        await Food.insertMany(foods);

        // Create a default admin
        await Admin.create({
            name: 'Admin User',
            email: 'admin@healthyeats.com',
            password: 'password123', // Will be hashed by pre-save hook
        });

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Food.deleteMany();
        await Admin.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
