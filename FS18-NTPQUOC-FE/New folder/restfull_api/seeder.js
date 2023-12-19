const mongoose = require('mongoose');
const fs = require('fs')

const pathConfig            = require('./path');
global.__base               = __dirname + '/';
global.__path_app           = __base + pathConfig.folder_app + '/';
global.__path_schemas       = __path_app + pathConfig.folder_schemas + '/';
global.__path_configs       = __path_app + pathConfig.folder_configs + '/';



const databaseConfig  = require(__path_configs + 'database');

mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.cqgjl3v.mongodb.net/${databaseConfig.database}`)
  
const itemShemas = require('./app/schemas/items');
const careersShemas = require('./app/schemas/careers');
const usersShemas = require('./app/schemas/users');




const Items = JSON.parse(
    fs.readFileSync(`${__dirname}/app/_data/items.json`,'utf-8')
)

const careers = JSON.parse(
    fs.readFileSync(`${__dirname}/app/_data/careers.json`,'utf-8')
)

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/app/_data/user.json`,'utf-8')
)
const importData = async  () =>{
    try {
       await itemShemas.create(Items)
       await careersShemas.create(careers)
       await usersShemas.create(users)
        console.log('importData...');
        process.exit()
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async () =>{
    try {
       await itemShemas.deleteMany({})
       await careersShemas.deleteMany({})
       await usersShemas.deleteMany({})

        console.log('deleteData...');
        process.exit()
    } catch (error) {
        console.log(error);
    }
}


if (process.argv[2] === '-i') {
    importData()
}else if(process.argv[2] === '-d'){
    deleteData()
}