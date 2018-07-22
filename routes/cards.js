const express = require('express');
const router = express.Router();
const  { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashID = Math.floor(Math.random() * numberOfCards);
     res.redirect(`/cards/${flashID}?side=question`)
});



router.get('/:id', (req, res) => {
    const name = req.cookies.username;
    const  { side }  = req.query;
    const { id } = req.params;

    if ( side != 'question' && side != 'answer') {
        return res.redirect(`/cards/${id}?side=question`);
    } //stops execution after return, so no error with redirect and rendering at same time.

    const text = cards[id][side]; //grabbing value inside of either question or answer from json file
 
    const { hint } = cards[id];

    const templateData = {id, text, name};

    if (side === 'question') {
        templateData.hint = hint;
        templateData.link = 'answer';
        templateData.linkDisplay = 'question'
    } else if (side === 'answer') {
        templateData.link = 'question';
        templateData.linkDisplay = 'answer';
    }


    
    res.render('card', templateData)

    });

    module.exports = router;