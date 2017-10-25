const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SearchTermSchema = new Schema({
    searchVal: String,
    searchDate: Date
}, {
    timestamps: true
})

const ModelClass = mongoose.model('SearchTerm', SearchTermSchema)

module.exports = ModelClass