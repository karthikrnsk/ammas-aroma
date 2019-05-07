let mongoose = require('mongoose')

let menuSchema = new mongoose.Schema({
    chef_id: Number,
    menu: Array
})



module.exports = mongoose.model('chef_menu', menuSchema)