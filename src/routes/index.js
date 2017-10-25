const SearchTerm = require('../models/SearchTerm')

module.exports = (app) => {
    app.get('/',
        function (req, res) {
            res.render("index")
        }
    )
    app.get('/api/imagesearch/:searchVal',
        function (req, res) {
            const {
                searchVal
            } = req.params
            const {
                offset
            } = req.query
            const data = new SearchTerm({
                searchVal,
                searchDate: new Date()
            })
            data.save(err => {
                if (err) {
                    res.send({
                        err: "error saving to databse"
                    })
                }
                res.send(data)
            })
        }
    )
    app.get('/api/recentsearch', (req, res) => {
        SearchTerm.find({}, (err, data) => {
            if (err) {
                res.send({
                    err: "error fetching recentsearch"
                })
            }
            res.json(data)
        })
    })
}