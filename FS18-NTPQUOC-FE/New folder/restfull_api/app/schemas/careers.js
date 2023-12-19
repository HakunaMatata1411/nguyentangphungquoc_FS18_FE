const mongoose = require('mongoose')
const databaseConfig = require(__path_configs + 'database')

let shema = new mongoose.Schema({
    name            : String,
    title           : String,
    like            :Number,
    dislike         :Number,
   
})
shema.virtual('restaurants', {
    ref: 'items', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'careers', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 shema.set('toObject', { virtuals: true });
 shema.set('toJSON', { virtuals: true });

module.exports = mongoose.model(databaseConfig.col_careers, shema)
