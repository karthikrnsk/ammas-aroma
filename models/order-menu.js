let mongoose = require('mongoose')

let menuSchema = new mongoose.Schema({
    chef_id: Number,
    menu: Array,
    cost: Number,
    person_count: Number
})



module.exports = mongoose.model('order_menu', menuSchema)