const SearchTerm = require('../models/SearchTerm')
const Bing = require('node-bing-api')({accKey:'db63791f74064c3ca3a65570902162f5'})

module.exports = (app) => {
    app.get('/',
        function (req, res) {
            res.render("index")
        }
    )
    app.get('/api/', (req, res) => {
        res.send({err: 'params following /api/ is empty, try /api/imagesearch/:searchVal or /api/:recentsearch'})
    })
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
    app.get('/api/:recentsearch', (req, res) => {
        const {recentsearch} =req.params
        SearchTerm.find({}, (err, data) => {
            if (err) {
                return res.send({
                    err: "error fetching recentsearch"
                })
            }
        })
        Bing.images(recentsearch,{
            top:10
        }, function (err,rez,body){
            res.send(body)
        })
    })
}