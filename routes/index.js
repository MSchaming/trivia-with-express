const express = require('express');

const router = express.Router();

/*******************************
 Routes
 *******************************/

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
    res.render('index', {name}); 
} else {
    res.redirect('/hello');
}
}); // end of root route


router.get('/hello', (req, res) => {
const name = req.cookies.username
if (name){
    res.redirect('/')
} else {
res.render('hello');
}
});

router.post('/hello', (req, res) => {
res.cookie('username', req.body.username); //set cookie on client to input on username
res.redirect('/');
});

router.post('/goodbye', (req, res) => {

res.clearCookie('username');
res.redirect('/hello'); 

});

module.exports = router;