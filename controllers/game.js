var Student = require('../models/student');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('layout')
    })

    app.post('/register', (req, res) => {
        if(!req.body.Email || !req.body.Name || !req.body.Phone){
            res.json({
                'success': false,
                'msg': 'Email, Name or Phone is required'
            })
        }else {
            let _newStuden = new Student({
                Email: req.body.Email,
                Name: req.body.Name,
                Phone: req.body.Phone,
                Pay: false,
                Wallet: null,
                Date: Date.now(),
            })
            _newStuden.save((err) => {
                if(err){
                    res.json({
                        'success': false,
                        'msg': 'Can not save to MongoDB'
                    })
                }else{
                    res.json({
                        'success': true,
                        'new_student': _newStuden
                    })
                }
            })
        }
    })
}